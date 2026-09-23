import React, { useState, useEffect } from 'react';
import {
  SlidersHorizontal,
  X,
  Type,
  Contrast,
  Palette,
  RotateCcw,
  Check,
  CheckCircle2
} from 'lucide-react';
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

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const fontOptions = [
    { id: 'standard', label: 'Standard', sample: 'Aa', desc: '100% Textgröße' },
    { id: 'large', label: 'Größer', sample: 'Aa', desc: '110% angenehm lesbar' },
    { id: 'larger', label: 'Sehr groß', sample: 'Aa', desc: '125% maximale Lesbarkeit' }
  ] as const;

  const bgOptions = [
    { id: 'brand', label: 'Original', hex: '#243e52', desc: 'Klassisches Box-Design' },
    { id: 'blue', label: 'Blau', hex: '#1d4875', desc: 'Ruhiger blauer Hintergrund' },
    { id: 'calm', label: 'Ruhig', hex: '#2c3e38', desc: 'Sanfter Schieferton' }
  ] as const;

  return (
    <>
      <button
        data-slot="popover-trigger"
        type="button"
        className="appearance-trigger inline-flex items-center gap-2 rounded-xl text-sm font-semibold px-3.5 py-2.5 transition-all shadow-2xs cursor-pointer hover:border-blue-400 hover:text-[#235cbb]"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <SlidersHorizontal className="w-4 h-4 text-[#235cbb]" aria-hidden="true" />
        <span>Ansicht anpassen</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-labelledby="appearance-dialog-title"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white text-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 p-5 sm:p-6 pb-4 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#235cbb] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="appearance-dialog-title"
                    className="text-lg sm:text-xl font-bold font-display text-slate-800 tracking-tight m-0"
                  >
                    Ansicht anpassen
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 mb-0">
                    Schriftgröße, Kontrast und Hintergrund nach Wunsch einstellen.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0"
                aria-label="Einstellungen schließen"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
              {/* 1. Schriftgröße */}
              <section aria-labelledby="heading-font-size">
                <div className="flex items-center gap-2 mb-2.5">
                  <Type className="w-4 h-4 text-[#235cbb]" aria-hidden="true" />
                  <h3 id="heading-font-size" className="text-sm font-bold text-slate-800 m-0">
                    Schriftgröße
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5" role="radiogroup" aria-label="Schriftgröße wählen">
                  {fontOptions.map(opt => {
                    const isSelected = settings.font === opt.id;
                    const sampleSizeClass =
                      opt.id === 'standard' ? 'text-base' : opt.id === 'large' ? 'text-xl' : 'text-2xl';
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => update({ ...settings, font: opt.id })}
                        className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-blue-50/80 border-[#235cbb] text-[#164781] ring-2 ring-blue-500/15 shadow-2xs font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#235cbb] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                        <span className={`font-bold my-1 ${sampleSizeClass} text-[#235cbb]`}>
                          {opt.sample}
                        </span>
                        <span className="text-xs sm:text-sm font-bold tracking-tight">
                          {opt.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-tight">
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* 2. Stärkerer Kontrast */}
              <section aria-labelledby="heading-contrast" className="pt-2 border-t border-slate-100">
                <div
                  className="flex items-center justify-between gap-4 p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => update({ ...settings, contrast: !settings.contrast })}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Contrast className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 id="heading-contrast" className="text-sm font-bold text-slate-800 m-0">
                        Stärkerer Kontrast
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 mb-0">
                        Dunklere Schrift und kräftigere Rahmenlinien für besonders klare Abgrenzung.
                      </p>
                    </div>
                  </div>

                  {/* Accessible iOS-style toggle */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={settings.contrast}
                    aria-labelledby="heading-contrast"
                    onClick={e => {
                      e.stopPropagation();
                      update({ ...settings, contrast: !settings.contrast });
                    }}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#235cbb]/30 ${
                      settings.contrast ? 'bg-[#235cbb]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        settings.contrast ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </section>

              {/* 3. Hintergrund */}
              <section aria-labelledby="heading-background" className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2.5">
                  <Palette className="w-4 h-4 text-[#235cbb]" aria-hidden="true" />
                  <h3 id="heading-background" className="text-sm font-bold text-slate-800 m-0">
                    Hintergrund-Stil
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5" role="radiogroup" aria-label="Hintergrund wählen">
                  {bgOptions.map(bg => {
                    const isSelected = settings.background === bg.id;
                    return (
                      <button
                        key={bg.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => update({ ...settings, background: bg.id })}
                        className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-blue-50/80 border-[#235cbb] text-[#164781] ring-2 ring-blue-500/15 shadow-2xs font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#235cbb] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                        <span
                          className="w-7 h-7 rounded-full border-2 border-white shadow-xs my-1 block"
                          style={{ backgroundColor: bg.hex }}
                          aria-hidden="true"
                        />
                        <span className="text-xs sm:text-sm font-bold tracking-tight">
                          {bg.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-tight">
                          {bg.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80">
              <button
                type="button"
                onClick={() => update(DEFAULT_APPEARANCE)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer w-full sm:w-auto justify-center"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Auf Standard zurücksetzen</span>
              </button>

              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                <span>
                  {persisted ? 'Wird auf diesem Gerät gespeichert' : 'Gilt für die aktuelle Sitzung'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
