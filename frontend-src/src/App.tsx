import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  Newspaper,
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
  Sparkles
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (supportFocus) {
      setIsSidebarCollapsed(false);
    }
  }, [supportFocus]);

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
        <main className="gate-shell min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
          <section className="gate-box w-full max-w-[480px] bg-white/90 backdrop-blur-[20px] border border-[rgba(1,75,111,0.12)] rounded-3xl shadow-[0_25px_60px_-15px_rgba(1,75,111,0.1),0_0_0_1px_rgba(253,244,228,0.6)] p-6 sm:p-9 flex flex-col items-center text-center">
            {/* Header: Avatar with signature gradient border + Name & Subtitle */}
            <div className="flex flex-col items-center mb-6">
              <div className="brand-avatar-frame mb-3">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                  src={profileSettings?.avatar_url || getAssetUrl('profilbild.png')}
                  alt={profileSettings?.name || 'Jan Dennis Brüning'}
                  width="80"
                  height="80"
                  onError={(e) => {
                    const fallback = getAssetUrl('profilbild.png');
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#01060C] tracking-tight m-0">
                {profileSettings?.name || 'Jan Dennis Brüning'}
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#014B6F] mt-1 m-0 font-body">
                {gateSettings.principle || profileSettings?.subtitle || 'Designer, Creator & Digital-Guide'}
              </p>
            </div>

            {/* Welcome text */}
            <div className="w-full bg-[rgba(253,244,228,0.45)] rounded-2xl p-4 sm:p-5 border border-[rgba(1,75,111,0.12)] mb-6 text-left">
              <h2 className="text-lg sm:text-xl font-bold font-heading text-[#01060C] m-0 mb-1.5">
                {gateSettings.title || 'Schön, dass du da bist.'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed m-0 font-body">
                {gateSettings.subtitle || 'Deine Anleitungen und Neuigkeiten für einen entspannten digitalen Alltag.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleUnlock} className="w-full text-left">
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5 font-body"
                >
                  Dein Passwort
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Passwort eingeben"
                    disabled={preloaderActive}
                    className="w-full px-4 py-3 pr-12 text-base leading-normal rounded-xl border border-[rgba(1,75,111,0.18)] bg-white/95 text-[#01060C] placeholder:text-slate-400 focus:outline-none focus:border-[#0B9EBC] focus:ring-4 focus:ring-[#0B9EBC]/15 transition-all shadow-2xs font-body"
                  />
                  <button
                    type="button"
                    disabled={preloaderActive}
                    onClick={() => setShowPassword(s => !s)}
                    aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
                    aria-pressed={showPassword}
                    className="absolute right-2.5 p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
                  </button>
                </div>
              </div>

              {gateError && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium font-body" id="gate-error" role="alert">
                  {gateError}
                </div>
              )}

              <button
                type="submit"
                disabled={preloaderActive}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#014B6F] to-[#0B9EBC] hover:brightness-105 active:scale-[0.99] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 text-base cursor-pointer disabled:opacity-50 font-body"
              >
                <LockKeyhole className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span>{preloaderActive ? 'Box wird geöffnet …' : 'Box öffnen'}</span>
                {!preloaderActive && <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
              </button>
            </form>

            <p className="gate-note text-xs text-slate-400 text-center mt-7 sm:mt-8 mb-0">
              {gateSettings.note || 'Dein Zugang bleibt für acht Stunden geöffnet.'}
            </p>
          </section>

          {/* Footer below the box */}
          <footer className="mt-6 text-center">
            <nav className="flex items-center justify-center gap-4 text-xs text-slate-500" aria-label="Weitere Informationen">
              <span>© {new Date().getFullYear()} {profileSettings?.name || 'Jan Dennis Brüning'}</span>
              <span>·</span>
              <a
                href={gateSettings.home_url || 'https://www.janbruening.de'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-800 transition-colors underline underline-offset-2"
              >
                Zurück zur Startseite
              </a>
              <span>·</span>
              <a
                href={gateSettings.imprint_url || 'https://www.janbruening.de/impressum'}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-800 transition-colors underline underline-offset-2"
              >
                Impressum
              </a>
            </nav>
          </footer>
        </main>
      ) : (
        /* Authorized Main Shell */
        <>
          <a className="skip" href="#box-content">
            Zum Inhalt
          </a>

          <main className="shell">
            <div className="box">
              {/* Header */}
              <header className="box-header">
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

              <h1 className="sr-only">Deine Digital-Guide-Box</h1>

              {/* Workspace with Left Tabs & Right Sidebar */}
              <div className={`box-workspace ${isSidebarCollapsed ? 'sidebar-is-collapsed' : 'sidebar-is-open'}`}>
                <div
                  className="box-tabs"
                  data-active-tab={activeTab}
                  id="box-content"
                  tabIndex={-1}
                >
                  <div
                    className="box-tab-list"
                    role="tablist"
                    aria-label="Inhalte der Digital-Guide-Box"
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
                        <span className="tab-icon-badge tab-icon-badge-news" aria-hidden="true">
                          <Newspaper className="w-5 h-5" />
                        </span>
                        <span>Neuigkeiten</span>
                      </span>
                      <span className="guide-count text-blue-800 bg-blue-100/90 font-medium inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                        <span>Aktuell</span>
                      </span>
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
                        <span className="tab-icon-badge tab-icon-badge-assistant" aria-hidden="true">
                          <Sparkles className="w-5 h-5" />
                        </span>
                        <span>KI-Assistent</span>
                      </span>
                      <span className="guide-count text-emerald-800 bg-emerald-100/90 font-medium inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
                        <span>Live-Hilfe</span>
                      </span>
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
                        <span className="tab-icon-badge tab-icon-badge-guides" aria-hidden="true">
                          <BookOpen className="w-5 h-5" />
                        </span>
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
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
                />
              </div>
            </div>

            {/* Outer Footer (outside the white box, styled for dark background) */}
            <footer className="outer-footer">
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
              <img
                src={profileSettings.avatar_url || getAssetUrl('profilbild.png')}
                alt=""
                width="56"
                height="56"
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                onError={(e) => {
                  const fallback = getAssetUrl('profilbild.png');
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
              />
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
