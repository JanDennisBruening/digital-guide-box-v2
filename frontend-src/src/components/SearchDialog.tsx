import React, { useState, useRef, useEffect } from 'react';
import { Search, X, BookOpen, Newspaper, ArrowRight } from 'lucide-react';
import { Guide, NewsItem, SelectionState } from '../types';

interface SearchDialogProps {
  guides: Guide[];
  news: NewsItem[];
  onSelect: (selection: SelectionState) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  guides,
  news,
  onSelect,
  inputRef: externalRef
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const localRef = useRef<HTMLInputElement>(null);
  const searchInputRef = externalRef || localRef;
  const containerRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim().toLowerCase();

  const matchingGuides = trimmed.length >= 2
    ? guides.filter(g =>
        g.title.toLowerCase().includes(trimmed) ||
        g.subtitle.toLowerCase().includes(trimmed) ||
        g.category.toLowerCase().includes(trimmed) ||
        g.steps.some(s => s.title.toLowerCase().includes(trimmed) || s.text.toLowerCase().includes(trimmed))
      )
    : [];

  const matchingNews = trimmed.length >= 2
    ? news.filter(n =>
        n.title.toLowerCase().includes(trimmed) ||
        n.takeaway.toLowerCase().includes(trimmed) ||
        n.category.toLowerCase().includes(trimmed) ||
        n.paragraphs.some(p => p.toLowerCase().includes(trimmed))
      )
    : [];

  const totalHits = matchingGuides.length + matchingNews.length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (state: SelectionState) => {
    setIsOpen(false);
    onSelect(state);
  };

  const handleClear = () => {
    setQuery('');
    searchInputRef.current?.focus();
  };

  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <form
        className="content-search"
        role="search"
        onSubmit={e => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <label htmlFor="box-search">In der Box suchen</label>
        <div className="content-search-field">
          <Search aria-hidden="true" />
          <input
            ref={searchInputRef}
            id="box-search"
            type="search"
            value={query}
            maxLength={100}
            autoComplete="off"
            placeholder="Zum Beispiel WhatsApp"
            onChange={e => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={e => {
              if (e.key === 'Escape') setIsOpen(false);
            }}
            aria-controls={isOpen ? 'box-search-results' : undefined}
            aria-haspopup="dialog"
          />
          {query ? (
            <button
              type="button"
              className="search-clear"
              aria-label="Suchtext löschen"
              onClick={handleClear}
            >
              <X aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </form>

      {isOpen && (
        <div
          className="search-panel"
          role="region"
          aria-label="Suche in Anleitungen und Neuigkeiten"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            zIndex: 60
          }}
        >
          <div className="search-panel-heading">
            <h2>Suche in der Box</h2>
            <button
              type="button"
              className="search-clear"
              aria-label="Suche schließen"
              onClick={() => setIsOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <div id="box-search-results" className="search-results">
            {trimmed.length < 2 ? (
              <p className="search-help">
                Suche in Grundlagen, Anleitungen und Neuigkeiten. Gib mindestens zwei Zeichen ein – zum Beispiel „Browser“, „Passwort ändern“ oder „WLAN“.
              </p>
            ) : null}

            {trimmed.length >= 2 ? (
              <p className="search-status" role="status">
                {totalHits === 0
                  ? `Keine Treffer für „${query.trim()}“`
                  : `${totalHits} Treffer für „${query.trim()}“`}
              </p>
            ) : null}

            {trimmed.length >= 2 && totalHits === 0 ? (
              <p className="search-help">
                Probiere einen kürzeren Begriff, zum Beispiel „Passwort“. Du kannst auch die Anleitungen durchsehen oder Jan eine Frage schreiben.
              </p>
            ) : null}

            {trimmed.length >= 2 && totalHits > 0 ? (
              <ul>
                {matchingGuides.map(guide => (
                  <li key={`guide-${guide.id}`}>
                    <button
                      type="button"
                      className="search-result"
                      aria-haspopup="dialog"
                      onClick={() => handleSelect({ kind: 'guide', item: guide })}
                    >
                      <BookOpen aria-hidden="true" />
                      <span>
                        <small>Anleitung · {guide.category}</small>
                        <strong>{guide.title}</strong>
                        <span>{guide.subtitle}</span>
                      </span>
                    </button>
                  </li>
                ))}
                {matchingNews.map(item => (
                  <li key={`news-${item.id}`}>
                    <button
                      type="button"
                      className="search-result"
                      aria-haspopup="dialog"
                      onClick={() => handleSelect({ kind: 'news', item })}
                    >
                      <Newspaper aria-hidden="true" />
                      <span>
                        <small>Neuigkeit · {item.category}</small>
                        <strong>{item.title}</strong>
                        <span>{item.takeaway}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
