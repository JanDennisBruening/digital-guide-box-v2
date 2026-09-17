import React, { useState, useMemo } from 'react';
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  Check,
  CheckCircle2,
  Layers,
  Settings,
  MessagesSquare,
  FolderOpen,
  ShieldCheck,
  WalletCards,
  FileText,
  Globe,
  Sparkles,
  ReceiptText,
  GraduationCap,
  Siren,
  Lightbulb,
  HeartPulse,
  LucideIcon
} from 'lucide-react';
import { NewsItem } from '../types';
import { getNewsStyles, NEWS_CATEGORIES } from '../data/themes';
import { NewsAssessmentView } from './NewsAssessmentView';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  settings: Settings,
  messages: MessagesSquare,
  folder: FolderOpen,
  shield: ShieldCheck,
  wallet: WalletCards,
  file: FileText,
  globe: Globe,
  sparkles: Sparkles,
  receipt: ReceiptText,
  graduation: GraduationCap,
  siren: Siren,
  heart: HeartPulse,
  book: BookOpen
};

function getCategoryIcon(categoryName: string): LucideIcon {
  const meta = NEWS_CATEGORIES[categoryName];
  if (meta && CATEGORY_ICONS[meta.icon]) {
    return CATEGORY_ICONS[meta.icon];
  }
  return BookOpen;
}

function formatGermanDate(isoString: string): string {
  try {
    return new Date(isoString + 'T12:00:00Z').toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC'
    });
  } catch {
    return isoString;
  }
}

