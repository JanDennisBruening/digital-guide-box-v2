import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  Clock3,
  MessagesSquare,
  Compass,
  Smartphone,
  ShieldCheck,
  FolderArchive,
  CalendarCheck2,
  GraduationCap,
  Layers,
  Check,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Search,
  X,
  Star,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  LucideIcon
} from 'lucide-react';
import { Guide, ThemeColor } from '../types';
import { GUIDE_GROUPS, FOUNDATIONS, getGuideStyles } from '../data/themes';
import { getGuideIcon } from './GuideIcon';
import {
  GuideFilterMenu,
  GuideSortOption,
  RatingFilterOption,
  DurationFilterOption,
  DeviceFilterOption
} from './GuideFilterMenu';
import { getGuideRating, subscribeToRatings, GuideRatingData } from '../utils/guideRatings';

const GROUP_ICONS: Record<string, LucideIcon> = {
  communication: MessagesSquare,
  internet: Compass,
  devices: Smartphone,
  security: ShieldCheck,
  files: FolderArchive,
  everyday: CalendarCheck2,
  foundations: GraduationCap
};

interface RailCategory {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  theme: ThemeColor;
  matchFn: (g: Guide) => boolean;
}

interface GuidesSectionProps {
  guides: Guide[];
  onOpenGuide: (guide: Guide) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ guides, onOpenGuide }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRailExpanded, setIsRailExpanded] = useState<boolean>(false);

  // Filter & Sort States
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<GuideSortOption>('default');
  const [ratingFilter, setRatingFilter] = useState<RatingFilterOption>('all');
  const [durationFilter, setDurationFilter] = useState<DurationFilterOption>('all');
  const [deviceFilter, setDeviceFilter] = useState<DeviceFilterOption>('all');

  // Dynamic Guide Ratings map
  const [ratingsMap, setRatingsMap] = useState<Record<string, GuideRatingData>>(() => {
    const map: Record<string, GuideRatingData> = {};
    guides.forEach(g => {
      map[g.id] = getGuideRating(g.id);
    });
    return map;
  });

  useEffect(() => {
    const refreshRatings = () => {
      const map: Record<string, GuideRatingData> = {};
      guides.forEach(g => {
        map[g.id] = getGuideRating(g.id);
      });
      setRatingsMap(map);
    };
    return subscribeToRatings(refreshRatings);
  }, [guides]);

  // Categories list for the rail menu (matching Neuigkeiten rail structure)
  const railCategories: RailCategory[] = useMemo(() => {
    const list: RailCategory[] = [
      {
        id: 'foundations',
        title: 'Grundlagen',
        description: 'Wichtige Grundlagen und Basisbegriffe einfach und verständlich erklärt.',
        icon: GraduationCap,
        theme: 'blau',
        matchFn: (g: Guide) => FOUNDATIONS.some(f => f.id === g.id)
      },
      ...GUIDE_GROUPS.map(group => ({
        id: group.id,
        title: group.title,
        description: group.description,
        icon: GROUP_ICONS[group.id] || Compass,
        theme: group.theme,
        matchFn: (g: Guide) => group.categories.includes(g.category)
      }))
    ];

    // Check for any additional custom categories from guides not covered by the groups
    const coveredCategories = new Set(GUIDE_GROUPS.flatMap(g => g.categories));
    const extraCategories: string[] = Array.from<string>(new Set(guides.map(g => g.category)))
      .filter((cat: string) => !coveredCategories.has(cat));

    extraCategories.forEach((cat: string) => {
      list.push({
        id: `extra-${cat}`,
        title: cat,
        description: `Alle Anleitungen zum Thema ${cat}`,
        icon: BookOpen,
        theme: 'schiefer',
        matchFn: (g: Guide) => g.category === cat
      });
    });

    return list;
  }, [guides]);

  // Active category object if filtered
  const activeCategoryObj = useMemo(() => {
    if (!selectedCategory) return null;
    return railCategories.find(c => c.id === selectedCategory) || null;
  }, [selectedCategory, railCategories]);

  // Guides matching current category filter, search query, and advanced filters
  const filteredGuides = useMemo(() => {
    let list = guides;
    if (activeCategoryObj) {
      list = list.filter(activeCategoryObj.matchFn);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.scope.toLowerCase().includes(q) ||
        (g.learning?.why && g.learning.why.toLowerCase().includes(q))
      );
    }

    // Advanced Filter: Rating
    if (ratingFilter === '4.8') {
      list = list.filter(g => (ratingsMap[g.id]?.score ?? 0) >= 4.8);
    } else if (ratingFilter === '4.5') {
      list = list.filter(g => (ratingsMap[g.id]?.score ?? 0) >= 4.5);
    }

    // Advanced Filter: Duration
    if (durationFilter === 'short') {
      list = list.filter(g => g.minutes <= 4);
    } else if (durationFilter === 'medium') {
      list = list.filter(g => g.minutes >= 5 && g.minutes <= 7);
    } else if (durationFilter === 'long') {
      list = list.filter(g => g.minutes >= 8);
    }

    // Advanced Filter: Device / Scope
    if (deviceFilter === 'mobile') {
      list = list.filter(g => {
        const s = (g.scope + ' ' + g.category).toLowerCase();
        return (
          s.includes('android') ||
          s.includes('iphone') ||
          s.includes('smartphone') ||
          s.includes('tablet') ||
          s.includes('ipad') ||
          s.includes('handy')
        );
      });
    } else if (deviceFilter === 'computer') {
      list = list.filter(g => {
        const s = (g.scope + ' ' + g.category).toLowerCase();
        return (
          s.includes('windows') ||
          s.includes('mac') ||
          s.includes('computer') ||
          s.includes('pc') ||
          s.includes('laptop')
        );
      });
    }

    return list;
  }, [guides, activeCategoryObj, searchQuery, ratingFilter, durationFilter, deviceFilter, ratingsMap]);

  // Sorted guides according to chosen sort option
  const sortedGuides = useMemo(() => {
    const list = [...filteredGuides];
    if (sortOption === 'best-rated') {
      list.sort((a, b) => {
        const rA = ratingsMap[a.id] || { score: 0, count: 0 };
        const rB = ratingsMap[b.id] || { score: 0, count: 0 };
        if (rB.score !== rA.score) {
          return rB.score - rA.score;
        }
        if (rB.count !== rA.count) {
          return rB.count - rA.count;
        }
        return a.title.localeCompare(b.title, 'de');
      });
    } else if (sortOption === 'alphabetical') {
      list.sort((a, b) => a.title.localeCompare(b.title, 'de'));
    } else if (sortOption === 'time-asc') {
      list.sort((a, b) => a.minutes - b.minutes);
    } else if (sortOption === 'time-desc') {
      list.sort((a, b) => b.minutes - a.minutes);
    }
    return list;
  }, [filteredGuides, sortOption, ratingsMap]);

  const sortLabel = useMemo(() => {
    switch (sortOption) {
      case 'best-rated':
        return 'Am besten bewertet';
      case 'alphabetical':
        return 'Alphabetisch (A–Z)';
      case 'time-asc':
        return 'Kürzeste Lesezeit';
      case 'time-desc':
        return 'Ausführlichste Anleitungen';
      default:
        return 'Empfohlene Reihenfolge';
    }
  }, [sortOption]);

  const activeFilterBadges = useMemo(() => {
    const badges: Array<{ id: string; label: string; onRemove: () => void }> = [];
    if (sortOption !== 'default') {
      badges.push({
        id: 'sort',
        label: `Sortierung: ${sortLabel}`,
        onRemove: () => setSortOption('default')
      });
    }
    if (ratingFilter !== 'all') {
      badges.push({
        id: 'rating',
        label: ratingFilter === '4.8' ? '★ Ab 4.8 Sterne' : '★ Ab 4.5 Sterne',
        onRemove: () => setRatingFilter('all')
      });
    }
    if (durationFilter !== 'all') {
      const durLabel =
        durationFilter === 'short'
          ? '⚡ Unter 5 Min.'
          : durationFilter === 'medium'
          ? '⏱️ 5–7 Min.'
          : '📖 Ab 8 Min.';
      badges.push({
        id: 'duration',
        label: durLabel,
        onRemove: () => setDurationFilter('all')
      });
    }
    if (deviceFilter !== 'all') {
      badges.push({
        id: 'device',
        label: deviceFilter === 'mobile' ? '📱 Smartphone & Tablet' : '💻 Computer & Laptop',
        onRemove: () => setDeviceFilter('all')
      });
    }
    return badges;
  }, [sortOption, sortLabel, ratingFilter, durationFilter, deviceFilter]);

  const hasActiveFilters = activeFilterBadges.length > 0;

  const handleResetAllFilters = () => {
    setSortOption('default');
    setRatingFilter('all');
    setDurationFilter('all');
    setDeviceFilter('all');
  };

  return (
    <div className="news-feed-layout">
      {/* Category Filter Rail: identical to Neuigkeiten dock */}
      <div className="news-rail-container">
        <aside
          className={`news-filter-rail ${isRailExpanded ? 'is-expanded' : 'is-collapsed'}`}
          aria-labelledby="guides-categories-title"
          onMouseEnter={() => setIsRailExpanded(true)}
          onMouseLeave={() => setIsRailExpanded(false)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsRailExpanded(false);
            }
          }}
        >
          <div
            className="news-filter-rail-header"
            onClick={(e) => {
              setIsRailExpanded(prev => !prev);
              (e.currentTarget as HTMLElement).blur();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsRailExpanded(prev => !prev);
              }
            }}
            title={isRailExpanded ? 'Kategorien einklappen' : 'Kategorien erweitern'}
          >
            <div className="news-filter-rail-header-left">
              <Layers className="news-rail-icon" aria-hidden="true" />
              <h3 id="guides-categories-title">Kategorien</h3>
            </div>
            <span
              className="news-rail-count-badge"
              title={`${railCategories.length} Themen verfügbar`}
            >
              {railCategories.length} Themen
            </span>
          </div>

          <div
            className="news-filters"
            role="radiogroup"
            aria-label="Anleitungen nach Kategorie filtern"
          >
            {/* Alle Button */}
            <button
              type="button"
              className={`news-filter${selectedCategory === '' ? ' is-active' : ''}`}
              style={getGuideStyles('blau')}
              aria-controls="guides-results"
              title="Alle Anleitungen anzeigen"
              onClick={(e) => {
                setSelectedCategory('');
                (e.currentTarget as HTMLButtonElement).blur();
                setIsRailExpanded(false);
              }}
            >
              {selectedCategory === '' ? (
                <Check className="news-filter-icon-svg" aria-hidden="true" />
              ) : (
                <Layers className="news-filter-icon-svg" aria-hidden="true" />
              )}
              <span className="news-filter-label">Alle</span>
            </button>

            {/* Category Buttons */}
            {railCategories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`news-filter${isActive ? ' is-active' : ''}`}
                  style={getGuideStyles(cat.theme)}
                  aria-controls="guides-results"
                  title={`Kategorie: ${cat.title}`}
                  onClick={(e) => {
                    setSelectedCategory(cat.id);
                    (e.currentTarget as HTMLButtonElement).blur();
                    setIsRailExpanded(false);
                  }}
                >
                  {isActive ? (
                    <Check className="news-filter-icon-svg" aria-hidden="true" />
                  ) : (
                    <Icon className="news-filter-icon-svg" aria-hidden="true" />
                  )}
                  <span className="news-filter-label">{cat.title}</span>
                </button>
              );
            })}
          </div>

          <div className="news-rail-footer" aria-hidden="true">
            {railCategories.length} Themen zur Auswahl
          </div>

          {!isRailExpanded && (
            <div
              className="news-rail-peek-hint"
              aria-hidden="true"
              title="Drüberhovern, um alle Kategorien anzuzeigen"
            >
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </aside>
      </div>

      {/* Main Guides Content Area */}
      <div className="news-feed-main">
        <div
          className="guide-scroller"
          role="region"
          aria-label="Anleitungen und Grundlagen"
          id="guides-results"
          tabIndex={0}
        >
          {/* Top Control Bar: Search input on top, count and sort switcher directly underneath */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-2xs mb-5 flex flex-col gap-3">
            {/* 1. Live Search Input (Full Width) */}
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Anleitung oder Begriff suchen (z. B. WhatsApp, WLAN, Fotos)..."
                className="w-full pl-9.5 pr-8 py-2.5 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-[#235cbb] rounded-xl text-slate-800 placeholder-slate-400 outline-none transition-all shadow-2xs"
                aria-label="Anleitungen filtern"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
                  title="Suche leeren"
                  aria-label="Suche leeren"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 2. Sub-Row: Count on left, Filter & Sort popover trigger on right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">
                  {sortedGuides.length} {sortedGuides.length === 1 ? 'Anleitung' : 'Anleitungen'} {searchQuery || hasActiveFilters ? 'gefunden' : 'verfügbar'}
                </span>
                {(searchQuery || hasActiveFilters) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      handleResetAllFilters();
                    }}
                    className="text-[11px] text-[#235cbb] hover:underline font-semibold cursor-pointer ml-1"
                  >
                    (Zurücksetzen)
                  </button>
                )}
              </div>

              {/* Filter & Sort Popover Trigger */}
              <div className="relative self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setIsFilterMenuOpen(prev => !prev)}
                  aria-expanded={isFilterMenuOpen}
                  aria-haspopup="dialog"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border shadow-2xs transition-all cursor-pointer whitespace-nowrap ${
                    hasActiveFilters
                      ? 'bg-blue-50 text-[#184b9c] border-blue-300 hover:bg-blue-100/80 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title="Filter und Sortierung anpassen"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#235cbb]" aria-hidden="true" />
                  <span>{sortOption === 'best-rated' ? '⭐ Am besten bewertet' : 'Filter & Sortierung'}</span>
                  {activeFilterBadges.length > 0 && (
                    <span className="w-4.5 h-4.5 rounded-full bg-[#235cbb] text-white text-[10px] font-bold flex items-center justify-center ml-0.5">
                      {activeFilterBadges.length}
                    </span>
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isFilterMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <GuideFilterMenu
                  isOpen={isFilterMenuOpen}
                  onClose={() => setIsFilterMenuOpen(false)}
                  sortOption={sortOption}
                  onSelectSort={setSortOption}
                  ratingFilter={ratingFilter}
                  onSelectRatingFilter={setRatingFilter}
                  durationFilter={durationFilter}
                  onSelectDurationFilter={setDurationFilter}
                  deviceFilter={deviceFilter}
                  onSelectDeviceFilter={setDeviceFilter}
                  onResetAll={handleResetAllFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
            </div>

            {/* 3. Active filter chips */}
            {activeFilterBadges.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-medium text-slate-400">Aktive Filter:</span>
                {activeFilterBadges.map(badge => (
                  <span
                    key={badge.id}
                    className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded-lg bg-blue-50 border border-blue-200/80 text-[#184b9c] text-xs font-medium"
                  >
                    <span>{badge.label}</span>
                    <button
                      type="button"
                      onClick={badge.onRemove}
                      className="p-0.5 hover:bg-blue-100 text-blue-600 rounded cursor-pointer"
                      title={`${badge.label} entfernen`}
                      aria-label={`${badge.label} entfernen`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="text-[11px] text-slate-500 hover:text-rose-600 underline cursor-pointer ml-1"
                >
                  Alle zurücksetzen
                </button>
              </div>
            )}
          </div>

          {/* If a category is selected in the rail: show Category Banner & Back Link */}
          {activeCategoryObj && (
            <div className="mb-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#235cbb] hover:text-[#184b9c] bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Alle Themen anzeigen</span>
                </button>
              </div>

              <header
                className="guide-collection-heading p-4 sm:p-5 rounded-2xl mb-4"
                style={getGuideStyles(activeCategoryObj.theme)}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[var(--guide-color)] flex-shrink-0">
                    <activeCategoryObj.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id="guide-filtered-title" className="text-lg sm:text-xl font-bold tracking-tight m-0 text-slate-800 font-display">
                      {activeCategoryObj.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 m-0 mt-0.5">
                      {activeCategoryObj.description}
                    </p>
                  </div>
                </div>
              </header>
            </div>
          )}

          {/* Alle Anleitungen - Vollflächig gestapelt "unter- und übereinander" */}
          <section className="guide-collection" aria-labelledby="all-guides-heading">
            {!activeCategoryObj && (
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-2.5">
                  <h2 id="all-guides-heading" className="text-base sm:text-lg font-bold text-slate-800 tracking-tight m-0 font-display">
                    {searchQuery ? `Suchergebnisse für „${searchQuery}“` : 'Alle Anleitungen'}
                  </h2>
                  <span className="text-xs font-medium text-slate-500">
                    ({sortedGuides.length} verfügbar)
                  </span>
                </div>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-[#235cbb] hover:underline font-semibold cursor-pointer"
                  >
                    Suche zurücksetzen
                  </button>
                )}
              </div>
            )}

            {/* STACKED LIST: Unter- und übereinander mit großzügigem Freiraum */}
            {sortedGuides.length > 0 ? (
              <div className="guide-stack-list" id="guides-stack-list">
                {sortedGuides.map(guide => {
                  const Icon = getGuideIcon(guide.id);
                  return (
                    <article
                      key={guide.id}
                      className="guide-row-card group"
                      style={getGuideStyles(guide.theme)}
                      onClick={() => onOpenGuide(guide)}
                      role="button"
                      tabIndex={0}
                      aria-haspopup="dialog"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenGuide(guide);
                        }
                      }}
                    >
                      {/* Left: Compact, sleek App Icon */}
                      <div className="guide-row-icon" aria-hidden="true">
                        <Icon />
                      </div>

                      {/* Middle: Content & Hierarchy */}
                      <div className="guide-row-body">
                        {/* Zeile 1: Kategorie und Titel in einer Zeile */}
                        <div className="guide-row-header-line">
                          <span className="guide-row-category-pill">
                            {guide.category}
                          </span>
                          <h3 className="guide-row-title">{guide.title}</h3>
                        </div>

                        {/* Zeile 2: Kurzbeschreibung */}
                        <p className="guide-row-summary">{guide.subtitle}</p>

                        {/* Zeile 3: Button als eigenständige Zeile */}
                        <div className="guide-row-button-row">
                          <button
                            type="button"
                            className="guide-row-btn"
                            aria-label={`Anleitung „${guide.title}“ lesen`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenGuide(guide);
                            }}
                          >
                            <span>Anleitung lesen</span>
                            <ArrowRight aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Right: Kurzinformationen (Bewertung, Lesezeit, Schritte, Gerät, Stand) rechts auf der Seite */}
                      <div className="guide-row-meta-col">
                        {ratingsMap[guide.id] && (
                          <div
                            className="guide-row-meta-item guide-row-rating-item"
                            title={`Bewertung: ${ratingsMap[guide.id].score.toFixed(1)} von 5 Sternen (${ratingsMap[guide.id].count} Bewertungen)`}
                          >
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500 flex-shrink-0" aria-hidden="true" />
                            <span className="font-bold text-slate-800 text-xs">{ratingsMap[guide.id].score.toFixed(1)}</span>
                            <span className="text-slate-400 text-[11px]">({ratingsMap[guide.id].count})</span>
                          </div>
                        )}
                        <div className="guide-row-meta-item">
                          <Clock3 className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                          <span><strong>{guide.minutes} Min.</strong> · {guide.steps.length} Schritte</span>
                        </div>
                        {guide.scope && (
                          <div className="guide-row-meta-item">
                            <Smartphone className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                            <span>{guide.scope}</span>
                          </div>
                        )}
                        <div className="guide-row-meta-item text-slate-400">
                          <span>Stand: {guide.updatedAt}</span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 sm:p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-base font-bold text-slate-700 m-0">Keine passende Anleitung gefunden</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  {searchQuery
                    ? `Für den Suchbegriff „${searchQuery}“ gibt es noch keine passende Anleitung mit den gewählten Filtern.`
                    : 'Mit den aktuell gewählten Filter- und Sucheinstellungen wurden keine Anleitungen gefunden.'}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={handleResetAllFilters}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer shadow-2xs inline-flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Filter zurücksetzen</span>
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                    >
                      Suche leeren
                    </button>
                  )}
                  {selectedCategory && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('')}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                    >
                      Alle Kategorien anzeigen
                    </button>
                  )}
                </div>
              </div>
            )}

            <p className="guide-reading-note mt-6 text-center text-xs text-slate-500">
              Jede Anleitung kann direkt digital durchgeblättert oder als einseitiges PDF ausgedruckt werden.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
