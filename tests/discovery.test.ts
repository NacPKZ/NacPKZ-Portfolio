import { describe,it,expect } from 'vitest';
import { matchesSearch } from '../src/utils/search';
import { resolveSiteURL } from '../src/utils/siteUrl';
describe('project discovery',()=>{
 it('matches accents and case without requiring their exact typing',()=>{expect(matchesSearch('Qualité des données, stratégie et SQL','qualite STRATEGIE')).toBe(true);});
 it('requires all terms and accepts an empty query',()=>{expect(matchesSearch('Power BI DAX','Power SQL')).toBe(false);expect(matchesSearch('Power BI DAX','  ')).toBe(true);});
});
describe('independent deployment metadata',()=>{
 it('does not invent a public domain before deployment',()=>{expect(resolveSiteURL({})).toBe(null);});
 it('retains the GitHub Pages base path',()=>{expect(resolveSiteURL({PUBLIC_SITE_URL:'https://nacpkz.github.io/NacPKZ-Portfolio'})).toBe('https://nacpkz.github.io/NacPKZ-Portfolio/');});
 it('prefers the stable production domain over a preview hostname',()=>{expect(resolveSiteURL({VERCEL_PROJECT_PRODUCTION_URL:'portfolio.vercel.app',VERCEL_URL:'preview.vercel.app'})).toBe('https://portfolio.vercel.app/');});
 it('rejects credentials and non-HTTPS public domains',()=>{expect(()=>resolveSiteURL({PUBLIC_SITE_URL:'https://user:pass@example.com/'})).toThrow();expect(()=>resolveSiteURL({PUBLIC_SITE_URL:'http://example.com/'})).toThrow();});
});
