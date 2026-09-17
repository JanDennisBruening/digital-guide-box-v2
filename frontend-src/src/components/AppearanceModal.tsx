import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X, Type, RotateCcw } from 'lucide-react';
import { AppearanceSettings } from '../types';

const STORAGE_KEY = 'digital-guide-box:appearance:v1';

const DEFAULT_APPEARANCE: AppearanceSettings = {
  font: 'standard',
  contrast: false,
  background: 'brand'
};

function applyAppearance(settings: AppearanceSettings) {
  const root = document.documentElement;
  root.dataset.viewFont = settings.font;
  root.dataset.viewContrast = settings.contrast ? 'strong' : 'standard';
  root.dataset.viewBackground = settings.background;
}

export function initializeAppearance(): AppearanceSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const s: AppearanceSettings = {
        font: ['standard', 'large', 'larger'].includes(parsed.font) ? parsed.font : 'standard',
        contrast: Boolean(parsed.contrast),
        background: ['brand', 'blue', 'calm'].includes(parsed.background) ? parsed.background : 'brand'
      };
      applyAppearance(s);
      return s;
    }
  } catch {
    // fallback
  }
  applyAppearance(DEFAULT_APPEARANCE);
  return DEFAULT_APPEARANCE;
}

export const AppearanceModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AppearanceSettings>(DEFAULT_APPEARANCE);
  const [persisted, setPersisted] = useState(true);

  useEffect(() => {
    const initial = initializeAppearance();
    setSettings(initial);
  }, []);

  const update = (newSettings: AppearanceSettings) => {
    setSettings(newSettings);
    applyAppearance(newSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setPersisted(true);
    } catch {
      setPersisted(false);
    }
  };

  return (
    <>
      <button
        data-slot="popover-trigger"
        type="button"
        className="appearance-trigger inline-flex items-center gap-2 rounded-md text-sm font-medium"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
        <span>Ansicht anpassen</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Deine Ansicht"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="appearance-panel"
            onClick={e => e.stopPropagation()}
          >
            <div className="appearance-heading">
              <h2>Deine Ansicht</h2>
              <button
                type="button"
                className="appearance-close"
                aria-label="Ansichtseinstellungen schließen"
                onClick={() => setIsOpen(false)}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <p style={{ margin: '0.5rem 0 1.25rem', fontSize: '0.875rem', color: '#59687e' }}>
              Stell die Box so ein, wie sie für dich angenehm ist.
            </p>

            {/* Font Size */}
            <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.25rem' }}>
              <legend style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Type className="w-4 h-4" aria-hidden="true" />
                Schriftgröße
              </legend>
              <div className="appearance-options" role="radiogroup">
                {(
                  [
                    ['standard', 'Standard'],
                    ['large', 'Größer'],
                    ['larger', 'Noch größer']
                  ] as const
                ).map(([val, label]) => (
                  <label
                    key={val}
                    className={`appearance-option${settings.font === val ? ' is-active' : ''}`}
                    style={{
                      borderColor: settings.font === val ? '#164781' : undefined,
                      background: settings.font === val ? '#eef3fd' : undefined,
                      color: settings.font === val ? '#164781' : undefined,
                      fontWeight: settings.font === val ? 600 : undefined
                    }}
                  >
                    <input
                      type="radio"
                      name="fontSize"
                      value={val}
                      checked={settings.font === val}
                      onChange={() => update({ ...settings, font: val })}
                      className="sr-only"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Contrast */}
            <div className="appearance-contrast">
              <label htmlFor="appearance-contrast" style={{ cursor: 'pointer' }}>
                <strong style={{ display: 'block', fontSize: '0.875rem' }}>Stärkerer Kontrast</strong>
                <small style={{ color: '#59687e', fontSize: '0.75rem' }}>Dunklere Schrift und klarere Rahmen</small>
              </label>
              <input
                type="checkbox"
                id="appearance-contrast"
                checked={settings.contrast}
                onChange={e => update({ ...settings, contrast: e.target.checked })}
                style={{ width: '1.25rem', height: '1.25rem', accentColor: '#164781', cursor: 'pointer' }}
              />
            </div>

            {/* Background Theme */}
            <fieldset style={{ border: 'none', padding: 0, margin: '1.25rem 0' }}>
              <legend style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>Hintergrund</legend>
              <div
                className="appearance-options background-options"
                role="radiogroup"
              >
                {(
                  [
                    ['brand', 'Original', '#243e52'],
                    ['blue', 'Blau', '#1d4875'],
                    ['calm', 'Ruhig', '#2c3e38']
                  ] as const
                ).map(([val, label, bgHex]) => (
                  <label
                    key={val}
                    className={`appearance-option${settings.background === val ? ' is-active' : ''}`}
                    style={{
                      borderColor: settings.background === val ? '#164781' : undefined,
                      background: settings.background === val ? '#eef3fd' : undefined,
                      color: settings.background === val ? '#164781' : undefined,
                      fontWeight: settings.background === val ? 600 : undefined
                    }}
                  >
                    <input
                      type="radio"
                      name="bgTheme"
                      value={val}
                      checked={settings.background === val}
                      onChange={() => update({ ...settings, background: val })}
                      className="sr-only"
                    />
                    <span
                      className={`appearance-swatch swatch-${val}`}
                      style={{ background: bgHex }}
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Reset Button */}
            <button
              type="button"
              className="appearance-reset"
              onClick={() => update(DEFAULT_APPEARANCE)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Zurücksetzen</span>
            </button>

            <p className="appearance-note">
              {persisted
                ? 'Deine Auswahl wird auf diesem Gerät gemerkt.'
                : 'Deine Auswahl gilt, solange diese Seite geöffnet ist.'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

