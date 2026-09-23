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
  UsersRound,
  Sparkles,
  Check,
  CheckCircle2,
  Printer,
  Star
} from 'lucide-react';
import { Guide, NewsItem, SelectionState } from '../types';
import { getGuideStyles, getNewsStyles } from '../data/themes';
import { GuideIcon, getStepIcon } from './GuideIcon';
import { NewsAssessmentView } from './NewsAssessmentView';
import { openGuidePrintWindow } from '../utils/pdfGenerator';
import { getDateLabelStyle } from '../utils/dateLabels';
import { GuideRatingCard } from './GuideRatingCard';
import { getGuideRating, subscribeToRatings } from '../utils/guideRatings';

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
  onAskAssistant?: (prompt: string) => void;
}

export const ReadingDialog: React.FC<ReadingDialogProps> = ({
  selection,
  onClose,
  allGuides,
  allNews,
  onSelectRelated,
  onAskAssistant
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Reset scroll and step index when selection changes
  useEffect(() => {
    setStepIndex(0);
    setShowAll(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selection?.item.id]);

  // Auto-scroll active tab into view in the tab bar
  useEffect(() => {
    if (tabRefs.current[stepIndex]) {
      tabRefs.current[stepIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [stepIndex]);

  useEffect(() => {
    if (!selection) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selection, onClose]);

  const isGuide = selection?.kind === 'guide';
  const guide = isGuide ? (selection?.item as Guide) : null;
  const newsItem = !isGuide ? (selection?.item as NewsItem) : null;

  const [guideRating, setGuideRating] = useState(() => (guide ? getGuideRating(guide.id) : { score: 5.0, count: 0, userRating: null }));

  useEffect(() => {
    if (!guide) return;
    setGuideRating(getGuideRating(guide.id));
    return subscribeToRatings(() => {
      setGuideRating(getGuideRating(guide.id));
    });
  }, [guide?.id]);

  // Arrow key navigation between steps
  useEffect(() => {
    if (!selection || !isGuide || !guide || showAll) return;
    const handleArrowKeys = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (e.key === 'ArrowRight') {
        setStepIndex(s => Math.min(guide.steps.length - 1, s + 1));
      } else if (e.key === 'ArrowLeft') {
        setStepIndex(s => Math.max(0, s - 1));
      }
    };
    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, [selection, isGuide, guide, showAll]);

  if (!selection) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || !guide) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0 && stepIndex < guide.steps.length - 1) {
        setStepIndex(s => s + 1);
      } else if (deltaX > 0 && stepIndex > 0) {
        setStepIndex(s => s - 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const isExplain = guide?.learning?.kind === 'explain';
  const stepLabel = isExplain ? 'Abschnitt' : 'Schritt';
  const walkthroughId = guide ? `walkthrough-${guide.id}` : '';

  const relatedGuides = isGuide
    ? allGuides.filter(g => g.id !== guide!.id && g.category === guide!.category).slice(0, 2)
    : allGuides.filter(g => g.category.includes(newsItem!.category) || newsItem!.category.includes(g.category)).slice(0, 2);

  const relatedNews = !isGuide
    ? allNews.filter(n => n.id !== newsItem!.id && n.category === newsItem!.category).slice(0, 2)
    : allNews.filter(n => n.category.includes(guide!.category) || guide!.category.includes(n.category)).slice(0, 2);

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
                    {isGuide && guide ? (
                      `Stand: ${guide.updatedAt}`
                    ) : (
                      <span className="inline-flex items-center gap-1.5 flex-wrap">
                        {(() => {
                          const dateStyle = getDateLabelStyle(newsItem?.dateLabel);
                          const LabelIcon = dateStyle.Icon;
                          return (
                            <span className={dateStyle.pillClass}>
                              <LabelIcon aria-hidden="true" />
                              <span>{dateStyle.text}</span>
                            </span>
                          );
                        })()}
                        <span>{formatGermanDate(newsItem?.date || '')}</span>
                      </span>
                    )}
                  </span>
                  {isGuide && guide && (
                    <>
                      <span>
                        <Clock3 aria-hidden="true" />
                        {guide.minutes} Minuten Lesezeit
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" aria-hidden="true" />
                        <span>{guideRating.score.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal text-xs">({guideRating.count})</span>
                      </span>
                    </>
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
                <button
                  type="button"
                  className="pdf-access cursor-pointer"
                  onClick={() => openGuidePrintWindow(guide)}
                  aria-label="Anleitung drucken oder als PDF speichern"
                >
                  <Printer className="pdf-access-icon" aria-hidden="true" />
                  <strong>Drucken / PDF</strong>
                  <small>Druckfertige A4-Ansicht · speichern oder drucken</small>
                  <ArrowUpRight className="pdf-access-arrow" aria-hidden="true" />
                </button>
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
                  <header className="walkthrough-heading flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h2 id={`${walkthroughId}-title`} className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                        {isExplain ? 'In Ruhe verstehen' : 'Schritt für Schritt'}
                      </h2>
                      <p className="text-sm text-slate-600 font-body mt-0.5">
                        {isExplain
                          ? 'Lies einen Abschnitt nach dem anderen.'
                          : 'Lies zuerst den Schritt und probiere ihn dann auf deinem Gerät aus.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="walkthrough-overview inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 hover:text-slate-900 border border-slate-200/90 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
                      aria-controls={walkthroughId}
                      aria-pressed={showAll}
                      onClick={() => setShowAll(prev => !prev)}
                    >
                      <List className="w-4 h-4 text-slate-500 flex-shrink-0" aria-hidden="true" />
                      <span>
                        {showAll
                          ? 'Als Tabs & Slider ansehen'
                          : `Alle ${isExplain ? 'Abschnitte' : 'Schritte'} untereinander`}
                      </span>
                    </button>
                  </header>

                  {/* Tab Navigation with Step Names and Progress */}
                  {!showAll && (
                    <div className="walkthrough-tabs-wrapper mb-5">
                      <div className="flex items-center justify-between gap-3 mb-2 px-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200/90 shadow-2xs">
                            {stepLabel} <strong style={{ color: 'var(--guide-color, #235cbb)' }}>{stepIndex + 1}</strong> von {guide.steps.length}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 hidden sm:flex items-center gap-1.5 font-medium">
                          <span>Klicke auf die Tabs oder nutze Pfeiltasten ◄ / ►</span>
                        </div>
                      </div>

                      {/* Scrollable Tabs with step names */}
                      <nav
                        role="tablist"
                        aria-label={`${stepLabel}-Auswahl`}
                        className="step-tab-bar p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-2xs"
                      >
                        {guide.steps.map((s, idx) => {
                          const isActive = idx === stepIndex;
                          const isCompleted = idx < stepIndex;
                          return (
                            <button
                              key={s.title || idx}
                              ref={el => { tabRefs.current[idx] = el; }}
                              role="tab"
                              id={`step-tab-${idx}`}
                              aria-selected={isActive}
                              aria-controls={`step-panel-${idx}`}
                              tabIndex={isActive ? 0 : -1}
                              type="button"
                              onClick={() => handleStepJump(idx)}
                              className={`step-tab-btn select-none ${
                                isActive
                                  ? 'bg-white text-slate-900 shadow-xs border-slate-200/90 font-bold'
                                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                              }`}
                              style={
                                isActive
                                  ? {
                                      boxShadow: 'inset 0 -2.5px 0 var(--guide-color, #235cbb), 0 1px 2px rgba(0, 0, 0, 0.05)',
                                      borderColor: '#cbd5e1'
                                    }
                                  : {}
                              }
                              title={`${stepLabel} ${idx + 1}: ${s.title}`}
                            >
                              <span
                                className={`w-5.5 h-5.5 rounded-full text-[11px] font-bold flex items-center justify-center transition-colors flex-shrink-0 ${
                                  isActive
                                    ? 'text-white'
                                    : isCompleted
                                    ? 'bg-blue-100 text-[#235cbb]'
                                    : 'bg-slate-200/90 text-slate-600'
                                }`}
                                style={isActive ? { background: 'var(--guide-color, #235cbb)' } : {}}
                              >
                                {isCompleted ? '✓' : idx + 1}
                              </span>
                              <span className="tracking-tight text-xs sm:text-sm">
                                {s.title}
                              </span>
                            </button>
                          );
                        })}
                      </nav>

                      {/* Visual step progress line */}
                      <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden mt-2.5">
                        <div
                          className="h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${((stepIndex + 1) / guide.steps.length) * 100}%`,
                            background: 'var(--guide-color, #235cbb)'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Single view with smooth slide transition */}
                  {!showAll ? (
                    <div
                      id={walkthroughId}
                      className="step-slider-container"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div
                        className="step-slider-track"
                        style={{
                          transform: `translateX(-${stepIndex * 100}%)`,
                          transitionTimingFunction: 'cubic-bezier(0.2, 0.9, 0.3, 1)'
                        }}
                      >
                        {guide.steps.map((step, idx) => {
                          const StepIcon = getStepIcon(guide.id, idx);
                          const isCurrent = idx === stepIndex;
                          return (
                            <div
                              key={idx}
                              role="tabpanel"
                              id={`step-panel-${idx}`}
                              aria-labelledby={`step-tab-${idx}`}
                              aria-hidden={!isCurrent}
                              tabIndex={isCurrent ? 0 : -1}
                              className="step-slide-item"
                            >
                              <div className="learning-step-slide-card">
                                <div className="learning-step-symbol" aria-hidden="true">
                                  <StepIcon aria-hidden="true" />
                                </div>
                                <div className="learning-step-copy">
                                  <p className="learning-step-number">
                                    {stepLabel} {idx + 1} von {guide.steps.length}
                                  </p>
                                  <h3
                                    ref={isCurrent ? stepHeadingRef : undefined}
                                    tabIndex={-1}
                                  >
                                    {step.title}
                                  </h3>
                                  <p>{step.text}</p>

                                  {step.check && (
                                    <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50/95 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 shadow-2xs">
                                      <CheckCircle2 className="w-4.5 h-4.5 text-[#235cbb] flex-shrink-0 mt-0.5" aria-hidden="true" />
                                      <div className="leading-relaxed">
                                        <strong className="text-slate-900 font-bold">Erfolgs-Check:</strong> {step.check}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Stacked list when user explicitly toggles overview */
                    <ol
                      id={walkthroughId}
                      className="learning-steps"
                      start={1}
                    >
                      {guide.steps.map((step, idx) => {
                        const StepIcon = getStepIcon(guide.id, idx);
                        return (
                          <li key={idx} value={idx + 1} className="transition-all">
                            <div className="learning-step-symbol" aria-hidden="true">
                              <StepIcon aria-hidden="true" />
                            </div>
                            <div className="learning-step-copy">
                              <p className="learning-step-number">
                                {stepLabel} {idx + 1}
                              </p>
                              <h3
                                ref={idx === 0 ? stepHeadingRef : undefined}
                                tabIndex={-1}
                              >
                                {step.title}
                              </h3>
                              <p>{step.text}</p>

                              {step.check && (
                                <div className="mt-3 p-3 rounded-xl bg-slate-50/90 border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5">
                                  <CheckCircle2 className="w-4 h-4 text-[#235cbb] flex-shrink-0 mt-0.5" aria-hidden="true" />
                                  <div className="leading-relaxed">
                                    <strong className="text-slate-900 font-bold">Erfolgs-Check:</strong> {step.check}
                                  </div>
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  )}

                  {!showAll && (
                    <div className="walkthrough-navigation flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-200">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold shadow-2xs hover:bg-slate-50 hover:text-slate-900 active:bg-slate-100 disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white transition-all cursor-pointer"
                        disabled={stepIndex === 0}
                        onClick={() => setStepIndex(s => Math.max(0, s - 1))}
                      >
                        <ArrowLeft className="w-4 h-4 text-slate-500" aria-hidden="true" />
                        <span>Zurück</span>
                      </button>

                      {stepIndex < guide.steps.length - 1 ? (
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-xs hover:brightness-95 active:brightness-90 transition-all cursor-pointer sm:ml-auto"
                          style={{
                            background: 'var(--guide-color, #235cbb)',
                            borderColor: 'var(--guide-color, #235cbb)'
                          }}
                          onClick={() => setStepIndex(s => Math.min(guide.steps.length - 1, s + 1))}
                        >
                          <span>
                            Weiter zu {stepLabel} {stepIndex + 2}
                          </span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium sm:ml-auto">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>Letzter {stepLabel} · du kannst jederzeit zurückblättern.</span>
                        </div>
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

                {/* Rating component for interactivity */}
                <GuideRatingCard guideId={guide.id} guideTitle={guide.title} />
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

            {/* Ask Jan Dennis AI about this topic */}
            {onAskAssistant && (
              <div className="my-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="/profilbild.png"
                    alt="Jan Dennis"
                    className="w-10 h-10 rounded-full border border-blue-300 object-cover bg-white flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5 font-heading tracking-wide">
                      <Sparkles className="w-4 h-4 text-[#235cbb] flex-shrink-0" />
                      <span>Frage zu diesem Thema?</span>
                    </h4>
                    <p className="text-xs text-slate-600 font-body mt-0.5">
                      Frag Jan Dennis direkt im neuen KI-Assistenten.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const title = selection.item.title;
                    const prompt = `Hallo Jan Dennis! Ich lese gerade „${title}“ und habe dazu eine Frage: `;
                    onClose();
                    onAskAssistant(prompt);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#235cbb] hover:bg-[#1b4a99] active:bg-[#153b7b] text-white rounded-xl text-xs font-semibold font-body transition-colors shadow-xs whitespace-nowrap flex-shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Jan Dennis (KI) fragen</span>
                </button>
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
