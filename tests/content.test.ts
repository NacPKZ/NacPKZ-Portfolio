import { describe, expect, it } from 'vitest';
import { projects } from '../src/data/projects';
import { copy } from '../src/i18n/copy';
import { parseRoute, routeHref } from '../src/utils/route';
describe('navigation and content contracts', () => {
  it('opens a direct bilingual case-study URL', () => { expect(parseRoute('#/en/work/consultai')).toEqual({ lang: 'en', page: 'work', id: 'consultai' }); });
  it('preserves the page when switching language', () => { const current = parseRoute('#/fr/work/olist'); expect(routeHref('en', `${current.page}/${current.id}`)).toBe('#/en/work/olist'); });
  it('has identical translation keys', () => { expect(Object.keys(copy.fr).sort()).toEqual(Object.keys(copy.en).sort()); });
  it('keeps documented projects and clearly scoped demonstrations with bilingual limits', () => { expect(projects).toHaveLength(13); expect(new Set(projects.map(p => p.id)).size).toBe(projects.length); for (const p of projects) for (const lang of ['fr', 'en'] as const) { expect(p.nature[lang].length).toBeGreaterThan(25); expect(p.limits[lang].length).toBeGreaterThan(40); expect(p.problem[lang].length).toBeGreaterThan(30); } });
  it('never exposes private Library links in the public project sources', () => { expect(projects.flatMap(p => p.sources).some(s => /chatgpt.com\/library/.test(s.url))).toBe(false); });
  it('has actionable source destinations', () => { for (const source of projects.flatMap(p => p.sources)) expect(source.url).toMatch(/^(https:\/\/github\.com\/NacPKZ\/|mailto:canpekgoz\.pro@gmail\.com)/); });
});
