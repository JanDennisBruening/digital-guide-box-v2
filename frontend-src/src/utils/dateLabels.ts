import React from 'react';
import {
  AlertTriangle,
  Sparkles,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

export interface DateLabelStyle {
  text: string;
  type: 'warning' | 'update' | 'tip' | 'steps' | 'guide' | 'default';
  pillClass: string;
  Icon: LucideIcon;
}

export function getDateLabelStyle(dateLabel?: string): DateLabelStyle {
  const text = dateLabel?.trim() || 'Beitrag';
  const lower = text.toLowerCase();

  if (lower.includes('warnung')) {
    return {
      text,
      type: 'warning',
      pillClass: 'news-type-pill news-type-pill-warning',
      Icon: AlertTriangle
    };
  }
  if (lower.includes('box-update') || lower.includes('update')) {
    return {
      text,
      type: 'update',
      pillClass: 'news-type-pill news-type-pill-update',
      Icon: Sparkles
    };
  }
  if (lower.includes('praxistipp') || lower.includes('alltagstipp') || lower.includes('tipp')) {
    return {
      text,
      type: 'tip',
      pillClass: 'news-type-pill news-type-pill-tip',
      Icon: Lightbulb
    };
  }
  if (lower.includes('schritt')) {
    return {
      text,
      type: 'steps',
      pillClass: 'news-type-pill news-type-pill-steps',
      Icon: CheckCircle2
    };
  }
  if (lower.includes('ratgeber')) {
    return {
      text,
      type: 'guide',
      pillClass: 'news-type-pill news-type-pill-guide',
      Icon: BookOpen
    };
  }
  return {
    text,
    type: 'default',
    pillClass: 'news-type-pill news-type-pill-default',
    Icon: BookOpen
  };
}
