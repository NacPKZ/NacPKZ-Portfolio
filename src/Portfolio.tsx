import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { identity } from './data/identity';
import { portfolioProjects } from './data/portfolio';
import type { PortfolioProject } from './data/portfolio';
import { experiences } from './data/profile';
import type { Lang } from './data/types';
import { asset, metricDisplay, parseRoute, routeHref } from './utils/route';
import { copy } from './i18n/copy';

const cvFile = 'CV_Can_Pekgoz.pdf';
const linkedIn = 'https://www.linkedin.com/in/can-pekgoz/';
const github = 'https://github.com/NacPKZ';
const t = (lang: Lang, fr: string, en: string) => lang === 'fr' ? fr : en;
const arrow = <span aria-hidden="true">↗</span>;
const locationText = {
  fr: 'Stage de fin d’études · Mars 2027 · 6 mois · Île-de-France',
  en: 'Six-month internship · March 2027 · Île-de-France',
};

function readPreference(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function savePreference(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Browser storage can be disabled. */ }
}

function Cv({ lang, className = '' }: { lang: Lang; className?: string }) {
  return <a className={className} href={asset('assets/' + cvFile)} download={cvFile}>
    {copy[lang].cv} <span aria-hidden="true">↓</span>
  </a>;
}

function Cover({ entry, eager = false }: { entry: PortfolioProject; eager?: boolean }) {
  return <img src={asset(`assets/projects/${entry.cover}.webp`)} alt="" loading={eager ? 'eager' : 'lazy'} decoding={eager ? 'auto' : 'async'} />;
}

function ProjectCard({ entry, lang, featured, heading: Heading }: { entry: PortfolioProject; lang: Lang; featured: boolean; heading: 'h2' | 'h3' }) {
  return <a className={`project-card${featured ? ' lead' : ''}`} href={routeHref(lang, 'work/' + entry.id)}>
    <div className="project-image"><Cover entry={entry} eager={featured} /></div>
    <div className="project-copy">
      <p className="project-area">{entry.area[lang]}</p>
      <Heading>{entry.project.title}</Heading>
      <p>{entry.description[lang]}</p>
      <span className="project-fact">{entry.fact[lang]}</span>
      <span className="project-arrow" aria-hidden="true">↗</span>
    </div>
  </a>;
}

function ProjectGrid({ lang, heading }: { lang: Lang; heading: 'h2' | 'h3' }) {
  return <div className="project-grid">
    {portfolioProjects.map((entry, index) => <ProjectCard key={entry.id} lang={lang} entry={entry} featured={index === 0} heading={heading} />)}
  </div>;
}

function Home({ lang }: { lang: Lang }) {
  return <>
    <section className="profile-hero">
      <div className="wrap hero-grid">
        <div>
          <p className="hero-name">Can Pekgoz</p>
          <h1>{t(lang, 'Data, BI et', 'Data, BI and')} <span>{t(lang, 'transformation IA', 'AI transformation')}</span></h1>
          <p className="hero-intro">{t(lang, 'J’ai commencé par l’économie, puis je me suis tourné vers la data. Dans mes projets, je travaille sur la qualité des données, la mesure de la performance et la place que l’IA peut prendre dans le travail des équipes.', 'I started in economics before moving into data. My projects explore data quality, performance measurement and where AI can help teams in their work.')}</p>
          <div className="actions">
            <a className="button primary" href={routeHref(lang, 'work')}>{t(lang, 'Voir mes projets', 'View my projects')} {arrow}</a>
            <Cv lang={lang} className="button ghost" />
          </div>
        </div>
        <aside className="profile-summary" aria-label={t(lang, 'Formation et disponibilité', 'Education and availability')}>
          <div><p className="summary-label">{t(lang, 'Formation', 'Education')}</p><p className="summary-main">Master 2 BIDABI</p><p>Université Sorbonne Paris Nord</p></div>
          <div><p className="summary-label">{t(lang, 'Recherche de stage', 'Internship search')}</p><p className="summary-main">{t(lang, 'À partir de mars 2027', 'From March 2027')}</p><p>{t(lang, '6 mois · Île-de-France', '6 months · Île-de-France')}</p></div>
        </aside>
      </div>
    </section>
    <section className="wrap front-projects section" aria-labelledby="home-projects">
      <div className="section-heading"><h2 id="home-projects">{t(lang, 'Mes projets', 'My projects')}</h2><a href={routeHref(lang, 'work')}>{t(lang, 'Voir les études de cas', 'Browse the case studies')} {arrow}</a></div>
      <ProjectGrid lang={lang} heading="h3" />
    </section>
  </>;
}

function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return <header className="page-head"><h1>{title}</h1>{children}</header>;
}

