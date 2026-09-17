import React, { useState } from 'react';
import {
  ChevronDown,
  ArrowUpRight,
  ArrowDown,
  Clock3,
  MessageSquare,
  Compass,
  Smartphone,
  ShieldCheck,
  FolderArchive,
  CalendarCheck2,
  LucideIcon
} from 'lucide-react';
import { Guide } from '../types';
import { GUIDE_GROUPS, FOUNDATIONS, FREQUENT_GUIDES, getGuideStyles } from '../data/themes';
import { GuideIcon } from './GuideIcon';

const GROUP_ICONS: Record<string, LucideIcon> = {
  communication: MessageSquare,
  internet: Compass,
  devices: Smartphone,
  security: ShieldCheck,
  files: FolderArchive,
  everyday: CalendarCheck2
};

interface GuidesSectionProps {
  guides: Guide[];
  onOpenGuide: (guide: Guide) => void;
}

export const GuidesSection: React.FC<GuidesSectionProps> = ({ guides, onOpenGuide }) => {
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>('communication');

  const toggleGroup = (id: string) => {
    setExpandedGroupId(prev => (prev === id ? null : id));
  };

  const foundationsList = FOUNDATIONS.flatMap(item => {
    const guide = guides.find(g => g.id === item.id);
    return guide ? [{ ...item, guide }] : [];
  });

  const frequentList = FREQUENT_GUIDES.flatMap(item => {
    const guide = guides.find(g => g.id === item.id);
    return guide ? [{ ...item, guide }] : [];
  });

  const groupedData = GUIDE_GROUPS.map(group => {
    const groupGuides = guides.filter(g => group.categories.includes(g.category));
    return {
      ...group,
      guides: groupGuides
    };
  });

  return (
    <div
      className="guide-scroller"
      role="region"
      aria-label="Grundlagen und alle Anleitungen"
      tabIndex={0}
    >
      {/* 1. Die wichtigsten Grundlagen */}
      {foundationsList.length > 0 && (
        <section className="guide-foundations" aria-labelledby="guide-foundations-title">
          <header className="guide-foundations-heading">
            <h2 id="guide-foundations-title">Die wichtigsten Grundlagen</h2>
            <p>
              Hier findest du Antworten auf grundlegende Fragen rund um Smartphone, Computer und Internet – einfach und verständlich erklärt.
            </p>
          </header>
          <ul className="guide-foundations-grid">
            {foundationsList.map(({ id, title, description, guide }) => (
              <li key={id}>
                <button
                  type="button"
                  className="guide-foundation"
                  aria-haspopup="dialog"
                  style={getGuideStyles(guide.theme)}
                  onClick={() => onOpenGuide(guide)}
                >
                  <GuideIcon guide={guide} />
                  <span className="guide-foundation-copy">
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </span>
                  <ArrowUpRight className="guide-foundation-arrow" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 2. Häufig gebraucht */}
      {frequentList.length > 0 && (
        <section className="guide-everyday" aria-labelledby="guide-everyday-title">
          <header className="guide-collection-heading">
            <h2 id="guide-everyday-title">Häufig gebraucht</h2>
            <p>Eine Auswahl für typische Fragen im Alltag.</p>
          </header>
          <ul className="guide-foundations-grid">
            {frequentList.map(({ id, title, description, guide }) => (
              <li key={id}>
                <button
                  type="button"
                  className="guide-foundation"
                  aria-haspopup="dialog"
                  style={getGuideStyles(guide.theme)}
                  onClick={() => onOpenGuide(guide)}
                >
                  <GuideIcon guide={guide} />
                  <span className="guide-foundation-copy">
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </span>
                  <ArrowUpRight className="guide-foundation-arrow" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 3. Alle Anleitungen */}
      <section className="guide-collection" aria-labelledby="guide-collection-title">
        <header className="guide-collection-heading">
          <h2 id="guide-collection-title">Alle Anleitungen</h2>
          <p>Wähle ein Thema und klappe die passenden Anleitungen für deinen digitalen Alltag auf.</p>
        </header>

        <div className="guide-groups">
          {groupedData.map(group => {
            const isOpen = expandedGroupId === group.id;
            const GroupIconComponent = GROUP_ICONS[group.id] || Compass;
            const isScrollable = group.guides.length > 6;
            return (
              <div
                key={group.id}
                className="guide-group"
                data-state={isOpen ? 'open' : 'closed'}
                style={getGuideStyles(group.theme)}
              >
                <button
                  type="button"
                  className="guide-group-toggle"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                >
                  <span className="guide-group-icon" aria-hidden="true">
                    <GroupIconComponent />
                  </span>
                  <span className="guide-group-label">
                    <strong>{group.title}</strong>
                    <span>{group.description}</span>
                    <small>
                      {group.guides.length} {group.guides.length === 1 ? 'Anleitung' : 'Anleitungen'}
                    </small>
                  </span>
                  <ChevronDown aria-hidden="true" />
                </button>

                {isOpen && (
                  <div className="guide-group-content">
                    <div
                      className={`guide-category-window${isScrollable ? ' is-scrollable' : ''}`}
                      role={isScrollable ? 'region' : undefined}
                      aria-label={isScrollable ? `${group.title}: alle ${group.guides.length} Anleitungen` : undefined}
                      aria-describedby={isScrollable ? `guide-hint-${group.id}` : undefined}
                      tabIndex={isScrollable ? 0 : undefined}
                    >
                      <div className="guide-grid" id={`guides-${group.id}`}>
                        {group.guides.map(guide => (
                          <button
                            key={guide.id}
                            type="button"
                            className="guide-card"
                            aria-haspopup="dialog"
                            style={getGuideStyles(guide.theme)}
                            onClick={() => onOpenGuide(guide)}
                          >
                            <div className="guide-card-heading">
                              <GuideIcon guide={guide} />
                              <h4>{guide.title}</h4>
                            </div>
                            <p className="guide-card-summary">{guide.subtitle}</p>
                            <span className="guide-meta">
                              <span>Stand {guide.updatedAt}</span>
                              <span className="guide-card-action">
                                <span className="guide-read-time">
                                  <Clock3 aria-hidden="true" />
                                  {guide.minutes} Min.
                                </span>
                                <ArrowUpRight className="guide-arrow" aria-hidden="true" />
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="guide-group-footer">
                      <span>{group.guides.length} Anleitungen</span>
                      {isScrollable && (
                        <span id={`guide-hint-${group.id}`} className="guide-scroll-note">
                          <ArrowDown aria-hidden="true" />
                          Weitere Anleitungen hier im Feld scrollen
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="guide-reading-note">
          Direkt lesen oder als einseitige PDF öffnen.
        </p>
      </section>
    </div>
  );
};
