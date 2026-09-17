import React, { useState, useMemo } from 'react';
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  ArrowUpRight,
  ChevronDown,
  Check,
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
      {/* Category Filter Rail */}
      <aside className="news-filter-rail" aria-labelledby="news-categories-title">
        <h3 id="news-categories-title">Kategorien</h3>
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
            onClick={() => {
              setSelectedCategory('');
              setExpandedId(null);
            }}
          >
            {selectedCategory === '' ? (
              <Check aria-hidden="true" />
            ) : (
              <Layers aria-hidden="true" />
            )}
            Alle
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
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedId(null);
                }}
              >
                {isActive ? <Check aria-hidden="true" /> : <Icon aria-hidden="true" />}
                {cat}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main News Feed */}
      <div className="news-feed-main">
        <div className="news-scroll-hint">
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
                  className={`news-entry${isExpanded ? ' is-open' : ''}`}
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
                      <ChevronDown aria-hidden="true" />
                    </span>

                    <span className="news-preview-label" id={`news-preview-hint-${item.id}`}>
                      {isExpanded ? 'Vorschau schließen' : 'Vorschau anzeigen'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div
                      className="news-article-collapse box-disclosure-content"
                      data-state="open"
                    >
                      <div className="news-inline-preview">
                        {item.assessment && (
                          <NewsAssessmentView news={item} compact={true} />
                        )}
                        <p className="news-excerpt">
                          {item.relevance} {item.paragraphs[0]}
                        </p>
                        <button
                          type="button"
                          className="news-read-button"
                          aria-haspopup="dialog"
                          aria-label={`Beitrag lesen: ${item.title}`}
                          onClick={() => onOpenNews(item)}
                        >
                          <BookOpen aria-hidden="true" />
                          <span>Beitrag lesen</span>
                          <ArrowUpRight aria-hidden="true" />
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
