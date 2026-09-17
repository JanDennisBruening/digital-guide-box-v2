import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  FileText,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Newspaper,
  CalendarDays,
  Clock3,
  Monitor,
  ClipboardList,
  List,
  Target,
  LifeBuoy,
  Lightbulb,
  UsersRound
} from 'lucide-react';
import { Guide, NewsItem, SelectionState } from '../types';
import { getGuideStyles, getNewsStyles } from '../data/themes';
import { GuideIcon, getStepIcon } from './GuideIcon';
import { NewsAssessmentView } from './NewsAssessmentView';

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

interface ReadingDialogProps {
  selection: SelectionState | null;
  onClose: () => void;
  allGuides: Guide[];
  allNews: NewsItem[];
  onSelectRelated: (selection: SelectionState) => void;
}

export const ReadingDialog: React.FC<ReadingDialogProps> = ({
  selection,
  onClose,
  allGuides,
  allNews,
  onSelectRelated
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Reset scroll and step index when selection changes
  useEffect(() => {
    setStepIndex(0);
    setShowAll(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selection?.item.id]);

  useEffect(() => {
    if (!selection) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selection, onClose]);

  if (!selection) return null;

  const isGuide = selection.kind === 'guide';
  const guide = isGuide ? (selection.item as Guide) : null;
  const newsItem = !isGuide ? (selection.item as NewsItem) : null;

  const isExplain = guide?.learning?.kind === 'explain';
  const stepLabel = isExplain ? 'Abschnitt' : 'Schritt';
  const walkthroughId = guide ? `walkthrough-${guide.id}` : '';

  const relatedGuides = isGuide
    ? allGuides.filter(g => g.id !== guide!.id && g.category === guide!.category).slice(0, 2)
    : (newsItem?.guideIds ?? []).flatMap(id => {
        const g = allGuides.find(x => x.id === id);
        return g ? [g] : [];
      });

  const relatedNews = !isGuide
    ? allNews.filter(n => n.id !== newsItem!.id && n.category === newsItem!.category).slice(0, 2)
    : allNews.filter(n => (n.guideIds && n.guideIds.includes(guide!.id)) || n.category === guide!.category).slice(0, 2);

  const themeStyles = isGuide
    ? getGuideStyles(guide?.theme)
    : getNewsStyles(newsItem?.category || '');

  const handleStepJump = (idx: number) => {
    setStepIndex(idx);
    setShowAll(false);
  };

  return (
    <div
      className="reading-overlay fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="reading-dialog"
        data-reading-kind={selection.kind}
        style={themeStyles}
        onClick={e => e.stopPropagation()}
      >
        {/* Reading Top Sticky Bar */}
        <div className="reading-top">
          <span className="news-badge">
            {isGuide ? <BookOpen aria-hidden="true" /> : <Newspaper aria-hidden="true" />}
            {selection.item.category}
          </span>

          <div className="reading-top-actions">
            <button
              type="button"
              className="circle-button reading-close"
              aria-label="Lesefenster schließen"
              onClick={onClose}
            >
              <X aria-hidden="true" />
              <span>Schließen</span>
            </button>
          </div>
        </div>

        <div className="reading-scroll" ref={scrollRef}>
          {/* Header */}
          <div className="reading-header">
            <div className="reading-header-grid">
              <div className="reading-intro">
                <div className="reading-heading">
                  {isGuide && guide ? (
                    <GuideIcon guide={guide} />
                  ) : (
                    <span className="news-emblem">
                      <Newspaper aria-hidden="true" />
                    </span>
                  )}
                  <div>
                    <h1 className="reading-title" tabIndex={-1}>
                      {selection.item.title}
                    </h1>
                    <p className="reading-description">
                      {isGuide && guide
                        ? guide.learning?.why || guide.subtitle
                        : newsItem?.relevance}
                    </p>
                  </div>
                </div>

                <div className="reading-meta">
                  <span>
                    <CalendarDays aria-hidden="true" />
                    {isGuide && guide
                      ? `Stand: ${guide.updatedAt}`
                      : `${newsItem?.dateLabel || 'Beitrag'}: ${formatGermanDate(newsItem?.date || '')}`}
                  </span>
                  {isGuide && guide && (
                    <span>
                      <Clock3 aria-hidden="true" />
                      {guide.minutes} Minuten Lesezeit
                    </span>
                  )}
                </div>

                {isGuide && guide?.scope && (
                  <p className="scope">
                    <Monitor aria-hidden="true" />
                    {guide.scope}
                  </p>
                )}
              </div>

              {isGuide && guide && (
                <a
                  className="pdf-access"
                  href={`/api/pdf/${guide.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText className="pdf-access-icon" aria-hidden="true" />
                  <strong>Drucken / PDF</strong>
                  <small>1 Seite · speichern oder drucken</small>
                  <ArrowUpRight className="pdf-access-arrow" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Reading Body */}
          <div className="reading-body">
            {isGuide && guide && (
              <div className="guide-learning">
                {guide.learning?.preparation && guide.learning.preparation.length > 0 && (
                  <section
                    className="learning-start"
                    aria-labelledby={`${walkthroughId}-start`}
                  >
                    <h2 id={`${walkthroughId}-start`}>
                      <ClipboardList aria-hidden="true" />
                      {isExplain ? 'Für den Anfang' : 'Bevor du beginnst'}
                    </h2>
                    <ul>
                      {guide.learning.preparation.map((prep, i) => (
                        <li key={i}>{prep}</li>
                      ))}
                    </ul>
                  </section>
                )}

                <section
                  className="walkthrough"
                  aria-labelledby={`${walkthroughId}-title`}
                >
                  <header className="walkthrough-heading">
                    <div>
                      <h2 id={`${walkthroughId}-title`}>
                        {isExplain ? 'In Ruhe verstehen' : 'Schritt für Schritt'}
                      </h2>
                      <p>
                        {isExplain
                          ? 'Lies einen Abschnitt nach dem anderen.'
                          : 'Lies zuerst den Schritt und probiere ihn dann auf deinem Gerät aus.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="walkthrough-overview"
                      aria-controls={walkthroughId}
                      aria-pressed={showAll}
                      onClick={() => setShowAll(prev => !prev)}
                    >
                      <List aria-hidden="true" />
                      <span>
                        {showAll
                          ? 'Einzeln ansehen'
                          : `Alle ${isExplain ? 'Abschnitte' : 'Schritte'} ansehen`}
                      </span>
                    </button>
                  </header>

                  {!showAll && (
                    <nav
                      className="walkthrough-position"
                      aria-label={`${stepLabel} auswählen`}
                    >
                      <span>
                        {stepLabel} {stepIndex + 1} von {guide.steps.length}
                      </span>
                      <ol>
                        {guide.steps.map((s, idx) => (
                          <li key={s.title}>
                            <button
                              type="button"
                              aria-current={idx === stepIndex ? 'step' : undefined}
                              aria-controls={walkthroughId}
                              aria-label={`${stepLabel} ${idx + 1}: ${s.title}`}
                              onClick={() => handleStepJump(idx)}
                              style={{
                                fontWeight: idx === stepIndex ? 700 : 500,
                                background: idx === stepIndex ? 'var(--guide-color)' : '#fff',
                                color: idx === stepIndex ? '#fff' : 'inherit'
                              }}
                            >
                              {idx + 1}
                            </button>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}

                  <ol
                    id={walkthroughId}
                    className="learning-steps"
                    start={showAll ? 1 : stepIndex + 1}
                  >
                    {guide.steps.map((step, idx) => {
                      if (!showAll && idx !== stepIndex) return null;
                      const StepIcon = getStepIcon(guide.id, idx);
                      return (
                        <li key={idx} value={idx + 1}>
                          <div className="learning-step-symbol" aria-hidden="true">
                            <StepIcon aria-hidden="true" />
                          </div>
                          <div className="learning-step-copy">
                            <p className="learning-step-number">
                              {stepLabel} {idx + 1}
                            </p>
                            <h3
                              ref={idx === (showAll ? 0 : stepIndex) ? stepHeadingRef : undefined}
                              tabIndex={-1}
                            >
                              {step.title}
                            </h3>
                            <p>{step.text}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  {!showAll && (
                    <div className="walkthrough-navigation">
                      <button
                        type="button"
                        disabled={stepIndex === 0}
                        onClick={() => setStepIndex(s => Math.max(0, s - 1))}
                      >
                        <ArrowLeft aria-hidden="true" />
                        <span>Zurück</span>
                      </button>

                      {stepIndex < guide.steps.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setStepIndex(s => Math.min(guide.steps.length - 1, s + 1))}
                        >
                          <span>
                            Weiter zu {stepLabel} {stepIndex + 2}
                          </span>
                          <ArrowRight aria-hidden="true" />
                        </button>
                      ) : (
                        <span>Letzter {stepLabel} · du kannst jederzeit zurückblättern.</span>
                      )}
                    </div>
                  )}

                  {guide.learning?.result && (showAll || stepIndex === guide.steps.length - 1) && (
                    <section
                      className="learning-result"
                      aria-labelledby={`${walkthroughId}-result`}
                    >
                      <h2 id={`${walkthroughId}-result`}>
                        <Target aria-hidden="true" />
                        {isExplain ? 'Das kannst du dir merken' : 'So prüfst du das Ergebnis'}
                      </h2>
                      <p>{guide.learning.result}</p>
                    </section>
                  )}
                </section>

                {(guide.learning?.ifStuck || guide.learning?.ifDifferent) && (
                  <aside className="learning-help">
                    <h2>
                      <LifeBuoy aria-hidden="true" />
                      {isExplain ? 'Noch nicht ganz klar?' : 'Falls es anders aussieht'}
                    </h2>
                    <p>{guide.learning.ifStuck || guide.learning.ifDifferent}</p>
                  </aside>
                )}

                {guide.tip && (
                  <aside className="learning-note">
                    <h2>
                      <Lightbulb aria-hidden="true" />
                      Gut zu wissen
                    </h2>
                    <p>{guide.tip}</p>
                  </aside>
                )}
              </div>
            )}

            {!isGuide && newsItem && (
              <div className="news-reading">
                {newsItem.assessment && <NewsAssessmentView news={newsItem} />}

                {newsItem.reading?.audience && (
                  <p className="news-audience">
                    <UsersRound aria-hidden="true" />
                    <span>{newsItem.reading.audience}</span>
                  </p>
                )}

                <aside className="news-core">
                  <h2>
                    <Lightbulb aria-hidden="true" />
                    Das Wichtigste für dich
                  </h2>
                  <p>{newsItem.takeaway}</p>
                </aside>

                <div className="news-background">
                  {newsItem.paragraphs.map((para, i) => (
                    <section key={i}>
                      <h2>{newsItem.paragraphTitles[i] || `Teil ${i + 1}`}</h2>
                      <p>{para}</p>
                    </section>
                  ))}
                </div>

                {newsItem.reading?.actions && newsItem.reading.actions.length > 0 && (
                  <section className="news-action">
                    <h2>
                      <ArrowRight aria-hidden="true" />
                      Was du jetzt tun kannst
                    </h2>
                    <ol>
                      {newsItem.reading.actions.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ol>
                  </section>
                )}

                {newsItem.tip && (
                  <aside className="learning-note">
                    <h2>
                      <Lightbulb aria-hidden="true" />
                      Gut zu wissen
                    </h2>
                    <p>{newsItem.tip}</p>
                  </aside>
                )}
              </div>
            )}

            {/* Source list */}
            {selection.item.sources && selection.item.sources.length > 0 && (
              <div className="source-list">
                <strong>Weiterlesen beim Anbieter</strong>
                {!isGuide && newsItem?.checkedAt && (
                  <p className="source-checked">
                    Quellen geprüft am {formatGermanDate(newsItem.checkedAt)}
                  </p>
                )}
                {selection.item.sources.map(s => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.title} ↗
                  </a>
                ))}
              </div>
            )}

            {/* Related Reading */}
            {(relatedGuides.length > 0 || relatedNews.length > 0) && (
              <section className="related-reading" aria-labelledby="related-reading-title">
                <h2 id="related-reading-title">Das passt dazu</h2>
                {relatedGuides.length > 0 && (
                  <nav className="related-group" aria-label="Passende Anleitungen">
                    <h3>Passende Anleitungen</h3>
                    <ul className="related-grid">
                      {relatedGuides.map(g => (
                        <li key={g.id}>
                          <button
                            type="button"
                            className="related-card"
                            style={getGuideStyles(g.theme)}
                            onClick={() => onSelectRelated({ kind: 'guide', item: g })}
                          >
                            <BookOpen aria-hidden="true" />
                            <span>
                              <small>{g.category}</small>
                              <strong>{g.title}</strong>
                              <span>{g.subtitle}</span>
                            </span>
                            <ArrowRight aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {relatedNews.length > 0 && (
                  <nav className="related-group" aria-label="Weitere passende Neuigkeiten">
                    <h3>Weitere Neuigkeiten</h3>
                    <ul className="related-grid">
                      {relatedNews.map(n => (
                        <li key={n.id}>
                          <button
                            type="button"
                            className="related-card"
                            style={getNewsStyles(n.category)}
                            onClick={() => onSelectRelated({ kind: 'news', item: n })}
                          >
                            <Newspaper aria-hidden="true" />
                            <span>
                              <small>{n.category}</small>
                              <strong>{n.title}</strong>
                              <span>{n.takeaway}</span>
                            </span>
                            <ArrowRight aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
