import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // In-memory inquiry store
  const inquiries: Array<{ id: string; email: string; message: string; timestamp: number }> = [];

  // 1. Password verification endpoint
  app.post('/api/verify', (req, res) => {
    const { password } = req.body || {};
    const expectedPassword = process.env.APP_PASSWORD || 'digitalguidejan';
    if (password && password.trim() === expectedPassword) {
      return res.json({ success: true, expires_in: 28800 });
    }
    return res.status(401).json({ success: false, message: 'Das eingegebene Passwort ist nicht korrekt.' });
  });

  // 2. Lock endpoint
  app.post('/api/lock', (_req, res) => {
    return res.json({ success: true });
  });

  // 3. Inquiry / Support submission endpoint
  app.post('/api/inquiry', (req, res) => {
    const { email, message, requestId } = req.body || {};
    const reqId = requestId || Math.random().toString(36).substring(2, 10).toUpperCase();
    inquiries.push({
      id: reqId,
      email: email || '',
      message: message || '',
      timestamp: Date.now()
    });
    return res.json({ success: true, requestId: reqId });
  });

  // 4. Gemini AI Chat endpoint
  app.post('/api/chat', async (req, res) => {
    const { messages, stream = true } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Nachrichten-Verlauf (messages) ist erforderlich.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackReply = "Hallo! Ich bin dein digitaler Assistent **Jan Dennis**.\n\nZurzeit ist auf dem Server noch kein `GEMINI_API_KEY` hinterlegt. Sobald der Schlüssel eingetragen ist, beantworte ich deine Fragen gerne vollautomatisch und Schritt für Schritt. Du kannst mich aber jederzeit auch direkt über das Kontaktformular oder per E-Mail kontaktieren!";
      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.write(`data: ${JSON.stringify({ text: fallbackReply, model: 'gemini-2.5-flash' })}\n\n`);
        res.end();
        return;
      }
      return res.json({ reply: fallbackReply, model: 'gemini-2.5-flash' });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `Du bist Jan Dennis Brüning, der empathische, geduldige und verlässliche Digital-Guide der „Digital-Guide-Box“.
Deine Mission ist es, Menschen im digitalen Alltag zu begleiten und ihnen die Scheu vor moderner Technologie zu nehmen – insbesondere bei Fragen zu Smartphones (Android & iPhone), Tablets, Windows/Mac, WhatsApp, E-Mails, Internetsicherheit, Online-Banking, Online-Diensten, Kundenkonten und digitalen Formularen.

Deine Kommunikationsregeln:
1. Freundlich, ermutigend und respektvoll im herzlichen „Du“.
2. Vermeide technisches Fachchinesisch. Wenn Fachbegriffe unumgänglich sind (wie z. B. Cloud, Cache, 2-Faktor-Authentifizierung, Browserverlauf), erkläre sie sofort mit einem einfachen Alltagsvergleich.
3. Strukturiere Handlungsanweisungen immer in klare, nummerierte Schritte (1., 2., 3.), sodass man sie leicht nachmachen kann.
4. Höchste Wachsamkeit bei Sicherheit: Erinnere stets daran, niemals Passwörter, PINs oder TANs per Mail/Telefon weiterzugeben und bei verdächtigen Links oder Gewinnspielen vorsichtig zu sein.
5. Empathie & Geduld: Es gibt keine dummen Fragen. Bestärke den Nutzer darin, Dinge in Ruhe auszuprobieren.
6. Bei sehr kniffligen Problemen oder Geräte-Hardwaredefekten: Weise freundlich darauf hin, dass man dich in der Box auch direkt über die Kontaktkarte per Mail oder Telefon erreichen kann.
7. Formatiere deine Antworten übersichtlich mit Absätzen, fetten Hervorhebungen und Listen.`;

      const contents = messages.map((m: any) => ({
        role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: typeof m.content === 'string' ? m.content : '' }]
      }));

      const model = 'gemini-3.6-flash';

      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const responseStream = await ai.models.generateContentStream({
          model,
          contents,
          config: {
            systemInstruction
          }
        });

        for await (const chunk of responseStream) {
          const chunkText = chunk.text;
          if (chunkText) {
            res.write(`data: ${JSON.stringify({ text: chunkText, model })}\n\n`);
          }
        }
        res.end();
      } else {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction
          }
        });
        return res.json({ reply: response.text || '', model });
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      if (!res.headersSent) {
        return res.status(500).json({ error: err?.message || 'Fehler bei der Kommunikation mit dem Assistenten.' });
      }
      res.write(`data: ${JSON.stringify({ error: err?.message || 'Verbindungsabbruch.' })}\n\n`);
      res.end();
    }
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
      root: __dirname,
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    const assetsDir = path.resolve(__dirname, '../assets');
    const staticDir = fs.existsSync(distDir) ? distDir : assetsDir;
    app.use(express.static(staticDir));
    app.get('*', (_req, res) => {
      const indexPath = fs.existsSync(path.resolve(distDir, 'index.html'))
        ? path.resolve(distDir, 'index.html')
        : path.resolve(assetsDir, 'index.html');
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
