export type ThemeColor = 'gruen' | 'blau' | 'rot' | 'tuerkis' | 'violett' | 'gold' | 'magenta' | 'schiefer';

export interface GuideStep {
  title: string;
  text: string;
  shortText?: string;
  check?: string;
  icon?: string;
}

export interface Guide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  theme: ThemeColor;
  minutes: number;
  updatedAt: string;
  scope: string;
  level?: string;
  learning?: {
    kind?: 'explain' | 'step' | 'practice' | string;
    why: string;
    preparation: string[];
    result?: string;
    ifDifferent?: string;
    ifStuck?: string;
  };
  tip?: string;
  steps: GuideStep[];
  sources: Array<{ title: string; url: string }>;
}

export interface NewsAssessment {
  relevance: 'yes' | 'no' | 'conditional';
  context: string;
  action: 'none' | 'recommended' | 'important';
  advice: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  topics?: string[];
  icon?: string;
  summary?: string;
  date: string;
  dateLabel?: string;
  relevance: string;
  assessment?: NewsAssessment;
  takeaway: string;
  paragraphTitles: string[];
  paragraphs: string[];
  reading?: {
    audience?: string;
    actionIndex?: number;
    actions: string[];
  };
  tip: string;
  checkedAt?: string;
  guideIds?: string[];
  sources: Array<{ title: string; url: string }>;
}

export interface AppearanceSettings {
  font: 'standard' | 'large' | 'larger';
  contrast: boolean;
  background: 'brand' | 'blue' | 'calm';
}

export type ActiveTab = 'news' | 'guides';

export interface SelectionState {
  kind: 'guide' | 'news';
  item: Guide | NewsItem;
}

export interface GuideCategoryGroup {
  id: string;
  title: string;
  description: string;
  categories: string[];
  theme: ThemeColor;
  guides?: Guide[];
}
