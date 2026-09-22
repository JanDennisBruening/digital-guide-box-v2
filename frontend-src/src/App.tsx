import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Newspaper,
  MessageSquareText,
  LogOut,
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff,
  House,
  FileText,
  Phone,
  Mail,
  Globe,
  Sparkles,
  Compass
} from 'lucide-react';
import { ALL_GUIDES } from './data/guides';
import { ALL_NEWS } from './data/news';
import { SelectionState, Guide, NewsItem, ActiveTab } from './types';
import { Brand } from './components/Brand';
import { Preloader } from './components/Preloader';
import { AppearanceModal, initializeAppearance } from './components/AppearanceModal';
import { SearchDialog } from './components/SearchDialog';
import { GuidesSection } from './components/GuidesSection';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { ReadingDialog } from './components/ReadingDialog';
import { GeminiAssistantSection } from './components/GeminiAssistantSection';
import { getAssetUrl } from './utils/assets';

const SESSION_KEY = 'digital-guide-box-v2:authorized:v1';
const EXPIRY_KEY = 'digital-guide-box-v2:auth_expires:v1';

export function App() {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const gateSettings = config?.settings?.gate || {};
  const profileSettings = config?.settings?.profile || {};
  const accessSettings = config?.settings?.access || {};
  const customNews = config?.settings?.custom_news || [];

  // Guides: use WordPress-managed guides if available, otherwise built-in ALL_GUIDES
  const guidesData: Guide[] = useMemo(() => {
    if (config?.guides && Array.isArray(config.guides) && config.guides.length > 0) {
      return config.guides;
    }
    return ALL_GUIDES;
  }, [config]);

  // News: use WordPress-managed news if available, otherwise merged custom + built-in ALL_NEWS
  const newsData: NewsItem[] = useMemo(() => {
    if (config?.news && Array.isArray(config.news) && config.news.length > 0) {
      return config.news;
    }
    if (customNews && Array.isArray(customNews) && customNews.length > 0) {
      return [...customNews, ...ALL_NEWS];
    }
    return ALL_NEWS;
  }, [config, customNews]);

  // Authorization state: check localStorage session
  const [authorized, setAuthorized] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      const expires = localStorage.getItem(EXPIRY_KEY);
      if (stored === 'true') {
        if (!expires || Date.now() < Number(expires)) {
          return true;
        }
      }
    } catch {
      // fallback
    }
    return false;
  });

  const [preloaderActive, setPreloaderActive] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('news');
  const [assistantPrompt, setAssistantPrompt] = useState<string | null>(null);
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [supportFocus, setSupportFocus] = useState(false);
  const [isOrientationFocused, setIsOrientationFocused] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  // Gate form state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gateError, setGateError] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize appearance on mount
  useEffect(() => {
    initializeAppearance();
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError('');

    const inputPw = password.trim();
    if (!inputPw) {
      setGateError('Bitte gib dein Passwort ein.');
      return;
    }

    setPreloaderActive(true);

    let isValid = false;
    let serverDuration = accessSettings.session_duration || 28800;

    if (config?.verifyUrl) {
      try {
        const res = await fetch(config.verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: inputPw })
        });
        const data = await res.json();
        if (data.success) {
          isValid = true;
          if (data.expires_in) {
            serverDuration = data.expires_in;
          }
        } else {
          setGateError(data.message || 'Das eingegebene Passwort ist nicht korrekt.');
        }
      } catch {
        const expectedPw = config?.password || 'digitalguidejan';
        if (inputPw === expectedPw) {
          isValid = true;
        } else {
          setGateError('Das eingegebene Passwort ist nicht korrekt.');
        }
      }
    } else {
      const expectedPw = config?.password || 'digitalguidejan';
      if (inputPw === expectedPw) {
        isValid = true;
      } else {
        setGateError('Das eingegebene Passwort ist nicht korrekt.');
      }
    }

    if (isValid) {
      const expiryTimestamp = Date.now() + serverDuration * 1000;
      try {
        localStorage.setItem(SESSION_KEY, 'true');
        localStorage.setItem(EXPIRY_KEY, String(expiryTimestamp));
      } catch {
        // ignore
      }
      setTimeout(() => {
        setAuthorized(true);
        setPreloaderActive(false);
      }, 600);
    } else {
      setPreloaderActive(false);
    }
  };

  const handleLock = () => {
    setAuthorized(false);
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(EXPIRY_KEY);
    } catch {
      // ignore
    }
    if (config?.lockUrl) {
      fetch(config.lockUrl, { method: 'POST' }).catch(() => {});
    }
    setActiveTab('news');
    setSelection(null);
  };

  const handleOpenGuide = (guide: Guide) => {
    setSelection({ kind: 'guide', item: guide });
  };

  const handleOpenNews = (news: NewsItem) => {
    setSelection({ kind: 'news', item: news });
  };

  const handleSelectFromSearch = (sel: SelectionState) => {
    setSelection(sel);
  };

  return (
    <>
      <Preloader active={preloaderActive} />

      {!authorized ? (
        /* Gate Screen (Authentic Login / Welcome Gate) */
        <main className="gate-shell">
          <section className="box gate-box">
            <Brand />

            <div className="gate-appearance">
              <AppearanceModal />
            </div>

            <p className="gate-principle">{gateSettings.principle || 'Nachlesen · Verstehen · Anwenden'}</p>
            <h1>{gateSettings.title || 'Schön, dass du da bist.'}</h1>
            <p>{gateSettings.subtitle || 'Deine Anleitungen und Neuigkeiten für einen entspannten digitalen Alltag.'}</p>

            <form onSubmit={handleUnlock}>
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label
                  htmlFor="password"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    marginBottom: '0.375rem',
                    color: '#405371'
                  }}
                >
                  Dein Passwort
                </label>
                <div className="password-wrap">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Passwort eingeben"
                    disabled={preloaderActive}
                    style={{
                      width: '100%',
                      padding: '0.625rem 2.875rem 0.625rem 0.875rem',
                      borderRadius: '0.625rem',
                      border: '1px solid #8fa6c5',
                      background: '#f7f9fd',
                      fontSize: '1rem'
                    }}
                  />
                  <button
                    type="button"
                    disabled={preloaderActive}
                    onClick={() => setShowPassword(s => !s)}
                    aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                    aria-pressed={showPassword}
                    style={{
                      position: 'absolute',
                      right: '0.5rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.375rem',
                      color: '#526a8a'
                    }}
                  >
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </div>
              </div>

              {gateError && (
                <p className="error" id="gate-error" role="alert">
                  {gateError}
                </p>
              )}

              <button
                type="submit"
                className="primary-button"
                disabled={preloaderActive}
                style={{ width: '100%' }}
              >
                <LockKeyhole aria-hidden="true" />
                <span>{preloaderActive ? 'Box wird geöffnet …' : 'Box öffnen'}</span>
                {!preloaderActive && <ArrowRight aria-hidden="true" />}
              </button>
            </form>

            <p
              className="form-note"
              style={{ marginBottom: 0, marginTop: '1.25rem', textAlign: 'center' }}
            >
              {gateSettings.note || 'Dein Zugang bleibt für acht Stunden geöffnet.'}
            </p>

            <footer className="gate-footer">
              <nav className="footer-links" aria-label="Weitere Informationen">
                <a
                  href={gateSettings.home_url || 'https://www.janbruening.de'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <House aria-hidden="true" />
                  <span>Zurück zur Startseite</span>
                </a>
                <a
                  href={gateSettings.imprint_url || 'https://www.janbruening.de/impressum'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText aria-hidden="true" />
                  <span>Impressum</span>
                </a>
              </nav>
            </footer>
          </section>
        </main>
      ) : (
        /* Authorized Main Shell */
        <>
          <div className="box-focus-shade" aria-hidden="true" />
          <a className="skip" href="#box-content">
            Zum Inhalt
          </a>

          <main className="shell">
            <div className="box">
              {/* Header */}
              <header
                className={`box-header transition-all duration-300 ${
                  isOrientationFocused ? 'filter blur-[2px] opacity-60 pointer-events-none' : ''
                }`}
              >
                <Brand />

                <SearchDialog
                  guides={guidesData}
                  news={newsData}
                  onSelect={handleSelectFromSearch}
                  inputRef={searchInputRef}
                />

                <div className="box-header-actions">
                  <AppearanceModal />
                  <button
                    type="button"
                    className="quiet-button"
                    onClick={handleLock}
                    aria-label="Box schließen und abmelden"
                  >
                    <LogOut aria-hidden="true" />
                    <span>Box schließen</span>
                  </button>
                </div>
              </header>

              <h1 className="sr-only">Deine Digital Guide Box</h1>

              {/* Orientation Navigation */}
              <nav
                className={`box-orientation relative z-20 transition-all duration-300 rounded-2xl mx-3 sm:mx-6 my-2 sm:my-3.5 p-3.5 sm:p-5 transform-none ${
                  isOrientationFocused && !hasNavigated
                    ? 'bg-gradient-to-r from-blue-50/95 via-white to-indigo-50/90 shadow-lg border border-blue-300/80 ring-2 ring-blue-400/20'
                    : 'bg-slate-50/95 hover:bg-slate-50/100 border border-slate-200/90 shadow-2xs'
                }`}
                aria-labelledby="box-orientation-title"
                onMouseEnter={() => {
                  if (!hasNavigated) setIsOrientationFocused(true);
                }}
                onMouseLeave={() => {
                  setIsOrientationFocused(false);
                  setHasNavigated(false);
                }}
                onFocus={() => {
                  if (!hasNavigated) setIsOrientationFocused(true);
                }}
                onBlur={() => {
                  setIsOrientationFocused(false);
                  setHasNavigated(false);
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-blue-100 text-[#235cbb] flex items-center justify-center">
                      <Compass className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <h2
                      id="box-orientation-title"
                      className="text-sm sm:text-base font-bold text-slate-800 tracking-tight m-0 font-display"
                    >
                      Was möchtest du heute tun?
                    </h2>
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    Schnellzugriff & Inspiration
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left bg-white text-slate-800 border border-slate-200/90 shadow-2xs hover:border-blue-400 hover:bg-blue-50/40 hover:text-[#235cbb] active:scale-[0.98] transition-all cursor-pointer group"
                    onClick={() => {
                      setIsOrientationFocused(false);
                      setHasNavigated(true);
                      setActiveTab('guides');
                      document.getElementById('box-content')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#235cbb] flex items-center justify-center flex-shrink-0 group-hover:bg-[#235cbb] group-hover:text-white transition-colors">
                      <BookOpen className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#235cbb] truncate">
                        Anleitungen
                      </span>
                      <span className="block text-[10.5px] text-slate-500 truncate">
                        Schritt für Schritt lernen
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left bg-white text-slate-800 border border-slate-200/90 shadow-2xs hover:border-blue-400 hover:bg-blue-50/40 hover:text-[#235cbb] active:scale-[0.98] transition-all cursor-pointer group"
                    onClick={() => {
                      setIsOrientationFocused(false);
                      setHasNavigated(true);
                      setActiveTab('news');
                      document.getElementById('box-content')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Newspaper className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-700 truncate">
                        Neuigkeiten
                      </span>
                      <span className="block text-[10.5px] text-slate-500 truncate">
                        Aktuelle Tipps & Warnungen
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left bg-white text-slate-800 border border-slate-200/90 shadow-2xs hover:border-emerald-400 hover:bg-emerald-50/40 hover:text-emerald-800 active:scale-[0.98] transition-all cursor-pointer group"
                    onClick={() => {
                      setIsOrientationFocused(false);
                      setHasNavigated(true);
                      setActiveTab('assistant');
                      document.getElementById('box-content')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700 truncate">
                        KI-Assistent
                      </span>
                      <span className="block text-[10.5px] text-slate-500 truncate">
                        Fragen geduldig beantwortet
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left bg-white text-slate-800 border border-slate-200/90 shadow-2xs hover:border-amber-400 hover:bg-amber-50/40 hover:text-amber-800 active:scale-[0.98] transition-all cursor-pointer group"
                    onClick={() => {
                      setIsOrientationFocused(false);
                      setHasNavigated(true);
                      setSupportFocus(true);
                      document.getElementById('contact-title')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <MessageSquareText className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs sm:text-sm font-bold text-slate-800 group-hover:text-amber-800 truncate">
                        Du kommst nicht weiter?
                      </span>
                      <span className="block text-[10.5px] text-slate-500 truncate">
                        Persönlicher Kontakt zu Jan
                      </span>
                    </div>
                  </button>
                </div>
              </nav>

              {/* Workspace with Left Tabs & Right Sidebar */}
              <div
                className={`box-workspace transition-all duration-300 ${
                  isOrientationFocused && !hasNavigated ? 'filter blur-[1px] opacity-75' : ''
                }`}
              >
                <div
                  className="box-tabs"
                  data-active-tab={activeTab}
                  id="box-content"
                  tabIndex={-1}
                >
                  <div
                    className="box-tab-list"
                    role="tablist"
                    aria-label="Inhalte der Digital Guide Box"
                  >
                    <button
                      type="button"
                      role="tab"
                      className="box-tab"
                      data-state={activeTab === 'news' ? 'active' : 'inactive'}
                      aria-selected={activeTab === 'news'}
                      onClick={() => setActiveTab('news')}
                    >
                      <span className="box-tab-label">
                        <Newspaper aria-hidden="true" />
                        <span>Neuigkeiten</span>
                      </span>
                      <span className="guide-count text-slate-700 bg-white/80 font-medium">{newsData.length} Beiträge</span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      className="box-tab"
                      data-state={activeTab === 'assistant' ? 'active' : 'inactive'}
                      aria-selected={activeTab === 'assistant'}
                      onClick={() => setActiveTab('assistant')}
                    >
                      <span className="box-tab-label">
                        <Sparkles aria-hidden="true" className="text-emerald-600" />
                        <span>KI-Assistent</span>
                      </span>
                      <span className="guide-count text-emerald-800 bg-emerald-100/90 font-medium">Gemini 3</span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      className="box-tab"
                      data-state={activeTab === 'guides' ? 'active' : 'inactive'}
                      aria-selected={activeTab === 'guides'}
                      onClick={() => setActiveTab('guides')}
                    >
                      <span className="box-tab-label">
                        <BookOpen aria-hidden="true" />
                        <span>Anleitungen</span>
                      </span>
                      <span className="guide-count">{guidesData.length} verfügbar</span>
                    </button>
                  </div>

                  {/* News Panel */}
                  <div
                    className="box-tab-panel panel-news"
                    data-state={activeTab === 'news' ? 'active' : 'inactive'}
                    hidden={activeTab !== 'news'}
                    role="tabpanel"
                  >
                    <div className="tab-panel-inner news-panel-content">
                      <header className="tab-panel-heading">
                        <p>Aktuelle Hinweise und Neues aus deiner Box.</p>
                      </header>
                      <NewsSection news={newsData} onOpenNews={handleOpenNews} />
                    </div>
                  </div>

                  {/* Gemini AI Assistant Panel */}
                  <div
                    className="box-tab-panel panel-assistant"
                    data-state={activeTab === 'assistant' ? 'active' : 'inactive'}
                    hidden={activeTab !== 'assistant'}
                    role="tabpanel"
                  >
                    <div className="tab-panel-inner assistant-panel-content">
                      <GeminiAssistantSection
                        initialPrompt={assistantPrompt}
                        onClearInitialPrompt={() => setAssistantPrompt(null)}
                        onNavigateToContact={() => {
                          setSupportFocus(true);
                          document.getElementById('contact-title')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      />
                    </div>
                  </div>

                  {/* Guides Panel */}
                  <div
                    className="box-tab-panel panel-guides"
                    data-state={activeTab === 'guides' ? 'active' : 'inactive'}
                    hidden={activeTab !== 'guides'}
                    role="tabpanel"
                  >
                    <div className="tab-panel-inner guides-panel-content">
                      <header className="tab-panel-heading">
                        <p>Einfache Anleitungen zum Nachlesen und Ausprobieren.</p>
                      </header>
                      <GuidesSection
                        guides={guidesData}
                        onOpenGuide={handleOpenGuide}
                      />
                    </div>
                  </div>
                </div>

                {/* Persistent Right Sidebar (Contact, Emergency, Feedback, WhatsApp Channel) */}
                <ContactSection
                  openSupport={supportFocus}
                  onSupportHandled={() => setSupportFocus(false)}
                  onOpenAssistant={() => {
                    setActiveTab('assistant');
                    document.getElementById('box-content')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>
            </div>

            {/* Outer Footer (outside the white box, styled for dark background) */}
            <footer
              className={`outer-footer transition-all duration-300 ${
                isOrientationFocused ? 'filter blur-[2px] opacity-60 pointer-events-none' : ''
              }`}
            >
              <p>{profileSettings.name || 'Jan Dennis Brüning'} · Persönliche Begleitung im digitalen Alltag</p>
              <nav className="footer-links" aria-label="Weitere Informationen">
                <a
                  href={gateSettings.home_url || 'https://www.janbruening.de'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <House aria-hidden="true" />
                  <span>Zurück zur Startseite</span>
                </a>
                <a
                  href={gateSettings.imprint_url || 'https://www.janbruening.de/impressum'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText aria-hidden="true" />
                  <span>Impressum</span>
                </a>
              </nav>
            </footer>
          </main>

          {/* Print-only Contact Card */}
          <section className="contact-print" aria-label="Kontaktkarte zum Ausdrucken">
            <div className="contact-print-heading">
              <img src={profileSettings.avatar_url || getAssetUrl('profilbild.png')} alt="" width="56" height="56" style={{ borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h2>Kontaktkarte</h2>
                <p>von {profileSettings.name || 'Jan Dennis Brüning'}</p>
              </div>
            </div>
            <p className="contact-print-intro">Dein Kontakt für digitale Fragen</p>
            <p>
              <Phone aria-hidden="true" />
              <span>{profileSettings.phone || '+49 1520 2553087'}</span>
            </p>
            <p>
              <Mail aria-hidden="true" />
              <span>{profileSettings.email || 'office@janbruening.de'}</span>
            </p>
            <p>
              <Globe aria-hidden="true" />
              <span>{(config?.siteUrl || 'https://www.janbruening.de').replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
            </p>
          </section>

          {/* Reading Dialog for Guides and News */}
          <ReadingDialog
            selection={selection}
            onClose={() => setSelection(null)}
            allGuides={guidesData}
            allNews={newsData}
            onSelectRelated={setSelection}
            onAskAssistant={(prompt) => {
              setAssistantPrompt(prompt);
              setActiveTab('assistant');
              document.getElementById('box-content')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </>
      )}
    </>
  );
}

export default App;
