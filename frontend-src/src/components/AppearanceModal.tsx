import React, { useState, useEffect, useRef } from 'react';
import { SlidersHorizontal, X, Type, RotateCcw, Eye } from 'lucide-react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initial = initializeAppearance();
    setSettings(initial);
  }, []);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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
    <div
      ref={containerRef}
      className="appearance-popover-container"
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        data-slot="popover-trigger"
        type="button"
        className="appearance-trigger"
        onClick={() => setIsOpen(open => !open)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <SlidersHorizontal aria-hidden="true" />
        <span>Ansicht anpassen</span>
      </button>

      {isOpen && (
        <div
          data-slot="popover-content"
          className="appearance-panel"
          role="dialog"
          aria-labelledby="appearance-title"
          aria-describedby="appearance-description"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            background: '#ffffff',
            zIndex: 60
          }}
        >
          <header className="appearance-heading">
            <h2 id="appearance-title">Deine Ansicht</h2>
            <button
              type="button"
              className="appearance-close"
              aria-label="Ansichtseinstellungen schließen"
              onClick={() => setIsOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
          </header>

          <p id="appearance-description">
            Stell die Box so ein, wie sie für dich angenehm ist.
          </p>

          {/* Font Size */}
          <fieldset>
            <legend>
              <Type aria-hidden="true" />
              <span>Schriftgröße</span>
            </legend>
            <div className="appearance-options" role="radiogroup" aria-label="Schriftgröße">
              {(
                [
                  ['standard', 'Standard'],
                  ['large', 'Größer'],
                  ['larger', 'Noch größer']
                ] as const
              ).map(([val, label]) => {
                const isChecked = settings.font === val;
                return (
                  <label
                    key={val}
                    className="appearance-option"
                    onClick={() => update({ ...settings, font: val })}
                  >
                    <button
                      type="button"
                      role="radio"
                      data-slot="radio-group-item"
                      data-state={isChecked ? 'checked' : 'unchecked'}
                      aria-checked={isChecked}
                      className="aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] flex items-center justify-center"
                      style={{
                        borderColor: isChecked ? '#235cbb' : '#94a3b8'
                      }}
                    >
                      {isChecked && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: '#235cbb', display: 'block' }}
                        />
                      )}
                    </button>
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Contrast */}
          <div className="appearance-contrast">
            <label htmlFor="appearance-contrast" style={{ cursor: 'pointer' }}>
              <Eye aria-hidden="true" />
              <span>
                Stärkerer Kontrast
                <small>Dunklere Schrift und klarere Rahmen</small>
              </span>
            </label>
            <button
              type="button"
              role="switch"
              id="appearance-contrast"
              data-slot="switch"
              data-state={settings.contrast ? 'checked' : 'unchecked'}
              aria-checked={settings.contrast}
              onClick={() => update({ ...settings, contrast: !settings.contrast })}
              className="peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all"
              style={{
                cursor: 'pointer',
                backgroundColor: settings.contrast ? '#235cbb' : '#cbd5e1'
              }}
            >
              <span
                data-slot="switch-thumb"
                data-state={settings.contrast ? 'checked' : 'unchecked'}
                className="pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform"
              />
            </button>
          </div>

          {/* Background Theme */}
          <fieldset>
            <legend>Hintergrund</legend>
            <div
              className="appearance-options background-options"
              role="radiogroup"
              aria-label="Hintergrund"
            >
              {(
                [
                  ['brand', 'Original'],
                  ['blue', 'Blau'],
                  ['calm', 'Ruhig']
                ] as const
              ).map(([val, label]) => {
                const isChecked = settings.background === val;
                return (
                  <label
                    key={val}
                    className="appearance-option"
                    onClick={() => update({ ...settings, background: val })}
                  >
                    <button
                      type="button"
                      role="radio"
                      data-slot="radio-group-item"
                      data-state={isChecked ? 'checked' : 'unchecked'}
                      aria-checked={isChecked}
                      className="aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] flex items-center justify-center"
                      style={{
                        borderColor: isChecked ? '#235cbb' : '#94a3b8'
                      }}
                    >
                      {isChecked && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: '#235cbb', display: 'block' }}
                        />
                      )}
                    </button>
                    <span
                      className={`appearance-swatch swatch-${val}`}
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Reset Button */}
          <button
            type="button"
            className="appearance-reset"
            onClick={() => update(DEFAULT_APPEARANCE)}
          >
            <RotateCcw aria-hidden="true" />
            <span>Zurücksetzen</span>
          </button>

          <p className="appearance-note">
            {persisted
              ? 'Deine Auswahl wird auf diesem Gerät gemerkt.'
              : 'Deine Auswahl gilt, solange diese Seite geöffnet ist.'}
          </p>
        </div>
      )}
    </div>
  );
};
