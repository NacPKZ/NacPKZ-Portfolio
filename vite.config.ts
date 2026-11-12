import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolveSiteURL } from './src/utils/siteUrl';

export default defineConfig({
  plugins: [react(), {
    name: 'portfolio-metadata',
    transformIndexHtml(html) {
      const origin=resolveSiteURL(process.env);
      if(!origin) return html.replace(/\s*<meta property="og:image"[^>]*>/,'');
      const person = { '@context': 'https://schema.org', '@type': 'Person', name: 'Can Pekgoz', url: origin, email: 'canpekgoz.pro@gmail.com', sameAs: ['https://github.com/NacPKZ', 'https://www.linkedin.com/in/can-pekgoz/'], affiliation: { '@type': 'EducationalOrganization', name: 'Université Sorbonne Paris Nord' } };
      return html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${origin}assets/share.png$2`).replace('</head>', `<link rel="canonical" href="${origin}" /><meta property="og:url" content="${origin}" /><script type="application/ld+json">${JSON.stringify(person)}</script></head>`);
    },
    generateBundle() {
      const origin=resolveSiteURL(process.env);
      this.emitFile({ type:'asset',fileName:'robots.txt',source:origin?`User-agent: *\nAllow: /\nSitemap: ${origin}sitemap.xml\n`:'User-agent: *\nDisallow: /\n' });
      if(origin)this.emitFile({type:'asset',fileName:'sitemap.xml',source:`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}</loc></url></urlset>`});
    },
  }],
  base: process.env.PAGES_BASE || '/',
  server: { allowedHosts: true },
  build: { target: 'es2022', sourcemap: false },
});