function Work({ lang }: { lang: Lang }) {
  return <section className="wrap section">
    <PageHeader title={t(lang, 'Projets', 'Projects')}><p>{t(lang, 'Pour chaque projet, je présente ma démarche, les résultats et les limites de l’analyse.', 'For each project, I explain my approach, what I found and the limits of the analysis.')}</p></PageHeader>
    <ProjectGrid lang={lang} heading="h2" />
  </section>;
}

function Case({ entry, lang }: { entry: PortfolioProject; lang: Lang }) {
  const {project} = entry;
  return <article className="wrap section case">
    <a className="back-link" href={routeHref(lang,'work')}>← {copy[lang].back}</a>
    <PageHeader title={project.title}><p>{entry.description[lang]}</p></PageHeader>
    <div className="actions case-actions">
      {entry.id === 'consultai' && project.demo && <a className="button primary" href={project.demo}>{t(lang, 'Ouvrir ConsultAI 360 sur Streamlit', 'Open ConsultAI 360 on Streamlit')} {arrow}</a>}
      {project.repo && <a className="button ghost" href={project.repo}>GitHub {arrow}</a>}
    </div>
    <dl className="facts">{project.metrics.map(metric => <div key={metric.label.en}>
      <dt>{metric.label[lang]}</dt><dd>{metricDisplay(metric.value, lang)}</dd>
    </div>)}</dl>
    <figure className="case-figure">
      <img src={asset(`assets/projects/${entry.cover}.webp`)} alt={project.images?.[0]?.caption[lang] ?? project.title} />
      <figcaption>{project.images?.[0]?.caption[lang]}</figcaption>
    </figure>
    <div className="case-story">
      <section><h2>{t(lang, 'La question de départ', 'The starting question')}</h2><p>{project.problem[lang]}</p><p className="muted">{project.nature[lang]}</p></section>
      <section><h2>{t(lang, 'Ce que j’ai fait', 'What I did')}</h2><p>{entry.role[lang]}</p><ol>{project.method.map(step => <li key={step.en}>{step[lang]}</li>)}</ol></section>
      <section><h2>{t(lang, 'Résultats et limites', 'Results and limitations')}</h2><p>{project.outcome[lang]}</p><p>{project.limits[lang]}</p></section>
      {project.id === 'consultai' && <section><h2>{t(lang, 'La suite que je propose', 'My proposed next step')}</h2>
        <p>{t(lang, 'Tester des alertes sur un périmètre logistique limité, comparer leur performance à une règle simple et vérifier avec les équipes si elles aident vraiment à prendre une décision.', 'Test alerts on a limited logistics workflow, compare them with a simple rule and check with the teams whether they help them make decisions.')}</p>
      </section>}
    </div>
    {!!project.images && project.images.length > 1 && <details className="project-gallery">
      <summary>{t(lang, 'Autres captures', 'More screenshots')}</summary>
      <div>{project.images.slice(1).map(({src, caption}) => <figure key={src}><a href={asset(`assets/projects/${src}.webp`)}><img src={asset(`assets/projects/${src}.webp`)} alt={caption[lang]} loading="lazy" /></a><figcaption>{caption[lang]}</figcaption></figure>)}</div>
    </details>}
    <div className="source-links">{project.sources.map(source => <a key={source.url} href={source.url}>{source.label[lang]} {arrow}</a>)}</div>
  </article>;
}

