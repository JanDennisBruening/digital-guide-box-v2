import { getAssetUrl } from '../utils/assets';
import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquareText,
  MessageSquareHeart,
  Phone,
  ChevronDown,
  Mail,
  Printer,
  ArrowUpRight,
  CheckCircle2,
  Send
} from 'lucide-react';

interface ContactSectionProps {
  openSupport?: boolean;
  onSupportHandled?: () => void;
  supportToggleRef?: React.RefObject<HTMLButtonElement | null>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  openSupport,
  onSupportHandled,
  supportToggleRef
}) => {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const profileSettings = config?.settings?.profile || {};
  const whatsappSettings = config?.settings?.whatsapp || {};

  const advisorName = profileSettings.name || 'Jan Dennis Brüning';
  const advisorRole = profileSettings.role || 'Dein Digital-Guide';
  const advisorAvatar = profileSettings.avatar_url || getAssetUrl('profilbild.png');
  const advisorEmail = profileSettings.email || 'office@janbruening.de';
  const advisorPhone = profileSettings.phone || '+49 1520 2553087';
  const emergencyNote =
    profileSettings.emergency_note || 'Wenn du allein nicht weiterkommst, bin ich für dich da.';

  const [supportOpen, setSupportOpen] = useState(false);
  const [directOpen, setDirectOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Support form state
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportError, setSupportError] = useState('');
  const [requestId, setRequestId] = useState('');
  const hpSupportRef = useRef<HTMLInputElement>(null);

  // Feedback form state
  const [fbEmail, setFbEmail] = useState('');
  const [fbMessage, setFbMessage] = useState('');
  const [fbSubmitting, setFbSubmitting] = useState(false);
  const [fbSubmitted, setFbSubmitted] = useState(false);
  const [fbError, setFbError] = useState('');
  const hpFbRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (openSupport) {
      setSupportOpen(true);
      onSupportHandled?.();
      setTimeout(() => {
        const el = document.getElementById('email') || supportToggleRef?.current;
        el?.focus();
      }, 100);
    }
  }, [openSupport, onSupportHandled, supportToggleRef]);

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hpSupportRef.current && hpSupportRef.current.value) return; // honeypot
    if (!email || !message) return;

    setIsSubmitting(true);
    setSupportError('');

    const genId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setRequestId(genId);

    try {
      const inquiryUrl = config?.inquiryUrl;
      if (inquiryUrl) {
        const res = await fetch(inquiryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'support', email, message, requestId: genId })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Fehler beim Senden');
        }
      }
      setSupportSubmitted(true);
    } catch (err: any) {
      console.warn('Support dispatch error', err);
      setSupportError('Keine Verbindung. Dein Text bleibt erhalten. Bitte versuche es erneut.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hpFbRef.current && hpFbRef.current.value) return; // honeypot
    if (!fbMessage) return;

    setFbSubmitting(true);
    setFbError('');

    try {
      const inquiryUrl = config?.inquiryUrl;
      if (inquiryUrl) {
        const res = await fetch(inquiryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'feedback', email: fbEmail, message: fbMessage })
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Fehler beim Senden');
        }
      }
      setFbSubmitted(true);
    } catch (err: any) {
      console.warn('Feedback dispatch error', err);
      setFbError('Keine Verbindung. Dein Text bleibt erhalten. Bitte versuche es erneut.');
    } finally {
      setFbSubmitting(false);
    }
  };

  const handlePrintCard = () => {
    const prevTitle = document.title;
    document.title = `Kontaktkarte · ${advisorName}`;
    window.addEventListener(
      'afterprint',
      () => {
        document.title = prevTitle;
      },
      { once: true }
    );
    window.print();
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
          {/* Accordion 1: Support ("Du kommst gerade nicht weiter?") */}
          <div
            className={`support${supportOpen ? ' is-open' : ''}`}
            data-state={supportOpen ? 'open' : 'closed'}
          >
            <button
              ref={supportToggleRef as any}
              type="button"
              className="support-toggle"
              data-state={supportOpen ? 'open' : 'closed'}
              onClick={() => setSupportOpen(prev => !prev)}
              aria-expanded={supportOpen}
            >
              <span className="support-icon" aria-hidden="true">
                <MessageSquareText />
              </span>
              <div>
                <h3>Du kommst gerade nicht weiter?</h3>
                <p>Schreib mir. Deine Anfrage erhält Vorrang.</p>
              </div>
              <ChevronDown aria-hidden="true" />
            </button>

            {supportOpen && (
              <div className="box-disclosure-content" data-state="open">
                <div className="support-form">
                  {supportSubmitted ? (
                    <div className="success" role="status">
                      <CheckCircle2 style={{ marginBottom: '.625rem', color: '#187a55' }} />
                      <strong>Deine Anfrage ist angekommen.</strong>
                      <p>
                        Sie liegt im priorisierten Eingang. Ich melde mich unter {email} bei dir.
                      </p>
                      <p className="form-note">Anfragenummer: {requestId}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSupportSubmit} aria-busy={isSubmitting}>
                      <div className="field-group" style={{ marginBottom: '0.875rem' }}>
                        <label
                          htmlFor="email"
                          style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '0.3125rem'
                          }}
                        >
                          Deine E-Mail-Adresse
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          required
                          disabled={isSubmitting}
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
                        <label
                          htmlFor="message"
                          style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '0.3125rem'
                          }}
                        >
                          Wobei brauchst du Hilfe?
                        </label>
                        <textarea
                          id="message"
                          required
                          disabled={isSubmitting}
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

                      {/* Honeypot field */}
                      <div className="hp" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website"
                          name="website"
                          ref={hpSupportRef}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <p className="form-note" id="support-privacy">
                        Bitte keine Passwörter oder Bestätigungscodes senden. E-Mail-Adresse und
                        Nachricht werden zur Bearbeitung deiner Anfrage gespeichert und nur von Jan
                        eingesehen.
                      </p>

                      {supportError && (
                        <p className="error" role="alert" style={{ margin: '0.75rem 0' }}>
                          {supportError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="primary-button"
                        disabled={isSubmitting}
                        style={{ marginTop: '1.125rem', width: '100%' }}
                      >
                        <Send aria-hidden="true" />
                        <span>{isSubmitting ? 'Wird gesendet …' : 'Priorisierte Anfrage senden'}</span>
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
          <div
            className={`support direct-contact${directOpen ? ' is-open' : ''}`}
            data-state={directOpen ? 'open' : 'closed'}
          >
            <button
              type="button"
              className="support-toggle"
              data-state={directOpen ? 'open' : 'closed'}
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
              <ChevronDown aria-hidden="true" />
            </button>

            {directOpen && (
              <div className="box-disclosure-content" data-state="open">
                <div className="direct-contact-body">
                  <div className="contact-person">
                    <img
                      src={advisorAvatar}
                      alt=""
                      width="64"
                      height="64"
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h3>{advisorName}</h3>
                      <p>{advisorRole}</p>
                    </div>
                  </div>

                  <a className="contact-link" href={`mailto:${advisorEmail}`}>
                    <Mail aria-hidden="true" />
                    <span>
                      <small>E-Mail</small>
                      {advisorEmail}
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>

                  <a className="contact-link" href={`tel:${advisorPhone.replace(/\s+/g, '')}`}>
                    <Phone aria-hidden="true" />
                    <span>
                      <small>Telefon</small>
                      {advisorPhone}
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
          <div
            className={`support feedback-panel${feedbackOpen ? ' is-open' : ''}`}
            data-state={feedbackOpen ? 'open' : 'closed'}
          >
            <button
              type="button"
              className="support-toggle"
              data-state={feedbackOpen ? 'open' : 'closed'}
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
              <ChevronDown aria-hidden="true" />
            </button>

            {feedbackOpen && (
              <div className="box-disclosure-content" data-state="open">
                <div className="support-form">
                  {fbSubmitted ? (
                    <div className="success" role="status">
                      <CheckCircle2 style={{ marginBottom: '.625rem', color: '#187a55' }} />
                      <strong>Danke für deine Rückmeldung.</strong>
                      <p>Dein Feedback ist angekommen und hilft, die Box besser zu machen.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} aria-busy={fbSubmitting}>
                      <div className="field-group" style={{ marginBottom: '0.875rem' }}>
                        <label
                          htmlFor="fb-email"
                          style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '0.3125rem'
                          }}
                        >
                          Deine E-Mail (optional)
                        </label>
                        <input
                          id="fb-email"
                          type="email"
                          disabled={fbSubmitting}
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
                        <label
                          htmlFor="fb-message"
                          style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            marginBottom: '0.3125rem'
                          }}
                        >
                          Dein Feedback oder Wunsch
                        </label>
                        <textarea
                          id="fb-message"
                          required
                          disabled={fbSubmitting}
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

                      {/* Honeypot field */}
                      <div className="hp" aria-hidden="true">
                        <label htmlFor="fb-website">Website</label>
                        <input
                          id="fb-website"
                          name="website"
                          ref={hpFbRef}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {fbError && (
                        <p className="error" role="alert" style={{ margin: '0.75rem 0' }}>
                          {fbError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="primary-button"
                        disabled={fbSubmitting}
                        style={{ marginTop: '0.75rem', width: '100%' }}
                      >
                        <Send aria-hidden="true" />
                        <span>{fbSubmitting ? 'Wird gesendet …' : 'Feedback senden'}</span>
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
      {whatsappSettings.enabled !== false && (
        <section className="channel-section" aria-labelledby="channel-title">
          <div className="channel-card">
            <div className="channel-graphic" aria-hidden="true">
              <div className="channel-logo">
                <img src={getAssetUrl('whatsapp.svg')} width="76" height="76" alt="" />
              </div>
              <span className="channel-chat-line" />
              <span className="channel-chat-line short" />
            </div>
            <span className="channel-label">
              {whatsappSettings.badge || 'Direkt auf dem Smartphone immer dabei'}
            </span>
            <h2 id="channel-title">
              {whatsappSettings.title || 'Neu: WhatsApp-Kanal'}
            </h2>
            <p>
              {whatsappSettings.description ||
                'Im Kanal bekommst du neue Tipps. Hier in der Box findest du die Anleitungen zum Nachlesen und Ausprobieren.'}
            </p>
            <a
              className="channel-button"
              href={whatsappSettings.url || 'https://whatsapp.com/channel/0029VbBej87KAwEt5x4IYN03'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={getAssetUrl('whatsapp.svg')} width="22" height="22" alt="" />
              <span>Kanal ansehen</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <span className="channel-note">
              {whatsappSettings.footer_note || 'Kostenlos abonnieren. In Ruhe mitlesen.'}
            </span>
          </div>
        </section>
      )}
    </aside>
  );
};
