import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Sparkles,
  PanelRightClose,
  PanelRightOpen
} from 'lucide-react';
import { ContactCardPrintDialog } from './ContactCardPrintDialog';
import { getAssetUrl } from '../utils/assets';

interface ContactSectionProps {
  openSupport?: boolean;
  onSupportHandled?: () => void;
  onOpenAssistant?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onResizeStart?: (e: React.MouseEvent) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  openSupport,
  onSupportHandled,
  onOpenAssistant,
  isCollapsed,
  onToggleCollapse,
  onResizeStart
}) => {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const profile = config?.settings?.profile || {};
  const whatsapp = config?.settings?.whatsapp || {};

  const profileName = profile.name || 'Jan Dennis Brüning';
  const profileRole = profile.role && profile.role !== 'Dein Digital-Guide' ? profile.role : 'Dein persönlicher Digitalguide';
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

  // Desktop hover detection: hover capability and fine pointer (mouse / trackpad)
  const isDesktopHover = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const supportCardRef = useRef<HTMLDivElement | null>(null);
  const directCardRef = useRef<HTMLDivElement | null>(null);
  const feedbackCardRef = useRef<HTMLDivElement | null>(null);

  const supportLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const directLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (supportLeaveTimer.current) clearTimeout(supportLeaveTimer.current);
      if (directLeaveTimer.current) clearTimeout(directLeaveTimer.current);
      if (feedbackLeaveTimer.current) clearTimeout(feedbackLeaveTimer.current);
    };
  }, []);

  // Handlers for "Du kommst nicht weiter?"
  const handleSupportMouseEnter = () => {
    if (!isDesktopHover()) return;
    if (supportLeaveTimer.current) {
      clearTimeout(supportLeaveTimer.current);
      supportLeaveTimer.current = null;
    }
    setSupportOpen(true);
  };

  const handleSupportMouseLeave = () => {
    if (!isDesktopHover()) return;
    // Don't close if user is currently typing/focused in an input inside
    if (supportCardRef.current?.contains(document.activeElement)) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    }
    if (supportLeaveTimer.current) clearTimeout(supportLeaveTimer.current);
    supportLeaveTimer.current = setTimeout(() => {
      if (!supportCardRef.current?.matches(':hover')) {
        setSupportOpen(false);
      }
    }, 160);
  };

  const handleSupportBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!isDesktopHover()) return;
    const nextTarget = e.relatedTarget as Node | null;
    if (!supportCardRef.current?.contains(nextTarget) && !supportCardRef.current?.matches(':hover')) {
      setSupportOpen(false);
    }
  };

  // Handlers for "Dringende Hilfe"
  const handleDirectMouseEnter = () => {
    if (!isDesktopHover()) return;
    if (directLeaveTimer.current) {
      clearTimeout(directLeaveTimer.current);
      directLeaveTimer.current = null;
    }
    setDirectOpen(true);
  };

  const handleDirectMouseLeave = () => {
    if (!isDesktopHover()) return;
    if (directLeaveTimer.current) clearTimeout(directLeaveTimer.current);
    directLeaveTimer.current = setTimeout(() => {
      if (!directCardRef.current?.matches(':hover')) {
        setDirectOpen(false);
      }
    }, 160);
  };

  // Handlers for "Feedback & Wünsche"
  const handleFeedbackMouseEnter = () => {
    if (!isDesktopHover()) return;
    if (feedbackLeaveTimer.current) {
      clearTimeout(feedbackLeaveTimer.current);
      feedbackLeaveTimer.current = null;
    }
    setFeedbackOpen(true);
  };

  const handleFeedbackMouseLeave = () => {
    if (!isDesktopHover()) return;
    // Don't close if user is currently typing/focused in an input inside
    if (feedbackCardRef.current?.contains(document.activeElement)) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    }
    if (feedbackLeaveTimer.current) clearTimeout(feedbackLeaveTimer.current);
    feedbackLeaveTimer.current = setTimeout(() => {
      if (!feedbackCardRef.current?.matches(':hover')) {
        setFeedbackOpen(false);
      }
    }, 160);
  };

  const handleFeedbackBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!isDesktopHover()) return;
    const nextTarget = e.relatedTarget as Node | null;
    if (!feedbackCardRef.current?.contains(nextTarget) && !feedbackCardRef.current?.matches(':hover')) {
      setFeedbackOpen(false);
    }
  };

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

  if (isCollapsed) {
    return (
      <aside
        className="box-sidebar box-sidebar-docked"
        aria-label="Kontakt, Feedback und WhatsApp-Kanal öffnen"
        onClick={onToggleCollapse}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleCollapse?.();
          }
        }}
        title="Seitenleiste ausklappen (Kontakt & WhatsApp-Kanal)"
      >
        <div className="sidebar-docked-top">
          <button
            type="button"
            className="sidebar-docked-toggle-btn"
            aria-label="Seitenleiste ausklappen"
            title="Seitenleiste ausklappen"
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollapse?.();
            }}
          >
            <PanelRightOpen className="w-4 h-4 text-[#014B6F]" />
          </button>

          <div className="sidebar-docked-icons" aria-hidden="true">
            <span className="sidebar-docked-icon-badge" title="Kontakt & Feedback">
              <MessageSquareText className="w-3.5 h-3.5 text-[#014B6F]" />
            </span>
            <span className="sidebar-docked-icon-badge" title="Sofort-Hilfe mit KI">
              <Sparkles className="w-3.5 h-3.5 text-[#0B9EBC]" />
            </span>
            {isWhatsAppEnabled && (
              <span className="sidebar-docked-icon-badge" title="WhatsApp-Kanal">
                <img src={getAssetUrl('whatsapp.svg')} alt="" className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>

        <div className="sidebar-docked-vertical-title" aria-hidden="true">
          <span>Kontakt &amp; WhatsApp</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="box-sidebar" aria-label="Kontakt, Feedback und Digitalkanal">
      {/* Desktop Split-Pane Resize Handle */}
      {onResizeStart && (
        <div
          className="sidebar-resize-handle"
          onMouseDown={onResizeStart}
          role="separator"
          aria-orientation="vertical"
          title="Seitenleiste anpassen (Ziehen)"
        >
          <div className="sidebar-resize-indicator" />
        </div>
      )}

      {/* Desktop Edge Toggle Button (Docked on left border at same vertical position as collapsed toggle) */}
      {onToggleCollapse && (
        <button
          type="button"
          className="sidebar-edge-toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse();
          }}
          aria-label="Seitenleiste einklappen"
          title="Seitenleiste einklappen"
        >
          <PanelRightClose className="w-4 h-4 text-[#014B6F]" />
        </button>
      )}

      <section className="sidebar-contact" aria-labelledby="contact-title">
        <header className="sidebar-contact-heading">
          <h2 id="contact-title" className="m-0 flex items-center gap-2">
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
                <div className="support-ai-body">
                  <div className="support-ai-header">
                    <h3>Sofort-Hilfe mit KI</h3>
                    <ArrowUpRight className="support-arrow-ai" aria-hidden="true" />
                  </div>
                  <p>Frag Jan Dennis KI rund um die Uhr – verständliche Unterstützung ohne Wartezeit.</p>
                </div>
                <span className="support-ai-badge">Neu</span>
              </button>
            </div>
          )}
          {/* Accordion 1: Support ("Du kommst gerade nicht weiter?") */}
          <div
            ref={supportCardRef}
            className={`support${supportOpen ? ' is-open' : ''}`}
            onMouseEnter={handleSupportMouseEnter}
            onMouseLeave={handleSupportMouseLeave}
            onBlur={handleSupportBlur}
          >
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
                className="support-chevron"
                style={{
                  transform: supportOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </button>

            <div
              className={`support-collapse-wrapper ${supportOpen ? 'is-expanded' : ''}`}
              aria-hidden={!supportOpen}
            >
              <div className="support-collapse-inner">
                <div className="box-disclosure-content" data-state={supportOpen ? 'open' : 'closed'}>
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
              </div>
            </div>
          </div>

          {/* Accordion 2: Direct Contact ("Dringende Hilfe") */}
          <div
            ref={directCardRef}
            className={`support direct-contact${directOpen ? ' is-open' : ''}`}
            onMouseEnter={handleDirectMouseEnter}
            onMouseLeave={handleDirectMouseLeave}
          >
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
                className="support-chevron"
                style={{
                  transform: directOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </button>

            <div
              className={`support-collapse-wrapper ${directOpen ? 'is-expanded' : ''}`}
              aria-hidden={!directOpen}
            >
              <div className="support-collapse-inner">
                <div className="box-disclosure-content" data-state={directOpen ? 'open' : 'closed'}>
                  <div className="direct-contact-body">
                    <div className="contact-person">
                      <div className="brand-avatar-frame">
                        <img
                          src={profileAvatar}
                          alt={profileName}
                          width="60"
                          height="60"
                          className="rounded-full object-cover"
                          onError={(e) => {
                            const fallback = getAssetUrl('profilbild.png');
                            if (e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                        />
                      </div>
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
              </div>
            </div>
          </div>

          {/* Accordion 3: Feedback ("Feedback & Wünsche") */}
          <div
            ref={feedbackCardRef}
            className={`support feedback-panel${feedbackOpen ? ' is-open' : ''}`}
            onMouseEnter={handleFeedbackMouseEnter}
            onMouseLeave={handleFeedbackMouseLeave}
            onBlur={handleFeedbackBlur}
          >
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
                className="support-chevron"
                style={{
                  transform: feedbackOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </button>

            <div
              className={`support-collapse-wrapper ${feedbackOpen ? 'is-expanded' : ''}`}
              aria-hidden={!feedbackOpen}
            >
              <div className="support-collapse-inner">
                <div className="box-disclosure-content" data-state={feedbackOpen ? 'open' : 'closed'}>
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
              </div>
            </div>
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
