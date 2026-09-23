import React, { useRef, useEffect } from 'react';
import {
  Star,
  Sparkles,
  ArrowDownAZ,
  Clock3,
  SlidersHorizontal,
  X,
  Check,
  RotateCcw,
  Smartphone,
  Laptop,
  Hourglass
} from 'lucide-react';

export type GuideSortOption = 'best-rated' | 'default' | 'alphabetical' | 'time-asc' | 'time-desc';
export type RatingFilterOption = 'all' | '4.8' | '4.5';
export type DurationFilterOption = 'all' | 'short' | 'medium' | 'long';
export type DeviceFilterOption = 'all' | 'mobile' | 'computer';

interface GuideFilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sortOption: GuideSortOption;
  onSelectSort: (sort: GuideSortOption) => void;
  ratingFilter: RatingFilterOption;
  onSelectRatingFilter: (filter: RatingFilterOption) => void;
  durationFilter: DurationFilterOption;
  onSelectDurationFilter: (filter: DurationFilterOption) => void;
  deviceFilter: DeviceFilterOption;
  onSelectDeviceFilter: (filter: DeviceFilterOption) => void;
  onResetAll: () => void;
  hasActiveFilters: boolean;
}

export const GuideFilterMenu: React.FC<GuideFilterMenuProps> = ({
  isOpen,
  onClose,
  sortOption,
  onSelectSort,
  ratingFilter,
  onSelectRatingFilter,
  durationFilter,
  onSelectDurationFilter,
  deviceFilter,
  onSelectDeviceFilter,
  onResetAll,
  hasActiveFilters
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="guide-filter-popover absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-2xl border border-slate-200 shadow-xl z-30 p-4 animate-in fade-in zoom-in-95 duration-150 text-slate-800"
      role="dialog"
      aria-label="Filter und Sortierung anpassen"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#235cbb]" aria-hidden="true" />
          <h3 className="font-bold text-sm text-slate-900 m-0">
            Filter & Sortierung
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Filter-Menü schließen"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-3 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {/* SECTION 1: Sortierung */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Sortieren nach
          </label>
          <div className="grid grid-cols-1 gap-1.5">
            {/* ⭐ Am besten bewertet (Highlight option) */}
            <button
              type="button"
              onClick={() => onSelectSort('best-rated')}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                sortOption === 'best-rated'
                  ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="flex items-center gap-2">
                <Star className={`w-4 h-4 ${sortOption === 'best-rated' ? 'fill-amber-400 text-amber-500' : 'text-amber-500'}`} />
                <span>Am besten bewertet</span>
              </span>
              {sortOption === 'best-rated' && <Check className="w-4 h-4 text-amber-700 flex-shrink-0" />}
            </button>

            {/* ✨ Empfohlen (Standard) */}
            <button
              type="button"
              onClick={() => onSelectSort('default')}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                sortOption === 'default'
                  ? 'bg-blue-50 text-[#184b9c] border border-blue-300 shadow-2xs font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#235cbb]" />
                <span>Empfohlene Reihenfolge</span>
              </span>
              {sortOption === 'default' && <Check className="w-4 h-4 text-[#235cbb] flex-shrink-0" />}
            </button>

            {/* 🔤 Alphabetisch */}
            <button
              type="button"
              onClick={() => onSelectSort('alphabetical')}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                sortOption === 'alphabetical'
                  ? 'bg-blue-50 text-[#184b9c] border border-blue-300 shadow-2xs font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="flex items-center gap-2">
                <ArrowDownAZ className="w-4 h-4 text-slate-500" />
                <span>Alphabetisch (A–Z)</span>
              </span>
              {sortOption === 'alphabetical' && <Check className="w-4 h-4 text-[#235cbb] flex-shrink-0" />}
            </button>

            {/* ⏱️ Kürzeste Lesezeit */}
            <button
              type="button"
              onClick={() => onSelectSort('time-asc')}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                sortOption === 'time-asc'
                  ? 'bg-blue-50 text-[#184b9c] border border-blue-300 shadow-2xs font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-emerald-600" />
                <span>Kürzeste Lesezeit</span>
              </span>
              {sortOption === 'time-asc' && <Check className="w-4 h-4 text-[#235cbb] flex-shrink-0" />}
            </button>

            {/* ⏳ Ausführliche Anleitungen */}
            <button
              type="button"
              onClick={() => onSelectSort('time-desc')}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                sortOption === 'time-desc'
                  ? 'bg-blue-50 text-[#184b9c] border border-blue-300 shadow-2xs font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
              }`}
            >
              <span className="flex items-center gap-2">
                <Hourglass className="w-4 h-4 text-indigo-600" />
                <span>Ausführlichste Anleitungen</span>
              </span>
              {sortOption === 'time-desc' && <Check className="w-4 h-4 text-[#235cbb] flex-shrink-0" />}
            </button>
          </div>
        </div>

        {/* SECTION 2: Mindestbewertung */}
        <div className="pt-2 border-t border-slate-100">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Mindestbewertung
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onSelectRatingFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                ratingFilter === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              Alle
            </button>
            <button
              type="button"
              onClick={() => onSelectRatingFilter('4.8')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                ratingFilter === '4.8'
                  ? 'bg-amber-500 text-white font-bold shadow-2xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>Ab 4.8 Sterne</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectRatingFilter('4.5')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                ratingFilter === '4.5'
                  ? 'bg-amber-500 text-white font-bold shadow-2xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>Ab 4.5 Sterne</span>
            </button>
          </div>
        </div>

        {/* SECTION 3: Zeitaufwand / Dauer */}
        <div className="pt-2 border-t border-slate-100">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Lesezeit / Dauer
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => onSelectDurationFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                durationFilter === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              Alle Zeiten
            </button>
            <button
              type="button"
              onClick={() => onSelectDurationFilter('short')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                durationFilter === 'short'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              ⚡ Unter 5 Min.
            </button>
            <button
              type="button"
              onClick={() => onSelectDurationFilter('medium')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                durationFilter === 'medium'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              ⏱️ 5 bis 7 Min.
            </button>
            <button
              type="button"
              onClick={() => onSelectDurationFilter('long')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-center transition-all cursor-pointer ${
                durationFilter === 'long'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              📖 Ab 8 Min.
            </button>
          </div>
        </div>

        {/* SECTION 4: Gerät / System */}
        <div className="pt-2 border-t border-slate-100">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Gerät / Plattform
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onSelectDeviceFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                deviceFilter === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              Alle
            </button>
            <button
              type="button"
              onClick={() => onSelectDeviceFilter('mobile')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                deviceFilter === 'mobile'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Smartphone & Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectDeviceFilter('computer')}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                deviceFilter === 'computer'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Computer & Laptop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer with Reset and Done */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Zurücksetzen</span>
          </button>
        ) : (
          <span className="text-xs text-slate-400">Standardeinstellungen</span>
        )}

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1.5 bg-[#235cbb] hover:bg-[#1b4a99] text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer ml-auto"
        >
          Fertig
        </button>
      </div>
    </div>
  );
};
