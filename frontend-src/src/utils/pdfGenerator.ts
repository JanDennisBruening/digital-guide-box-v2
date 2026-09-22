import { Guide } from '../types';

export function generateGuidePrintHtml(guide: Guide, origin: string = ''): string {
  const prepList = guide.learning?.preparation?.length
    ? `
      <div class="prep-card">
        <h3 class="section-title">Bevor du beginnst:</h3>
        <ul class="prep-list">
          ${guide.learning.preparation.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>
    `
    : '';

  const stepsHtml = guide.steps
    .map(
      (step, idx) => `
      <div class="step-card">
        <div class="step-num">${idx + 1}</div>
        <div class="step-content">
          <h4 class="step-title">${step.title}</h4>
          <p class="step-text">${step.text}</p>
          ${
            step.check
              ? `<div class="step-check"><strong>✓ Prüfen:</strong> ${step.check}</div>`
              : ''
          }
        </div>
      </div>
    `
    )
    .join('');

  const resultHtml = guide.learning?.result
    ? `
      <div class="info-box result-box">
        <strong>Ergebnis:</strong> ${guide.learning.result}
      </div>
    `
    : '';

  const tipHtml = guide.tip
    ? `
      <div class="info-box tip-box">
        <strong>Gut zu wissen:</strong> ${guide.tip}
      </div>
    `
    : '';

  const helpHtml =
    guide.learning?.ifStuck || guide.learning?.ifDifferent
      ? `
      <div class="info-box help-box">
        <strong>Falls es anders aussieht:</strong> ${
          guide.learning.ifStuck || guide.learning.ifDifferent
        }
      </div>
    `
      : '';

  const avatarUrl = origin ? `${origin}/profilbild.png` : '/profilbild.png';

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Anleitung: ${guide.title} · Digital-Guide-Box</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 14mm 16mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1b2941;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 13px;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #235cbb;
      padding-bottom: 10px;
      margin-bottom: 14px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
      border: 1px solid #dce5f1;
    }
    .brand-meta h2 {
      font-size: 15px;
      font-weight: 700;
      color: #1b2941;
      margin: 0;
      line-height: 1.2;
    }
    .brand-meta p {
      font-size: 11px;
      color: #596579;
      margin: 2px 0 0;
    }
    .header-details {
      text-align: right;
      font-size: 11px;
      color: #596579;
    }
    .badge {
      display: inline-block;
      background: #e9f1fb;
      color: #235cbb;
      font-weight: 700;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 6px;
      margin-bottom: 3px;
    }
    .guide-title {
      font-size: 21px;
      font-weight: 700;
      color: #1b2941;
      margin: 0 0 4px;
      line-height: 1.25;
    }
    .guide-subtitle {
      font-size: 13px;
      color: #475569;
      margin: 0 0 12px;
      line-height: 1.4;
    }
    .prep-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .section-title {
      font-size: 12.5px;
      font-weight: 700;
      color: #235cbb;
      margin: 0 0 6px;
    }
    .prep-list {
      margin: 0;
      padding-left: 18px;
      font-size: 12px;
      color: #334155;
    }
    .prep-list li {
      margin-bottom: 3px;
    }
    .steps-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .step-card {
      display: flex;
      gap: 12px;
      padding: 10px 12px;
      background: #fcfdfe;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      page-break-inside: avoid;
    }
    .step-num {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #235cbb;
      color: #ffffff;
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }
    .step-content {
      flex: 1;
    }
    .step-title {
      font-size: 14px;
      font-weight: 700;
      color: #1b2941;
      margin: 0 0 4px;
    }
    .step-text {
      font-size: 12.5px;
      color: #334155;
      margin: 0;
      line-height: 1.45;
    }
    .step-check {
      font-size: 11.5px;
      color: #047857;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 4px 8px;
      border-radius: 6px;
      margin-top: 6px;
    }
    .info-box {
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 12px;
      margin-top: 10px;
      page-break-inside: avoid;
      line-height: 1.45;
    }
    .result-box {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      color: #065f46;
    }
    .tip-box {
      background: #fdf4ff;
      border: 1px solid #f5d0fe;
      color: #86198f;
    }
    .help-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      color: #334155;
    }
    .page-footer {
      margin-top: 16px;
      padding-top: 8px;
      border-top: 1px solid #cbd5e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #64748b;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
  <div class="page-header">
    <div class="brand">
      <img src="${avatarUrl}" class="brand-avatar" alt="Jan Dennis Brüning" />
      <div class="brand-meta">
        <h2>Jan Dennis Brüning</h2>
        <p>Dein Digital-Guide · Digital-Guide-Box</p>
      </div>
    </div>
    <div class="header-details">
      <div class="badge">${guide.category}</div>
      <div>Lesezeit: ca. ${guide.minutes} Min. ${guide.scope ? `· ${guide.scope}` : ''}</div>
      <div>Stand: ${guide.updatedAt}</div>
    </div>
  </div>

  <h1 class="guide-title">${guide.title}</h1>
  <p class="guide-subtitle">${guide.subtitle}</p>

  ${prepList}

  <div class="steps-container">
    ${stepsHtml}
  </div>

  ${resultHtml}
  ${tipHtml}
  ${helpHtml}

  <div class="page-footer">
    <div>Fragen oder persönliche Hilfe? Jan Dennis Brüning · Tel: +49 1520 2553087</div>
    <div>E-Mail: office@janbruening.de · Web: www.janbruening.de</div>
  </div>
</body>
</html>`;
}

export function openGuidePrintWindow(guide: Guide): void {
  try {
    const origin = window.location.origin;
    const html = generateGuidePrintHtml(guide, origin);

    let iframe = document.getElementById('guide-print-iframe') as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'guide-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();

      setTimeout(() => {
        try {
          iframe?.contentWindow?.focus();
          iframe?.contentWindow?.print();
        } catch (printErr) {
          console.warn('Iframe print error, falling back to popup', printErr);
          const popup = window.open('', 'guide_print', 'width=850,height=900');
          if (popup) {
            popup.document.open();
            popup.document.write(html);
            popup.document.close();
            popup.focus();
            popup.print();
          }
        }
      }, 300);
      return;
    }
  } catch (err) {
    console.warn('Print window initialization error, falling back to window.print()', err);
  }

  // Direct fallback
  window.print();
}
