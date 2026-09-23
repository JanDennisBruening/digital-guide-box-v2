import React from 'react';
import { Info, CircleCheck, ShieldAlert } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsAssessmentViewProps {
  news: NewsItem;
  compact?: boolean;
}

export const NewsAssessmentView: React.FC<NewsAssessmentViewProps> = ({ news, compact = false }) => {
  const n = news.assessment;
  if (!n) return null;

  const actionLabel =
    n.action === 'important' ? 'Wichtig' : n.action === 'none' ? 'Nein' : 'Empfohlen';

  const ActionIcon =
    n.action === 'important' ? ShieldAlert : n.action === 'none' ? CircleCheck : Info;

  const relevanceLabel =
    n.relevance === 'yes' ? 'Ja' : n.relevance === 'no' ? 'Nein' : 'Nur wenn …';

  return (
    <dl
      className={`news-assessment${compact ? ' is-compact' : ''}`}
      aria-label="Einordnung der Nachricht"
    >
      <div className="rounded-xl">
        <dt>Für dich wichtig?</dt>
        <dd>
          <strong>
            <Info aria-hidden="true" />
            {relevanceLabel}
          </strong>
          <span>{n.context}</span>
        </dd>
      </div>

      <div data-action={n.action} className="rounded-xl">
        <dt>Musst du etwas tun?</dt>
        <dd>
          <strong>
            <ActionIcon aria-hidden="true" />
            {actionLabel}
          </strong>
          <span>{n.advice}</span>
        </dd>
      </div>
    </dl>
  );
};
