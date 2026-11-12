import type { Lang } from '../data/types';
export interface Route { lang: Lang; page: string; id?: string }
export function parseRoute(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const lang: Lang = parts[0] === 'en' ? 'en' : 'fr';
  if (parts[0] === 'fr' || parts[0] === 'en') parts.shift();
  if(parts[0]==='lab'||(parts[0]==='work'&&['washlab','detective','atelier'].includes(parts[1])))return {lang,page:'work',id:undefined};
  return { lang, page: parts[0] || 'home', id: parts[1] };
}
export function routeHref(lang: Lang, path = '') { return `#/${lang}/${path}`; }
export function asset(path: string) { return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`; }
export function metricDisplay(value: string, lang: Lang) {
  if (lang === 'fr') return value;
  const values: Record<string, string> = { '4,1 M': '4.1M', '7 043': '7,043', '26,54 %': '26.54%', '99 441': '99,441', '12,50 j': '12.50 days', '6,77 %': '6.77%', '114 000': '114,000' };
  return values[value] || value;
}
