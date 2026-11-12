export type Lang = 'fr' | 'en';
export type Localized = Record<Lang, string>;
export const l = (fr: string, en: string): Localized => ({ fr, en });
export type Category = 'strategy' | 'bi' | 'engineering' | 'ml';
export interface Metric { value: string; label: Localized; note?: Localized }
export interface Project {
  id: string; number: string; title: string; category: Category[]; eyebrow: Localized;
  tagline: Localized; summary: Localized; nature: Localized;
  tech: string[]; metrics: Metric[]; problem: Localized; method: Localized[];
  outcome: Localized; limits: Localized; learning: Localized;
  repo?: string; demo?: string; sources: { label: Localized; url: string }[];
  images?: { src: string; caption: Localized }[]; accent: string;
}
