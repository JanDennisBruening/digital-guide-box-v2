import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Brain,
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, ChatModel, ChatTaskType } from '../types';
import { getAssetUrl } from '../utils/assets';

interface GeminiAssistantSectionProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
  onNavigateToContact?: () => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content: `Hallo! Schön, dass du da bist. Ich bin dein digitaler Assistent **Jan Dennis**. 

Egal ob Smartphone, WhatsApp, Passwörter oder verdächtige Nachrichten – frag mich einfach ganz ungeniert. Ich erkläre dir alles in Ruhe und Schritt für Schritt, ohne unverständliches Fachchinesisch.

Womit kann ich dir heute helfen?`,
  timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
  modelUsed: 'gemini-2.0-flash',
};

export const GeminiAssistantSection: React.FC<GeminiAssistantSectionProps> = ({
  initialPrompt,
  onClearInitialPrompt,
  onNavigateToContact,
}) => {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const profileAvatar = config?.settings?.profile?.avatar_url || getAssetUrl('profilbild.png');
  const profileName = config?.settings?.profile?.name || 'Jan Dennis';
  const maxInputLength: number = config?.settings?.gemini?.max_input_length || 800;

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelChoice, setModelChoice] = useState<ChatModel>('gemini-2.0-flash');
  const [taskType, setTaskType] = useState<ChatTaskType>('general');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial prompt passed from outside (e.g., from an Anleitung or News)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleClearHistory = () => {
    if (messages.length <= 1) {
      return;
    }
    if (window.confirm('Möchtest du den bisherigen Chatverlauf wirklich zurücksetzen und von vorne beginnen?')) {
      setMessages([INITIAL_MESSAGE]);
      setInput('');
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Placeholder for assistant streaming response
    const assistantId = `assistant-${Date.now()}`;
    const initialAssistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      modelUsed: modelChoice,
    };

    setMessages((prev) => [...prev, initialAssistantMsg]);

    try {
      // Map conversation for Gemini
      const conversationPayload = newMessages
        .filter((m) => m.id !== 'welcome-msg')
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: m.content,
        }));

      // Determine task type and model
      let activeModel = modelChoice;
      if (taskType === 'complex') activeModel = 'gemini-1.5-pro';
      else if (taskType === 'fast') activeModel = 'gemini-2.0-flash-lite';
      else activeModel = 'gemini-2.0-flash';

      const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
      const chatUrl = config?.chatUrl || '/api/chat';

      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationPayload,
          modelChoice: activeModel,
          taskType,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server meldet Status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const json = await response.json();
        if (json.error) {
          throw new Error(json.error);
        }
        const reply = json.reply || json.text || '';
        const detectedModel = json.model || activeModel;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: reply, modelUsed: detectedModel }
              : msg
          )
        );
        return;
      }

      if (!response.body) {
        throw new Error('Kein Datenstrom vom Server empfangen.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedText = '';
      let detectedModel = activeModel;

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunkStr = decoder.decode(value, { stream: true });
          const lines = chunkStr.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.substring(6));
                if (data.error) {
                  throw new Error(data.error);
                }
                if (data.model) {
                  detectedModel = data.model;
                }
                if (data.text) {
                  accumulatedText += data.text;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === assistantId
                        ? { ...msg, content: accumulatedText, modelUsed: detectedModel }
                        : msg
                    )
                  );
                }
              } catch (e: any) {
                if (e.message && !e.message.includes('Unexpected end of JSON')) {
                  console.error('Error parsing SSE chunk:', e);
                }
              }
            }
          }
        }
      }

      if (!accumulatedText) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? {
                  ...msg,
                  content:
                    'Entschuldige, ich konnte dazu gerade keine Antwort formulieren. Bitte versuche es noch einmal oder formuliere deine Frage um.',
                  error: true,
                }
              : msg
          )
        );
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content: `⚠️ **Hinweis**: ${
                  error.message || 'Die Antwort konnte nicht geladen werden.'
                }\n\n*Tipp: Du kannst deine Frage auch direkt über die Kontaktseite an Jan Dennis stellen.*`,
                error: true,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-full min-h-0 flex-1 flex flex-col bg-white overflow-hidden">
      {/* Assistant Header & Mode Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-blue-50/90 via-slate-50/80 to-blue-50/40 shrink-0">
        <div className="flex items-start gap-4 text-left">
          {/* Avatar with signature gradient frame */}
          <div className="relative flex-shrink-0 mt-0.5">
            <div className="brand-avatar-frame">
              <img
                src={profileAvatar}
                alt={profileName}
                onError={(e) => {
                  const fallback = getAssetUrl('profilbild.png');
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xs object-cover"
              />
            </div>
            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#0B9EBC] border-2 border-[#FDF4E4] rounded-full shadow-xs"
              title="Online und bereit"
            />
          </div>

          {/* 3 Rows: Name -> Controls in one row -> Subtitle in one row */}
          <div className="min-w-0 flex-1 flex flex-col items-start justify-start gap-2">
            {/* Row 1: Name */}
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#01060C] tracking-normal text-left m-0 p-0">
              Jan Dennis · KI Assistenz rundum die Uhr
            </h2>

            {/* Row 2: Assistant Badge + Schnell/Standard/Komplex + Refresh Icon */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap overflow-x-auto max-w-full text-left justify-start py-0.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-body bg-[#E8FAFE] text-[#014B6F] border border-[#0B9EBC]/30 whitespace-nowrap shadow-2xs shrink-0">
                <Sparkles className="w-3 h-3 text-[#0B9EBC]" />
                Digital-Assistent
              </span>

              {/* Mode Selector: Schnell, Standard, Komplex */}
              <div className="bg-white/95 backdrop-blur-xs p-0.5 rounded-xl border border-[rgba(1,75,111,0.14)] shadow-xs flex items-center gap-1 text-xs font-body shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setTaskType('fast');
                    setModelChoice('gemini-2.0-flash-lite');
                  }}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    taskType === 'fast'
                      ? 'bg-[#FCC59A]/30 text-[#8c4b12] border border-[#FCC59A]/60 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title="Schnellste Antwortzeit für kurze Fragen"
                >
                  <Zap className="w-3 h-3 text-[#c27e1a] flex-shrink-0" />
                  <span>Schnell</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTaskType('general');
                    setModelChoice('gemini-2.0-flash');
                  }}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    taskType === 'general'
                      ? 'bg-[#EDF8F7] text-[#014B6F] border border-[#0B9EBC]/40 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title="Ausgewogener Standard-Begleiter (Empfohlen)"
                >
                  <Bot className="w-3 h-3 text-[#014B6F] flex-shrink-0" />
                  <span>Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTaskType('complex');
                    setModelChoice('gemini-1.5-pro');
                  }}
                  className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    taskType === 'complex'
                      ? 'bg-[#FFF0F5] text-[#9e1045] border border-[#FD2675]/35 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title="Für besonders knifflige Probleme und tiefe Analysen"
                >
                  <Brain className="w-3 h-3 text-[#FD2675] flex-shrink-0" />
                  <span>Komplex</span>
                </button>
              </div>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={handleClearHistory}
                disabled={messages.length <= 1 || isLoading}
                className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:hover:text-slate-500 hover:bg-white rounded-lg border border-slate-200 transition-colors flex-shrink-0 shadow-2xs cursor-pointer disabled:cursor-not-allowed"
                title={messages.length <= 1 ? 'Kein Chatverlauf zum Zurücksetzen vorhanden' : 'Chatverlauf zurücksetzen (Neuer Chat)'}
                aria-label="Chatverlauf zurücksetzen"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Row 3: Subtitle in its own row below */}
            <p className="text-sm sm:text-base text-slate-600 font-body leading-relaxed text-left m-0 pt-0.5">
              Geduldige, verständliche Antworten auf deine alltäglichen Digitalfragen
            </p>
          </div>
        </div>
      </div>

      {/* Message Thread - Expands dynamically to fill available height */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 min-h-0 bg-slate-50/50 overscroll-contain">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              {/* Avatar */}
              <div className="flex-shrink-0 mt-0.5">
                {isAssistant ? (
                  <img
                    src={profileAvatar}
                    alt={profileName}
                    onError={(e) => {
                      const fallback = getAssetUrl('profilbild.png');
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="w-8 h-8 rounded-full border-2 border-[#0B9EBC] shadow-xs object-cover bg-[#FDF4E4]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#014B6F] to-[#0B9EBC] text-white flex items-center justify-center font-medium text-xs shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Speech Bubble */}
              <div
                className={`flex flex-col ${
                  isAssistant ? 'items-start' : 'items-end'
                } max-w-[90%] sm:max-w-[82%]`}
              >
                <div
                  className={`rounded-2xl px-4 py-3.5 text-sm sm:text-base leading-relaxed shadow-xs ${
                    isAssistant
                      ? msg.error
                        ? 'bg-rose-50 text-rose-950 border border-rose-200'
                        : 'bg-white/95 text-[#01060C] border border-[rgba(1,75,111,0.12)]'
                      : 'bg-gradient-to-r from-[#014B6F] to-[#0B9EBC] text-white rounded-tr-none shadow-xs'
                  }`}
                >
                  {isAssistant ? (
                    <div className="prose prose-sm sm:prose-base max-w-none text-slate-800 font-body prose-headings:font-heading prose-headings:tracking-normal prose-headings:font-bold prose-headings:text-slate-900 prose-p:my-2 prose-p:leading-relaxed prose-headings:my-3 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-slate-800 prose-strong:text-slate-900 prose-strong:font-semibold">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap font-body text-sm sm:text-base leading-relaxed">{msg.content}</p>
                  )}
                </div>

                {/* Footer of Bubble */}
                <div className="flex items-center gap-2 mt-1 px-1 text-[11px] sm:text-xs text-slate-400 font-body">
                  <span>{msg.timestamp}</span>
                  {isAssistant && (
                    <span className="text-slate-400/80">
                      · KI-Assistent
                    </span>
                  )}
                  {isAssistant && msg.content && (
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="hover:text-slate-700 transition-colors inline-flex items-center gap-0.5 ml-1"
                      title="Antwort kopieren"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-[#235cbb]" />
                          <span className="text-[#235cbb] font-medium">Kopiert</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Kopieren</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading / Generating Indicator */}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex gap-3 max-w-3xl mr-auto">
            <img
              src={profileAvatar}
              alt={profileName}
              onError={(e) => {
                const fallback = getAssetUrl('profilbild.png');
                if (e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
              className="w-8 h-8 rounded-full border border-blue-300 shadow-xs object-cover bg-white animate-pulse"
            />
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-2 font-body">
              <span className="text-xs text-slate-600 font-medium">
                Jan Dennis denkt nach...
              </span>
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#235cbb] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#1b4a99] animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3.5 sm:p-4 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex flex-col sm:flex-row gap-2.5 items-stretch"
        >
          <div className="relative flex-1 flex items-stretch">
            <textarea
              ref={textareaRef}
              value={input}
              maxLength={maxInputLength}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Frag Jan Dennis etwas... (z. B. 'Wie mache ich ein Bildschirmfoto am Handy?')"
              rows={2}
              disabled={isLoading}
              className="w-full resize-none px-4 py-3 text-sm font-body rounded-xl border border-[rgba(1,75,111,0.2)] focus:border-[#0B9EBC] focus:ring-2 focus:ring-[#0B9EBC]/15 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400 placeholder:text-slate-400 leading-snug min-h-[3.5rem] h-[3.5rem] sm:h-full box-border text-[#01060C]"
            />
            <div className="absolute right-2.5 bottom-2 text-[10px] text-slate-400 font-body pointer-events-none hidden sm:flex items-center gap-2">
              {input.length > maxInputLength * 0.75 && (
                <span className={input.length >= maxInputLength ? 'text-[#FD2675] font-semibold' : 'text-slate-400'}>
                  {input.length}/{maxInputLength}
                </span>
              )}
              <span>↵ Senden · Umschalt+↵ Zeilenumbruch</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="inline-flex items-center justify-center gap-2 px-6 rounded-xl font-semibold font-body text-sm text-white bg-gradient-to-r from-[#014B6F] to-[#0B9EBC] hover:brightness-105 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs whitespace-nowrap self-stretch min-h-[3.5rem] h-[3.5rem] sm:h-auto cursor-pointer box-border"
          >
            <Send className="w-4 h-4 flex-shrink-0" />
            <span>Fragen</span>
          </button>
        </form>

        {/* Security & Direct Contact Note */}
        <div className="mt-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500 font-body flex-wrap leading-relaxed">
          <span className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B9EBC] flex-shrink-0" />
            <span>Keine Weitergabe sensibler Passwörter oder Bankdaten.</span>
          </span>
          {onNavigateToContact && (
            <button
              type="button"
              onClick={onNavigateToContact}
              className="text-[#014B6F] hover:text-[#0B9EBC] font-medium inline-flex items-center gap-1 hover:underline whitespace-nowrap cursor-pointer"
            >
              <span>Lieber persönlich mit Jan Dennis sprechen?</span>
              <ArrowRight className="w-3 h-3 flex-shrink-0" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