interface NewsSectionProps {
  news: NewsItem[];
  onOpenNews: (item: NewsItem) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news, onOpenNews }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isRailExpanded, setIsRailExpanded] = useState<boolean>(false);

  const categories = useMemo(() => {
    const predefined = Object.keys(NEWS_CATEGORIES);
    const raw: string[] = Array.from(new Set(news.map(n => n.category)));
    const others = raw.filter((c: string) => !predefined.includes(c)).sort((a: string, b: string) => a.localeCompare(b, 'de'));
    return [...predefined, ...others];
  }, [news]);

  const filteredNews = useMemo(() => {
    let list = [...news];
    if (selectedCategory) {
      list = list.filter(n => n.category === selectedCategory);
    }
    list.sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      return order === 'newest' ? timeB - timeA : timeA - timeB;
    });
    return list;
  }, [news, selectedCategory, order]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const sortLabel = order === 'newest' ? 'Neueste zuerst' : 'Älteste zuerst';
  const nextSortLabel = order === 'newest' ? 'Älteste zuerst' : 'Neueste zuerst';

  return (
    <div className="news-feed-layout">
      {/* Category Filter Rail: Compact width by default for maximum UI space; auto-expands on hover */}
      <div className="news-rail-container">
        <aside
          className={`news-filter-rail ${isRailExpanded ? 'is-expanded' : 'is-collapsed'}`}
          aria-labelledby="news-categories-title"
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
              <h3 id="news-categories-title">Kategorien</h3>
            </div>
            <span
              className="news-rail-count-badge"
              title={`${categories.length} Themen verfügbar`}
            >
              {categories.length} Themen
            </span>
          </div>

          <div
            className="news-filters"
            role="radiogroup"
            aria-label="Neuigkeiten nach Kategorie filtern"
          >
            <button
              type="button"
              className={`news-filter${selectedCategory === '' ? ' is-active' : ''}`}
              style={getNewsStyles('Alle')}
              aria-controls="news-results"
              title="Alle Kategorien anzeigen"
              onClick={(e) => {
                setSelectedCategory('');
                setExpandedId(null);
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

            {categories.map(cat => {
              const Icon = getCategoryIcon(cat);
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`news-filter${isActive ? ' is-active' : ''}`}
                  style={getNewsStyles(cat)}
                  aria-controls="news-results"
                  title={`Kategorie: ${cat}`}
                  onClick={(e) => {
                    setSelectedCategory(cat);
                    setExpandedId(null);
                    (e.currentTarget as HTMLButtonElement).blur();
                    setIsRailExpanded(false);
                  }}
                >
                  {isActive ? (
                    <Check className="news-filter-icon-svg" aria-hidden="true" />
                  ) : (
                    <Icon className="news-filter-icon-svg" aria-hidden="true" />
                  )}
                  <span className="news-filter-label">{cat}</span>
                </button>
              );
            })}
          </div>

          <div className="news-rail-footer" aria-hidden="true">
            {categories.length} Themen zur Auswahl
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

      {/* Main News Feed */}
      <div className="news-feed-main">
        <div className="news-scroll-hint">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="news-sort"
              id="news-sort"
              aria-controls="news-results"
              aria-label={`${sortLabel}. Zu „${nextSortLabel}“ wechseln`}
              onClick={() => {
                setOrder(prev => (prev === 'newest' ? 'oldest' : 'newest'));
                setExpandedId(null);
              }}
            >
              {order === 'newest' ? (
                <ArrowDown aria-hidden="true" />
              ) : (
                <ArrowUp aria-hidden="true" />
              )}
              {sortLabel}
            </button>

            {selectedCategory ? (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('');
                  setExpandedId(null);
                }}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 hover:bg-blue-200 text-[#1e4f9c] border border-blue-200 transition-colors cursor-pointer"
                title="Filter zurücksetzen und alle Kategorien anzeigen"
              >
                <span>Thema: <strong>{selectedCategory}</strong></span>
                <span className="text-xs font-bold leading-none ml-0.5 opacity-70" aria-hidden="true">✕</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {categories.length + 1} Themen verfügbar
              </span>
            )}
          </div>
          <span id="news-scroll-hint">Weitere Beiträge beim Scrollen</span>
        </div>

        <div
          className="news-scroller"
          id="news-results"
          role="region"
          aria-label={selectedCategory ? `Neuigkeiten: ${selectedCategory}` : 'Alle Neuigkeiten'}
          aria-describedby="news-sort news-scroll-hint"
          tabIndex={0}
        >
          <div className="news-grid">
            {filteredNews.map(item => {
              const CategoryIcon = getCategoryIcon(item.category);
              const isExpanded = expandedId === item.id;
              return (
                <article
                  key={item.id}
                  className="news-entry"
                  data-state={isExpanded ? 'open' : 'closed'}
                  style={getNewsStyles(item.category)}
                >
                  <button
                    type="button"
                    className="news-card news-trigger"
                    aria-labelledby={`news-title-${item.id}`}
                    aria-describedby={`news-preview-hint-${item.id}`}
                    onClick={() => toggleExpand(item.id)}
                    data-state={isExpanded ? 'open' : 'closed'}
                  >
                    <span className="news-card-meta">
                      <span className="news-badge">
                        <CategoryIcon aria-hidden="true" />
                        {item.category}
                      </span>
                      <time dateTime={item.date}>
                        {item.dateLabel || 'Beitrag'} · {formatGermanDate(item.date)}
                      </time>
                    </span>

                    <span className="news-title-line">
                      <span className="news-card-title" id={`news-title-${item.id}`}>
                        {item.title}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="news-preview-label" id={`news-preview-hint-${item.id}`}>
                      {isExpanded ? 'Vorschau schließen' : 'Vorschau anzeigen'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div
                      className="border-t border-slate-200/90 bg-slate-50/80 p-4 sm:p-5 flex flex-col gap-3.5 text-left transition-all news-article-content"
                      id={`news-preview-${item.id}`}
                      style={{ display: 'flex' }}
                    >
                      {item.assessment && (
                        <NewsAssessmentView news={item} compact={true} />
                      )}

                      {/* Highlighted core relevance */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#235cbb] mb-1 flex items-center gap-1.5 font-body">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span>Darum ist das wichtig</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed font-body m-0">
                          {item.relevance}
                        </p>
                      </div>

                      {/* Full article paragraphs with their section titles */}
                      <div className="space-y-3 my-0.5">
                        {item.paragraphs.map((paragraph, pIndex) => (
                          <div
                            key={pIndex}
                            className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs"
                          >
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading mb-1.5 flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#235cbb] text-xs font-bold inline-flex items-center justify-center flex-shrink-0">
                                {pIndex + 1}
                              </span>
                              <span>
                                {item.paragraphTitles?.[pIndex] || `Teil ${pIndex + 1}`}
                              </span>
                            </h4>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body m-0">
                              {paragraph}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Takeaway / Fazit */}
                      {item.takeaway && (
                        <div className="bg-blue-50/80 border border-blue-200 p-3.5 rounded-xl shadow-2xs">
                          <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#235cbb] mb-1 flex items-center gap-1.5 font-body">
                            <Lightbulb className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                            <span>Das Wichtigste für dich</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed font-body m-0">
                            {item.takeaway}
                          </p>
                        </div>
                      )}

                      {/* Actions if present */}
                      {item.reading?.actions && item.reading.actions.length > 0 && (
                        <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-xl shadow-2xs">
                          <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5 font-body">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>Was du jetzt tun kannst</span>
                          </div>
                          <ul className="space-y-1.5 m-0 p-0 list-none text-xs sm:text-sm text-emerald-950 font-body">
                            {item.reading.actions.map((act, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2">
                                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span>{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tip if present */}
                      {item.tip && (
                        <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-950 font-body shadow-2xs">
                          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Tipp von Jan Dennis: </span>
                            <span>{item.tip}</span>
                          </div>
                        </div>
                      )}

                      {/* Bottom action bar */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-200/80 mt-1">
                        <button
                          type="button"
                          className="news-read-button inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xs hover:brightness-95 active:brightness-90 transition-all w-full sm:w-auto cursor-pointer"
                          style={{
                            background: 'var(--news-color, #235cbb)',
                            borderColor: 'var(--news-color, #235cbb)'
                          }}
                          aria-haspopup="dialog"
                          aria-label={`Vollständigen Beitrag im Lesemodus öffnen: ${item.title}`}
                          onClick={() => onOpenNews(item)}
                        >
                          <BookOpen className="w-4 h-4" aria-hidden="true" />
                          <span>Im Lesemodus öffnen</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                          onClick={() => toggleExpand(item.id)}
                        >
                          <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Vorschau schließen</span>
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="news-feed-end">
            <p role="status">
              {filteredNews.length === 0
                ? 'In dieser Kategorie gibt es noch keine Beiträge.'
                : selectedCategory
                ? `Alle Beiträge zu „${selectedCategory}“ geladen.`
                : 'Alle verfügbaren Beiträge geladen.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