function About({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <section className="wrap section">
    <PageHeader title={t(lang, 'Mon parcours', 'About me')}><p>{t(lang, 'Mes études en économie et mes expériences en comptabilité et en recouvrement m’ont appris à regarder de près les chiffres qu’on utilise pour décider. C’est ce que je poursuis aujourd’hui en Master BIDABI.', 'Studying economics and working in accounting and collections taught me to look closely at the figures people use to make decisions. I’m continuing that work in my BIDABI master’s programme.')}</p></PageHeader>
    <div className="about-grid">
      <section className="timeline"><h2>{t(lang, 'Formation', 'Education')}</h2>
        <article><time>2025–2027</time><h3>{c.degree}</h3><p>{c.degreeTrack}</p><p>Université Sorbonne Paris Nord</p></article>
        <article><time>2021–2025</time><h3>{t(lang, 'Licence Économie et gestion', 'Bachelor’s in Economics and Management')}</h3><p>Université Sorbonne Paris Nord</p></article>
      </section>
      <section className="timeline"><h2>{t(lang, 'Expériences', 'Experience')}</h2>
        {experiences.map(exp => <article key={exp.company}><p className="time">{exp.date[lang]}</p><h3>{exp.role[lang]} · {exp.company}</h3><p>{exp.desc[lang]}</p></article>)}
      </section>
      <section className="timeline"><h2>{t(lang, 'Outils et méthodes', 'Tools and methods')}</h2>
        {portfolioProjects.map(entry => <article key={entry.id}><h3><a href={routeHref(lang, 'work/' + entry.id)}>{entry.project.title}</a></h3><p>{entry.project.tech.slice(0,4).join(' · ')}</p></article>)}
      </section>
      <section className="timeline"><h2>{t(lang, 'En dehors des études', 'Outside my studies')}</h2>
        <p>{t(lang, 'Je m’intéresse au cinéma, aux séries, aux documentaires et à la langue et à la culture kurdes.', 'I’m interested in film, series, documentaries, and Kurdish language and culture.')}</p>
        <Cv lang={lang} className="button ghost" />
      </section>
    </div>
  </section>;
}

function Contact({ lang }: { lang: Lang }) {
  return <section className="wrap section">
    <PageHeader title={t(lang, 'Me contacter', 'Contact me')}><p>{t(lang, 'Je cherche un stage de six mois dès mars 2027 en Île-de-France. Je suis aussi disponible pour échanger sur un projet ou répondre à une question sur ma démarche.', 'I’m looking for a six-month internship in Île-de-France starting in March 2027. Feel free to get in touch about a project or how I approached it.')}</p></PageHeader>
    <div className="contact-links">
      <a className="button primary email-link" href={`mailto:${identity.email}`}>{identity.email} {arrow}</a>
      <a className="button ghost" href={linkedIn}>LinkedIn {arrow}</a>
      <a className="button ghost" href={github}>GitHub {arrow}</a>
      <Cv lang={lang} className="button ghost" />
    </div>
  </section>;
}

export default function Portfolio() {
  const [route, setRoute] = useState(() => parseRoute(location.hash || (readPreference('portfolio-language') === 'en' ? '#/en/' : '')));
  const [dark, setDark] = useState(() => readPreference('portfolio-theme') === 'dark');
  const navigated = useRef(false);
  const {lang, page, id} = route;
  const entry = portfolioProjects.find(item => item.id === id);
  const navigation = [
    { to: '', label: copy[lang].home },
    { to: 'work', label: copy[lang].work },
    { to: 'about', label: copy[lang].about },
    { to: 'contact', label: copy[lang].contact },
  ];
  const path = page === 'home' ? '' : page + (id ? '/' + id : '');
  const title = entry?.project.title ?? navigation.find(item => item.to === page)?.label ?? 'Data, BI & IA';

  useEffect(() => {
    const change = () => { navigated.current = true; setRoute(parseRoute(location.hash)); };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${title} | Can Pekgoz`;
    savePreference('portfolio-language', lang);
    window.scrollTo(0, 0);
    if (navigated.current) document.getElementById('main')?.focus({ preventScroll: true });
  }, [lang, path, title]);

  useEffect(() => {
    document.documentElement.dataset.appearance = dark ? 'dark' : 'light';
    savePreference('portfolio-theme', dark ? 'dark' : 'light');
  }, [dark]);

  let content;
  if (page === 'home') content = <Home lang={lang} />;
  else if (page === 'work' && entry) content = <Case entry={entry} lang={lang} />;
  else if (page === 'about' || page === 'recruiter') content = <About lang={lang} />;
  else if (page === 'contact') content = <Contact lang={lang} />;
  else content = <Work lang={lang} />;
  return <>
    <a className="skip" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>{copy[lang].skip}</a>
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="wordmark" href={routeHref(lang)}>Can Pekgoz</a>
        <nav aria-label={t(lang,'Navigation principale','Main navigation')}>
          {navigation.map(({to,label}) => <a key={to} href={routeHref(lang,to)} aria-current={(to || 'home') === page ? 'page' : undefined}>{label}</a>)}
        </nav>
        <div className="controls">
          <a href={routeHref(lang === 'fr' ? 'en' : 'fr', path)} aria-label={copy[lang].language}>{lang === 'fr' ? 'EN' : 'FR'}</a>
          <button onClick={() => setDark(value => !value)} aria-pressed={dark} aria-label={t(lang,'Thème sombre','Dark theme')}>
            <span aria-hidden="true">{dark ? '☀' : '◐'}</span>
          </button>
        </div>
      </div>
    </header>
    <main id="main" tabIndex={-1} key={lang + path}>{content}</main>
    <footer className="wrap site-footer">
      <div><strong>Can Pekgoz</strong><p>{locationText[lang]}</p></div>
      <nav aria-label={t(lang, 'Liens utiles', 'Useful links')}><a href={routeHref(lang,'contact')}>{copy[lang].contact}</a><a href={linkedIn}>LinkedIn</a><a href={github}>GitHub</a></nav>
    </footer>
  </>;
}
