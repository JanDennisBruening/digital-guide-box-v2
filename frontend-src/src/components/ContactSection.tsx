import React, { useState, useEffect } from 'react';
import {
  MessageSquareText,
  MessageSquareHeart,
  Phone,
  ChevronDown,
  Mail,
  Printer,
  ArrowUpRight,
  CheckCircle2,
  Send,
  Sparkles
} from 'lucide-react';
import { ContactCardPrintDialog } from './ContactCardPrintDialog';
import { getAssetUrl } from '../utils/assets';

interface ContactSectionProps {
  openSupport?: boolean;
  onSupportHandled?: () => void;
  onOpenAssistant?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  openSupport,
  onSupportHandled,
  onOpenAssistant
}) => {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const profile = config?.settings?.profile || {};
  const whatsapp = config?.settings?.whatsapp || {};

  const profileName = profile.name || 'Jan Dennis Brüning';
  const profileRole = profile.role || 'Dein Digital-Guide';
  const profileAvatar = profile.avatar_url || getAssetUrl('profilbild.png');
  const profileEmail = profile.email || 'office@janbruening.de';
  const profilePhone = profile.phone || '+49 1520 2553087';
  const emergencyNote = profile.emergency_note || 'Wenn du allein nicht weiterkommst, bin ich für dich da.';

  const isWhatsAppEnabled = whatsapp.enabled !== false;
  const waBadge = whatsapp.badge || 'Direkt auf dem Smartphone immer dabei';
  const waTitle = whatsapp.title || 'Neu: WhatsApp-Kanal';
  const waDesc = whatsapp.description || 'Im Kanal bekommst du neue Tipps. Hier in der Box findest du die Anleitungen zum Nachlesen und Ausprobieren.';
  const waUrl = whatsapp.url || 'https://whatsapp.com/channel/0029VbBej87KAwEt5x4IYN03';
  const waFoot = whatsapp.footer_note || 'Kostenlos abonnieren. In Ruhe mitlesen.';

  const [supportOpen, setSupportOpen] = useState(false);
  const [directOpen, setDirectOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);

  // Support form state
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');

  // Feedback form state
  const [fbEmail, setFbEmail] = useState('');
  const [fbMessage, setFbMessage] = useState('');
  const [fbSubmitted, setFbSubmitted] = useState(false);

  useEffect(() => {
    if (openSupport) {
      setSupportOpen(true);
      onSupportHandled?.();
    }
  }, [openSupport, onSupportHandled]);

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    const reqId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setRequestId(reqId);
    setSupportSubmitted(true);

    if (config?.inquiryUrl) {
      try {
        await fetch(config.inquiryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            message,
            requestId: reqId,
            device: navigator.userAgent
          })
        });
      } catch (err) {
        console.warn('Inquiry submission error:', err);
      }
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbMessage) return;
    setFbSubmitted(true);
  };

  const handlePrintCard = () => {
    setIsPrintDialogOpen(true);
  };

  return (
    <aside className="box-sidebar" aria-label="Kontakt, Feedback und Digitalkanal">
      <section className="sidebar-contact" aria-labelledby="contact-title">
        <header className="sidebar-contact-heading">
          <h2 id="contact-title">
            <MessageSquareText aria-hidden="true" />
            <span>Kontakt &amp; Feedback</span>
          </h2>
          <p>{emergencyNote}</p>
        </header>

        <div className="contact-stack">
          {/* Card: AI Assistant Quick Action */}
          {onOpenAssistant && (
            <div className="support support-ai mb-2">
              <button
                type="button"
                className="support-toggle"
                onClick={onOpenAssistant}
                title="KI-Assistenten öffnen"
                aria-label="KI-Assistenten öffnen"
              >
                <span className="support-icon support-icon-ai" aria-hidden="true">
                  <Sparkles />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3>Sofort-Hilfe mit KI</h3>
                    <span className="support-ai-badge">Neu</span>
                  </div>
                  <p>Frag Jan Dennis KI rund um die Uhr – verständliche Unterstützung ohne Wartezeit.</p>
                </div>
                <ArrowUpRight className="support-arrow-ai" aria-hidden="true" />
              </button>
            </div>
          )}
          {/* Accordion 1: Support ("Du kommst gerade nicht weiter?") */}
          <div className={`support${supportOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="support-toggle"
              onClick={() => setSupportOpen(prev => !prev)}
              aria-expanded={supportOpen}
            >
              <span className="support-icon" aria-hidden="true">
                <MessageSquareText />
              </span>
              <div>
                <h3>Du kommst nicht weiter?</h3>
                <p>Schreib mir. Deine Anfrage erhält Vorrang.</p>
              </div>
              <ChevronDown
                aria-hidden="true"
                style={{
                  transform: supportOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                  marginLeft: 'auto'
                }}
              />
            </button>

            {supportOpen && (
              <div className="box-disclosure-content" data-state="open">
                <div className="support-form">
                  {supportSubmitted ? (
                    <div className="success" role="status">
                      <CheckCircle2 style={{ marginBottom: '.625rem', color: '#235cbb' }} />
                      <strong>Deine Anfrage ist angekommen.</strong>
                      <p>
                        Sie liegt im priorisierten Eingang. Ich melde mich unter {email} bei dir.
                      </p>
                      <p className="form-note">Anfragenummer: {requestId}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSupportSubmit}>
                      <div className="field-group" style={{ marginBottom: '0.875rem' }}>
                        <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.3125rem' }}>
                          Deine E-Mail-Adresse
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          required
                          maxLength={254}
                          placeholder="name@beispiel.de"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #8fa6c5',
                            background: '#fff',
                            fontSize: '0.9375rem'
                          }}
                        />
                      </div>

                      <div className="field-group" style={{ marginBottom: '0.875rem' }}>
                        <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.3125rem' }}>
                          Wobei brauchst du Hilfe?
                        </label>
                        <textarea
                          id="message"
                          required
                          minLength={10}
                          maxLength={4000}
                          rows={4}
                          placeholder="Beschreibe kurz deine Frage …"
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #8fa6c5',
                            background: '#fff',
                            fontSize: '0.9375rem',
                            resize: 'vertical'
                          }}
                        />
                        <p style={{ fontSize: '0.75rem', color: '#596579', marginTop: '0.25rem' }}>
                          Nenne dein Gerät, die App und was gerade nicht klappt.
                        </p>
                      </div>

                      <p className="form-note" id="support-privacy">
                        Bitte keine Passwörter oder Bestätigungscodes senden. E-Mail-Adresse und
                        Nachricht werden zur Bearbeitung deiner Anfrage gespeichert und nur von Jan
                        eingesehen.
                      </p>

                      <button
                        type="submit"
                        className="primary-button"
                        style={{ marginTop: '1.125rem', width: '100%' }}
                      >
                        <Send aria-hidden="true" />
                        <span>Priorisierte Anfrage senden</span>
                      </button>

                      <p className="form-note" style={{ marginTop: '0.5rem' }}>
                        Ich antworte per E-Mail. Eine feste Antwortzeit kann ich nicht zusagen.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Accordion 2: Direct Contact ("Dringende Hilfe") */}
          <div className={`support direct-contact${directOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="support-toggle"
              onClick={() => setDirectOpen(prev => !prev)}
              aria-expanded={directOpen}
            >
              <span className="support-icon" aria-hidden="true">
                <Phone />
              </span>
              <div>
                <h3>Dringende Hilfe</h3>
                <p>So erreichst du mich persönlich.</p>
              </div>
              <ChevronDown
                aria-hidden="true"
                style={{
                  transform: directOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                  marginLeft: 'auto'
                }}
              />
            </button>

            {directOpen && (
              <div className="box-disclosure-content" data-state="open">
                <div className="direct-contact-body">
                  <div className="contact-person">
                    <img
                      src={profileAvatar}
                      alt={profileName}
                      width="64"
                      height="64"
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h3>{profileName}</h3>
                      <p>{profileRole}</p>
                    </div>
                  </div>

                  <a className="contact-link" href={`mailto:${profileEmail}`}>
                    <Mail aria-hidden="true" />
                    <span>
                      <small>E-Mail</small>
                      {profileEmail}
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>

                  <a className="contact-link" href={`tel:${profilePhone.replace(/\s+/g, '')}`}>
                    <Phone aria-hidden="true" />
                    <span>
                      <small>Telefon</small>
                      {profilePhone}
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    className="contact-print-button"
                    onClick={handlePrintCard}
                  >
                    <Printer aria-hidden="true" />
                    <span>Kontaktkarte drucken</span>
                  </button>

                  <p className="form-note">
                    Ich melde mich, sobald ich kann. Eine sofortige Antwort kann ich nicht zusagen.
                  </p>
                  <p className="form-note">
                    Die Kontaktkarte kannst du für später ausdrucken.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Feedback ("Feedback & Wünsche") */}
          <div className={`support feedback-panel${feedbackOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="support-toggle"
              onClick={() => setFeedbackOpen(prev => !prev)}
              aria-expanded={feedbackOpen}
            >
              <span className="support-icon" aria-hidden="true">
                <MessageSquareHeart />
              </span>
              <div>
                <h3>Feedback &amp; Wünsche</h3>
                <p>Deine Ideen und Verbesserungswünsche.</p>
              </div>
              <ChevronDown
                aria-hidden="true"
                style={{
                  transform: feedbackOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                  marginLeft: 'auto'
                }}
              />
            </button>

            {feedbackOpen && (
              <div className="box-disclosure-content" data-state="open">
                <div className="support-form">
                  {fbSubmitted ? (
                    <div className="success" role="status">
                      <CheckCircle2 style={{ marginBottom: '.625rem', color: '#235cbb' }} />
                      <strong>Danke für deine Rückmeldung.</strong>
                      <p>Dein Feedback ist angekommen und hilft, die Box besser zu machen.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit}>
                      <div className="field-group" style={{ marginBottom: '0.875rem' }}>
                        <label htmlFor="fb-email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.3125rem' }}>
                          Deine E-Mail (optional)
                        </label>
                        <input
                          id="fb-email"
                          type="email"
                          placeholder="name@beispiel.de"
                          value={fbEmail}
                          onChange={e => setFbEmail(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #8fa6c5',
                            background: '#fff',
                            fontSize: '0.9375rem'
                          }}
                        />
                      </div>

                      <div className="field-group" style={{ marginBottom: '0.875rem' }}>
                        <label htmlFor="fb-message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.3125rem' }}>
                          Dein Feedback oder Wunsch
                        </label>
                        <textarea
                          id="fb-message"
                          required
                          rows={3}
                          placeholder="Welche Anleitung fehlt dir? Was können wir verbessern?"
                          value={fbMessage}
                          onChange={e => setFbMessage(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.625rem 0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid #8fa6c5',
                            background: '#fff',
                            fontSize: '0.9375rem',
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="primary-button"
                        style={{ marginTop: '0.75rem', width: '100%' }}
                      >
                        <Send aria-hidden="true" />
                        <span>Feedback senden</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp Channel Section */}
      {isWhatsAppEnabled && (
        <section className="channel-section" aria-labelledby="channel-title">
          <div className="channel-card">
            <div className="channel-graphic" aria-hidden="true">
              <div className="channel-logo">
                <img src={getAssetUrl('whatsapp.svg')} width="76" height="76" alt="" />
              </div>
              <span className="channel-chat-line" />
              <span className="channel-chat-line short" />
            </div>
            <span className="channel-label">{waBadge}</span>
            <h2 id="channel-title">{waTitle}</h2>
            <p>{waDesc}</p>
            <a
              className="channel-button"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={getAssetUrl('whatsapp.svg')} width="22" height="22" alt="" />
              <span>Kanal ansehen</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <span className="channel-note">{waFoot}</span>
          </div>
        </section>
      )}

      {/* Print Preview Modal for Contact Card */}
      <ContactCardPrintDialog
        isOpen={isPrintDialogOpen}
        onClose={() => setIsPrintDialogOpen(false)}
      />
    </aside>
  );
};
