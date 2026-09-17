import { getAssetUrl } from './utils/assets';
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
  FileText
} from 'lucide-react';
import { ALL_GUIDES } from './data/guides';
import { ALL_NEWS } from './data/news';
import { SelectionState, Guide, NewsItem } from './types';
import { Brand } from './components/Brand';
import { Preloader } from './components/Preloader';
import { AppearanceModal, initializeAppearance } from './components/AppearanceModal';
import { SearchDialog } from './components/SearchDialog';
import { GuidesSection } from './components/GuidesSection';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { ReadingDialog } from './components/ReadingDialog';

const SESSION_KEY = 'digital-guide-box-v2:authorized:v1';
const EXPIRY_KEY = 'digital-guide-box-v2:auth_expires:v1';

export function App() {
  const config = typeof window !== 'undefined' ? (window as any).DGB_CONFIG : null;
  const gateSettings = config?.settings?.gate || {};
  const profileSettings = config?.settings?.profile || {};
  const accessSettings = config?.settings?.access || {};
  const customNews = config?.settings?.custom_news || [];

  // Merge custom news from WordPress backend with built-in news
  const mergedNews: NewsItem[] = useMemo(() => {
    if (customNews && Array.isArray(customNews) && customNews.length > 0) {
      return [...customNews, ...ALL_NEWS];
    }
    return ALL_NEWS;
  }, [customNews]);

  // Authorization state: default to false unless valid session exists
  const [authorized, setAuthorized] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      const expires = localStorage.getItem(EXPIRY_KEY);
      if (stored === 'true' && expires) {
        if (Date.now() < Number(expires)) {
          return true;
        }
      }
    } catch {
      // fallback
    }
    return false;
  });

  const [preloaderActive, setPreloaderActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'news' | 'guides'>('news');
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [supportFocus, setSupportFocus] = useState(false);

  // Gate form state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gateError, setGateError] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const supportToggleRef = useRef<HTMLButtonElement>(null);

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
        if (data && data.success) {
          isValid = true;
          if (data.expiresIn) {
            serverDuration = data.expiresIn;
          }
        }
      } catch (err) {
        console.warn('Network auth error, falling back to local check', err);
        const expected = config?.password || accessSettings.password || 'digitalguidejan';
        isValid = inputPw === expected;
      }
    } else {
      const expected = config?.password || accessSettings.password || 'digitalguidejan';
      isValid = inputPw === expected;
    }

    if (isValid) {
      const durationMs = serverDuration * 1000;
      const expiry = Date.now() + durationMs;
      setTimeout(() => {
        setAuthorized(true);
        try {
          localStorage.setItem(SESSION_KEY, 'true');
          localStorage.setItem(EXPIRY_KEY, expiry.toString());
          document.cookie = `dgbc_authorized=1; max-age=${serverDuration}; path=/; SameSite=Lax`;
        } catch {
          // ignore
        }
        setPreloaderActive(false);
      }, 700);
    } else {
      setTimeout(() => {
        setPreloaderActive(false);
        setGateError('Das Passwort ist leider nicht korrekt. Bitte prüfe deine Eingabe.');
      }, 350);
    }
  };

  const handleLock = () => {
    setAuthorized(false);
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(EXPIRY_KEY);
      document.cookie = `dgbc_authorized=; max-age=0; path=/; SameSite=Lax`;
    } catch {
      // ignore
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

  const homeLink = gateSettings.home_url || 'https://www.janbruening.de';
  const imprintLink = gateSettings.imprint_url || 'https://www.janbruening.de/impressum';
  const advisorName = profileSettings.name || 'Jan Dennis Brüning';

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

            <p className="gate-principle">
              {gateSettings.principle || 'Nachlesen · Verstehen · Anwenden'}
            </p>
            <h1>{gateSettings.title || 'Schön, dass du da bist.'}</h1>
            <p>
              {gateSettings.subtitle ||
                'Deine Anleitungen und Neuigkeiten für einen entspannten digitalen Alltag.'}
            </p>

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
                <a href={homeLink} target="_blank" rel="noopener noreferrer">
                  <House aria-hidden="true" />
                  <span>Zurück zur Startseite</span>
                </a>
                <a href={imprintLink} target="_blank" rel="noopener noreferrer">
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
              <header className="box-header">
                <Brand />

                <SearchDialog
                  guides={ALL_GUIDES}
                  news={mergedNews}
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
              <nav className="box-orientation" aria-labelledby="box-orientation-title">
                <h2 id="box-orientation-title">Was möchtest du heute tun?</h2>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('guides');
                      document.getElementById('box-content')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <BookOpen aria-hidden="true" />
                    <span>Etwas nachschlagen</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('news');
                      document.getElementById('box-content')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Newspaper aria-hidden="true" />
                    <span>Neues entdecken</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSupportFocus(true);
                      document.getElementById('contact-title')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <MessageSquareText aria-hidden="true" />
                    <span>Ich komme gerade nicht weiter</span>
                  </button>
                </div>
              </nav>

              {/* Workspace with Left Tabs & Right Sidebar */}
              <div className="box-workspace">
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
                      <span className="guide-count">{ALL_GUIDES.length} verfügbar</span>
                    </button>
                  </div>

                  {/* News Panel */}
                  <div
                    className="box-tab-panel panel-news"
                    hidden={activeTab !== 'news'}
                    role="tabpanel"
                  >
                    <div className="tab-panel-inner news-panel-content">
                      <header className="tab-panel-heading">
                        <p>Aktuelle Hinweise und Neues aus deiner Box.</p>
                      </header>
                      <NewsSection news={mergedNews} onOpenNews={handleOpenNews} />
                    </div>
                  </div>

                  {/* Guides Panel */}
                  <div
                    className="box-tab-panel panel-guides"
                    hidden={activeTab !== 'guides'}
                    role="tabpanel"
                  >
                    <div className="tab-panel-inner guides-panel-content">
                      <header className="tab-panel-heading">
                        <p>Einfache Anleitungen zum Nachlesen und Ausprobieren.</p>
                      </header>
                      <GuidesSection
                        guides={ALL_GUIDES}
                        onOpenGuide={handleOpenGuide}
                      />
                    </div>
                  </div>
                </div>

                {/* Persistent Right Sidebar */}
                <ContactSection
                  openSupport={supportFocus}
                  onSupportHandled={() => setSupportFocus(false)}
                  supportToggleRef={supportToggleRef}
                />
              </div>
            </div>

            {/* Outer Footer */}
            <footer className="outer-footer">
              <p>{advisorName} · Persönliche Begleitung im digitalen Alltag</p>
              <nav className="footer-links" aria-label="Weitere Informationen">
                <a href={homeLink} target="_blank" rel="noopener noreferrer">
                  <House aria-hidden="true" />
                  <span>Zurück zur Startseite</span>
                </a>
                <a href={imprintLink} target="_blank" rel="noopener noreferrer">
                  <FileText aria-hidden="true" />
                  <span>Impressum</span>
                </a>
              </nav>
            </footer>
          </main>

          {/* Reading Dialog */}
          <ReadingDialog
            selection={selection}
            onClose={() => setSelection(null)}
            allGuides={ALL_GUIDES}
            allNews={mergedNews}
            onSelectRelated={item => setSelection(item)}
          />
        </>
      )}
    </>
  );
}

export default App;
