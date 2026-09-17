export type ThemeColor = 'gruen' | 'blau' | 'rot' | 'tuerkis' | 'violett' | 'gold' | 'magenta' | 'schiefer';

export interface GuideStep {
  title: string;
  text: string;
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
  learning?: {
    kind?: 'explain' | 'step';
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
  date: string;
  dateLabel?: string;
  relevance: string;
  assessment?: NewsAssessment;
  takeaway: string;
  paragraphTitles: string[];
  paragraphs: string[];
  reading?: {
    audience: string;
    actions: string[];
  };
  tip: string;
  checkedAt: string;
  sources: Array<{ title: string; url: string }>;
}

export interface AppearanceSettings {
  font: 'standard' | 'large' | 'larger';
  contrast: boolean;
  background: 'brand' | 'blue' | 'calm';
}

export type ActiveTab = 'news' | 'guides' | 'assistant';

export type ChatModel = 'gemini-3.5-flash' | 'gemini-3.1-pro-preview' | 'gemini-3.1-flash-lite';

export type ChatTaskType = 'general' | 'complex' | 'fast';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
  error?: boolean;
}

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
