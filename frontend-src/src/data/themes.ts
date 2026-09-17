import type { CSSProperties } from 'react';
import { ThemeColor, GuideCategoryGroup } from '../types';

export interface ThemeConfig {
  label: string;
  tint: string;
  color: string;
}

export const THEMES: Record<ThemeColor, ThemeConfig> = {
  gruen: { label: 'Grün', tint: '#e7f5ee', color: '#167c52' },
  blau: { label: 'Blau', tint: '#eef3fd', color: '#3566b3' },
  rot: { label: 'Rot', tint: '#fcefee', color: '#b44344' },
  tuerkis: { label: 'Türkis', tint: '#e9f5f6', color: '#257780' },
  violett: { label: 'Violett', tint: '#f1ebfb', color: '#7956a2' },
  gold: { label: 'Gold', tint: '#fbf2e5', color: '#96631d' },
  magenta: { label: 'Magenta', tint: '#f9edf6', color: '#a13683' },
  schiefer: { label: 'Schieferblau', tint: '#edf0f8', color: '#526589' }
};

export function getTheme(themeName?: string): ThemeConfig {
  if (themeName && themeName in THEMES) {
    return THEMES[themeName as ThemeColor];
  }
  return THEMES.blau;
}

export function getGuideStyles(themeName?: string): CSSProperties {
  const theme = getTheme(themeName);
  return {
    '--guide-tint': theme.tint,
    '--guide-color': theme.color
  } as CSSProperties;
}

export interface NewsCategoryConfig {
  icon: string;
  theme: ThemeColor;
}

export const NEWS_CATEGORIES: Record<string, NewsCategoryConfig> = {
  'Geräte & Technik': { icon: 'settings', theme: 'blau' },
  'Kommunikation & Mobilität': { icon: 'messages', theme: 'gruen' },
  'Digitale Verwaltung': { icon: 'folder', theme: 'violett' },
  'Sicherheit & Schutz': { icon: 'shield', theme: 'gold' },
  'Online-Banking & Einkauf': { icon: 'wallet', theme: 'tuerkis' },
  'Formulare & Anträge': { icon: 'file', theme: 'schiefer' },
  'Medien & Informationen': { icon: 'globe', theme: 'rot' },
  'KI & digitale Assistenz': { icon: 'sparkles', theme: 'magenta' },
  'Verträge & Abos': { icon: 'receipt', theme: 'violett' },
  'Lernen & Wissen': { icon: 'graduation', theme: 'blau' },
  'Vorsorge & Warnungen': { icon: 'siren', theme: 'gold' }
};

export function getCategoryConfig(category: string): NewsCategoryConfig {
  if (category in NEWS_CATEGORIES) {
    return NEWS_CATEGORIES[category];
  }
  return { icon: 'book', theme: 'schiefer' };
}

export function getNewsStyles(category: string): CSSProperties {
  const cfg = getCategoryConfig(category);
  const theme = getTheme(cfg.theme);
  return {
    '--news-color': theme.color,
    '--news-tint': theme.tint,
    '--guide-color': theme.color,
    '--guide-tint': theme.tint
  } as CSSProperties;
}

export const GUIDE_GROUPS: GuideCategoryGroup[] = [
  {
    id: 'communication',
    title: 'Kommunikation & Konten',
    description: 'Nachrichten, Kontakte und dein Google-Konto.',
    categories: ['Kommunikation', 'Konten'],
    theme: 'blau'
  },
  {
    id: 'internet',
    title: 'Internet & unterwegs',
    description: 'Webseiten, QR-Codes und Orientierung.',
    categories: ['Internet', 'Unterwegs'],
    theme: 'tuerkis'
  },
  {
    id: 'devices',
    title: 'Geräte & Einstellungen',
    description: 'WLAN, Apps und dein Smartphone.',
    categories: ['Geräte & Technik'],
    theme: 'violett'
  },
  {
    id: 'security',
    title: 'Sicherheit & Schutz',
    description: 'Updates, Passwörter und verdächtige Nachrichten.',
    categories: ['Sicherheit'],
    theme: 'gold'
  },
  {
    id: 'files',
    title: 'Fotos & Dateien',
    description: 'Bilder sichern, Dokumente scannen und Dateien finden.',
    categories: ['Fotos & Dateien'],
    theme: 'magenta'
  },
  {
    id: 'everyday',
    title: 'Alltag & Organisation',
    description: 'Termine und Weckzeiten im Blick behalten.',
    categories: ['Organisation'],
    theme: 'schiefer'
  }
];

export const FOUNDATIONS = [
  { id: 'webbrowser', title: 'Was ist ein Webbrowser?', description: 'Webseiten öffnen und den Browser erkennen.' },
  { id: 'app-grundlagen', title: 'Was ist eine App?', description: 'Kleine Programme, die dir im Alltag helfen.' },
  { id: 'betriebssystem', title: 'Was ist ein Betriebssystem?', description: 'Die Grundlage, auf der dein Gerät arbeitet.' },
  { id: 'ios-android', title: 'Was ist der Unterschied zwischen iOS und Android?', description: 'Zwei Smartphone-Systeme einfach unterscheiden.' },
  { id: 'internet-grundlagen', title: 'Wie funktioniert das Internet?', description: 'Wie dein Gerät mit der Welt verbunden ist.' },
  { id: 'benutzerkonto', title: 'Was ist ein Benutzerkonto?', description: 'Deinen persönlichen Zugang zu einem Dienst verstehen.' }
];

export const FREQUENT_GUIDES = [
  { id: 'whatsapp', title: 'Eine Nachricht schreiben', description: 'Mit WhatsApp in Kontakt bleiben.' },
  { id: 'wlan', title: 'Mit WLAN verbinden', description: 'Dein Gerät zu Hause ins Internet bringen.' },
  { id: 'passwoerter', title: 'Passwörter sicher nutzen', description: 'Deine Zugänge besser schützen.' }
];
