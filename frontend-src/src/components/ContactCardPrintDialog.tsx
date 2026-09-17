import React, { useEffect } from 'react';
import { X, Printer, Phone, Mail, Globe, Scissors } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface ContactCardPrintDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactCardPrintDialog: React.FC<ContactCardPrintDialogProps> = ({
  isOpen,
  onClose
}) => {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const profile = config?.settings?.profile || {};
  const profileName = profile.name || 'Jan Dennis Brüning';
  const profileRole = profile.role || 'Dein Digital-Guide';
  const profilePhone = profile.phone || '+49 1520 2553087';
  const profileEmail = profile.email || 'office@janbruening.de';
  const profileAvatar = profile.avatar_url || getAssetUrl('profilbild.png');
  const siteUrl = config?.siteUrl || 'https://www.janbruening.de';
  const siteDomain = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    try {
      const origin = window.location.origin;
      const html = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
          <meta charset="utf-8">
          <title>Kontaktkarte · Jan Dennis Brüning</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 20mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background: #fff;
              color: #1b2941;
              margin: 0;
              padding: 20px;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .print-container {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
            }
            .cut-hint {
              font-size: 11px;
              color: #596579;
              display: flex;
              align-items: center;
              gap: 6px;
              margin-bottom: 4px;
            }
            .card {
              box-sizing: border-box;
              width: 85mm;
              height: 55mm;
              border: 0.35mm dashed #a9b7ca;
              border-radius: 3mm;
              padding: 5mm 6mm;
              background: #ffffff;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .header {
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .avatar {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              object-fit: cover;
              border: 1px solid #dce5f1;
              flex-shrink: 0;
            }
            .name {
              font-size: 15px;
              font-weight: 700;
              color: #1b2941;
              margin: 0;
              line-height: 1.2;
            }
            .sub {
              font-size: 11px;
              color: #596579;
              font-weight: 500;
              margin: 2px 0 0;
            }
            .intro {
              font-size: 10.5px;
              color: #235cbb;
              font-weight: 600;
              margin: 3px 0 0;
            }
            .contact-rows {
              display: flex;
              flex-direction: column;
              gap: 4px;
              font-size: 11px;
              color: #1b2941;
              border-top: 1px solid #e2e8f0;
              padding-top: 5px;
            }
            .row {
              display: flex;
              align-items: center;
              gap: 6px;
            }
            .row strong {
              color: #235cbb;
              font-size: 10px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.3px;
              min-width: 44px;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="cut-hint">✂ Entlang der gestrichelten Linie ausschneiden (Standardformat 85 × 55 mm):</div>
            <div class="card">
              <div>
                <div class="header">
                  <img src="${profileAvatar}" class="avatar" alt="${profileName}" />
                  <div>
                    <h1 class="name">${profileName}</h1>
                    <p class="sub">${profileRole}</p>
                    <p class="intro">Dein Kontakt für digitale Fragen</p>
                  </div>
                </div>
              </div>
              <div class="contact-rows">
                <div class="row"><strong>Telefon</strong> ${profilePhone}</div>
                <div class="row"><strong>E-Mail</strong> ${profileEmail}</div>
                <div class="row"><strong>Website</strong> ${siteDomain}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      let iframe = document.getElementById('contact-print-iframe') as HTMLIFrameElement | null;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'contact-print-iframe';
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
            const popup = window.open('', 'contact_print', 'width=850,height=900');
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
      console.warn('Popup print blocked or not supported, falling back to window.print()', err);
    }

    // Fallback: print current window
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="print-dialog-title"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#235cbb]/10 text-[#235cbb] flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h2 id="print-dialog-title" className="text-base sm:text-lg font-bold font-heading text-slate-800 m-0">
                Druckansicht · Kontaktkarte
              </h2>
              <p className="text-xs text-slate-500 font-body m-0">
                Visitenkarte von Jan Dennis Brüning zum Ausdrucken
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Card Preview on Paper desk */}
        <div className="p-5 sm:p-6 bg-slate-100/70 flex flex-col items-center justify-center">
          <div className="w-full max-w-sm flex items-center justify-between text-xs text-slate-500 font-body mb-2 px-1">
            <span className="flex items-center gap-1 text-slate-600">
              <Scissors className="w-3.5 h-3.5 text-slate-400" />
              Schnittformat: 85 × 55 mm
            </span>
            <span className="text-[11px] text-slate-400">Standard-Visitenkarte</span>
          </div>

          {/* The Business Card */}
          <div className="w-full max-w-sm aspect-[85/55] bg-white rounded-xl border-2 border-dashed border-[#a9b7ca] shadow-md p-4 sm:p-5 flex flex-col justify-between text-left transition-transform hover:scale-[1.01]">
            {/* Header: Photo + Name */}
            <div className="flex items-center gap-3 sm:gap-3.5">
              <img
                src={profileAvatar}
                alt={profileName}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-slate-200 shadow-xs object-cover bg-white flex-shrink-0"
              />
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold font-heading text-slate-800 tracking-normal m-0 truncate">
                  {profileName}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 font-body m-0">
                  {profileRole}
                </p>
                <p className="text-xs text-[#235cbb] font-semibold font-body m-0 mt-0.5 truncate">
                  Dein Kontakt für digitale Fragen
                </p>
              </div>
            </div>

            {/* Contact Rows */}
            <div className="border-t border-slate-200 pt-2.5 space-y-2 text-xs sm:text-sm font-body text-slate-700">
              <a
                href={`tel:${profilePhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 text-slate-800 hover:text-[#235cbb] transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-[#235cbb]/10 text-[#235cbb] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3 h-3" />
                </div>
                <span className="font-semibold">{profilePhone}</span>
              </a>

              <a
                href={`mailto:${profileEmail}`}
                className="flex items-center gap-2.5 text-slate-800 hover:text-[#235cbb] transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-[#235cbb]/10 text-[#235cbb] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3 h-3" />
                </div>
                <span className="font-semibold">{profileEmail}</span>
              </a>

              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-800 hover:text-[#235cbb] transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-[#235cbb]/10 text-[#235cbb] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-3 h-3" />
                </div>
                <span className="font-semibold">{siteDomain}</span>
              </a>
            </div>
          </div>

          <p className="text-xs text-slate-500 font-body text-center mt-3 max-w-xs leading-relaxed">
            Drucke diese Karte aus oder speichere sie als PDF, um die Kontaktdaten immer griffbereit zu haben.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium font-body text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            Schließen
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold font-body text-white bg-[#235cbb] hover:bg-[#1b4a99] active:bg-[#153b7b] shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Jetzt drucken</span>
          </button>
        </div>
      </div>
    </div>
  );
};
