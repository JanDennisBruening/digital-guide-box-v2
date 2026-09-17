import { NewsItem } from '../types';
import { GERAETE_NEWS } from './news/geraete';
import { KOMMUNIKATION_NEWS } from './news/kommunikation';
import { VERWALTUNG_NEWS } from './news/verwaltung';
import { SICHERHEIT_NEWS } from './news/sicherheit';
import { BANKING_NEWS } from './news/banking';
import { FORMULARE_NEWS } from './news/formulare';
import { MEDIEN_NEWS } from './news/medien';
import { KI_NEWS } from './news/ki';
import { VERTRAEGE_NEWS } from './news/vertraege';
import { LERNEN_NEWS } from './news/lernen';
import { VORSORGE_NEWS } from './news/vorsorge';
import { GESUNDHEIT_NEWS } from './news/gesundheit';

export {
  GERAETE_NEWS,
  KOMMUNIKATION_NEWS,
  VERWALTUNG_NEWS,
  SICHERHEIT_NEWS,
  BANKING_NEWS,
  FORMULARE_NEWS,
  MEDIEN_NEWS,
  KI_NEWS,
  VERTRAEGE_NEWS,
  LERNEN_NEWS,
  VORSORGE_NEWS,
  GESUNDHEIT_NEWS
};

// All 60 news articles (5 per category across all 12 thematic areas)
// Sorted by date descending for the freshest information flow
export const ALL_NEWS: NewsItem[] = [
  ...GERAETE_NEWS,
  ...KOMMUNIKATION_NEWS,
  ...VERWALTUNG_NEWS,
  ...SICHERHEIT_NEWS,
  ...BANKING_NEWS,
  ...FORMULARE_NEWS,
  ...MEDIEN_NEWS,
  ...KI_NEWS,
  ...VERTRAEGE_NEWS,
  ...LERNEN_NEWS,
  ...VORSORGE_NEWS,
  ...GESUNDHEIT_NEWS
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
