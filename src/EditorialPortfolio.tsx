import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { featuredProjects, projectCovers, projectRoles } from './data/editorial';
import { experiences } from './data/profile';
import { identity } from './data/identity';
import type { Lang, Project } from './data/types';
import { asset, metricDisplay, parseRoute, routeHref } from './utils/route';
import { copy } from './i18n/copy';
import { AppContext } from './utils/context';

const Sherlock = lazy(() => import('./components/games/SherlockGame'));
const Memory = lazy(() => import('./components/games/MemoryGame'));

const storage = {
  get(key: string) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key: string, value: string) { try { localStorage.setItem(key, value); } catch { /* Storage may be unavailable. */ } },
};

const cv = 'assets/CV_Can_Pekgoz.pdf';
const github = 'https://github.com/NacPKZ';
const linkedin = 'https://www.linkedin.com/in/can-pekgoz/';
const tr = (lang: Lang, fr: string, en: string) => lang === 'fr' ? fr : en;

function CvLink({ lang, className }: { lang: Lang; className?: string }) {
  return <a className={className} href={asset(cv)} download="CV_Can_Pekgoz.pdf">{copy[lang].cv} <span aria-hidden="true">↓</span></a>;
}

function Cover({ project, lang, eager = false }: { project: Project; lang: Lang; eager?: boolean }) {
  return <img src={asset(`assets/projects/${projectCovers[project.id]}.webp`)} alt={`${tr(lang, 'Capture du projet', 'Project screenshot')} ${project.title}`} loading={eager ? 'eager' : 'lazy'} />;
}

function Home({ lang }: { lang: Lang }) {
  const project = featuredProjects[0];
  return <div className="ed-home">
    <div className="ed-hero">
      <div className="ed-hero-copy">
        <p className="ed-kicker">{tr(lang, 'ÉCONOMIE · DATA · TRANSFORMATION IA', 'ECONOMICS · DATA · AI TRANSFORMATION')}</p>
        <h1>Can <em>Pekgoz</em></h1>
        <p className="ed-deck">Data &amp; Business Analytics</p>
        <p className="ed-intro">{tr(lang, 'J’ai étudié l’économie pour comprendre les décisions des entreprises. Aujourd’hui, j’utilise la data pour éclairer ces décisions et j’explore les usages de l’IA qui peuvent vraiment aider les équipes.', 'I studied economics to understand business decisions. Today, I use data to inform those decisions and explore where AI can help teams.')}</p>
        <div className="ed-actions"><a className="ed-button" href={routeHref(lang, 'work')}>{tr(lang, 'Voir mes projets', 'View my projects')} <span aria-hidden="true">↗</span></a><CvLink lang={lang} className="ed-button outline" /></div>
        <p className="ed-available"><i />{tr(lang, 'Recherche de stage · Mars 2027 · 6 mois · Île-de-France', 'Seeking a six-month internship · March 2027 · Île-de-France')}</p>
      </div>
      <a href={routeHref(lang, 'work/consultai')} className="ed-preview">
        <div className="ed-preview-image"><Cover project={project} lang={lang} eager /></div>
        <div className="ed-preview-caption"><div><span>{tr(lang, 'Projet à la une', 'Featured project')}</span><strong>ConsultAI 360</strong></div><b aria-hidden="true">↗</b></div>
      </a>
    </div>
    <div className="ed-home-bottom"><span>{tr(lang, 'Master 2 BIDABI', 'BIDABI master’s student')}</span><span>Université Sorbonne Paris Nord</span><span>Paris, France</span></div>
  </div>;
}

function OptionalGame({ lang, kind }: { lang: Lang; kind: 'sherlock' | 'memory' }) {
  const [open, setOpen] = useState(false);
  const Game = kind === 'sherlock' ? Sherlock : Memory;
  const label = kind === 'sherlock' ? tr(lang, 'Un duel avec Sherlock', 'A round with Sherlock') : tr(lang, 'Le jeu de mémoire de Daenerys', 'Daenerys’s memory game');
  return <details className="ed-details ed-game" onToggle={event=>setOpen(event.currentTarget.open)}>
    <summary>{label}</summary>
    {open && <Suspense fallback={<p role="status">{copy[lang].loading}</p>}><Game /></Suspense>}
  </details>;
}

function ProjectList({ lang }: { lang: Lang }) {
  return <section className="ed-section">
    <PageHeading title={tr(lang, 'Projets', 'Projects')} text={tr(lang, 'Quatre études de cas, de la préparation des données à la décision métier.', 'Four case studies spanning data preparation and business decisions.')} />
    <div className="ed-project-list">
      {featuredProjects.map(project => <a className="ed-project-card" key={project.id} href={routeHref(lang, 'work/' + project.id)}>
        <div className="ed-project-image"><Cover project={project} lang={lang} /></div>
        <div className="ed-project-copy"><p className="ed-kicker">{project.eyebrow[lang]}</p><h2>{project.title}</h2><p>{project.tagline[lang]}</p><span className="ed-link">{copy[lang].caseStudy} <span aria-hidden="true">↗</span></span></div>
      </a>)}
    </div>
    <OptionalGame lang={lang} kind="sherlock" />
  </section>;
}

function PageHeading({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return <header className="ed-page-heading">{children}<h1>{title}</h1><p>{text}</p></header>;
}

function Case({ project, lang }: { project: Project; lang: Lang }) {
  const c = copy[lang];
  const role = projectRoles[project.id as keyof typeof projectRoles];
  let metrics = project.metrics;
  if(project.id === 'novatel') metrics = [metrics[0], { value: '1 869', label: {fr:'départs observés', en:'observed departures'} }, metrics[1]];
  return <article className="ed-section ed-case">
    <PageHeading title={project.title} text={project.summary[lang]}><a className="ed-link" href={routeHref(lang, 'work')}>← {c.back}</a><p className="ed-kicker">{project.eyebrow[lang]}</p></PageHeading>
    <div className="ed-actions">{project.demo && <a className="ed-button" href={project.demo}>{tr(lang, 'Ouvrir la démo', 'Open the demo')} ↗</a>}{project.repo && <a className="ed-button outline" href={project.repo}>GitHub ↗</a>}</div>
    {metrics.length > 0 && <dl className="ed-metrics">{metrics.map(metric => <div key={metric.value}><dt>{metric.label[lang]}</dt><dd>{metricDisplay(metric.value, lang)}</dd></div>)}</dl>}
    <figure className="ed-case-cover"><Cover project={project} lang={lang} eager /><figcaption>{project.images?.[0].caption[lang]}</figcaption></figure>
    <div className="ed-case-grid">
      <div><p className="ed-kicker">{tr(lang, 'Le contexte', 'Context')}</p><h2>{project.problem[lang]}</h2><p>{project.nature[lang]}</p></div>
      <div><h2>{tr(lang, 'Mon rôle', 'My role')}</h2><p>{role?.[lang]}</p><h2>{tr(lang, 'Démarche', 'Approach')}</h2><ol>{project.method.map(step => <li key={step.en}>{step[lang]}</li>)}</ol></div>
      <div><h2>{tr(lang, 'Résultats', 'Results')}</h2><p>{project.outcome[lang]}</p><h2>{tr(lang, 'Limites', 'Limitations')}</h2><p>{project.limits[lang]}</p><p>{project.learning[lang]}</p></div>
      {project.id === 'consultai' && <div><h2>{tr(lang, 'Pilote IA proposé', 'Proposed AI pilot')}</h2><p>{tr(lang, 'J’ai proposé un pilote de 90 jours pour NexaRetail. D’abord fiabiliser les KPI, puis tester les alertes logistiques et suivre les faux positifs, les coûts d’intervention et les retours des équipes.', 'I proposed a 90-day NexaRetail pilot. First validate KPIs, then test logistics alerts and track false positives, intervention costs and team feedback.')}</p></div>}
    </div>
    {project.images && project.images.length > 1 && <details className="ed-details"><summary>{tr(lang, 'Voir les autres visuels', 'See more visuals')}</summary><div className="ed-gallery">{project.images.slice(1).map(image => <figure key={image.src}><a href={asset(`assets/projects/${image.src}.webp`)}><img src={asset(`assets/projects/${image.src}.webp`)} alt={image.caption[lang]} loading="lazy" /></a><figcaption>{image.caption[lang]}</figcaption></figure>)}</div></details>}
    <div className="ed-source-links">{project.sources.map(source => <a className="ed-link" key={source.url} href={source.url}>{source.label[lang]} ↗</a>)}</div>
  </article>;
}

function About({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <section className="ed-section"><PageHeading title={tr(lang, 'Mon parcours', 'About me')} text={c.aboutIntro} />
    <div className="ed-about">
      <div><h2>{tr(lang, 'Formation', 'Education')}</h2><article><p className="ed-kicker">2025–2027</p><h3>{c.degree}</h3><p>{c.degreeTrack} · Université Sorbonne Paris Nord</p></article><article><p className="ed-kicker">2021–2025</p><h3>{tr(lang, 'Licence Économie et gestion', 'Bachelor’s in Economics and Management')}</h3><p>Université Sorbonne Paris Nord</p></article></div>
      <div><h2>{tr(lang, 'Expériences', 'Experience')}</h2>{experiences.map(exp => <article key={exp.company}><p className="ed-kicker">{exp.date[lang]}</p><h3>{exp.role[lang]} · {exp.company}</h3><p>{exp.desc[lang]}</p></article>)}</div>
      <div><h2>{tr(lang, 'Outils en pratique', 'Tools in practice')}</h2>{featuredProjects.map(project => <p key={project.id}><a className="ed-link" href={routeHref(lang, 'work/' + project.id)}>{project.title}</a> · {project.tech.slice(0, 4).join(', ')}</p>)}</div>
      <div><h2>{tr(lang, 'En dehors de la data', 'Outside data')}</h2><p>{tr(lang, 'J’aime le cinéma, les séries et les documentaires.', 'I enjoy film, series and documentaries.')}</p><CvLink lang={lang} className="ed-button outline" /></div>
    </div>
    <OptionalGame lang={lang} kind="memory" />
  </section>;
}

function Contact({ lang }: { lang: Lang }) {
  const topics = lang === 'fr' ? ['Stage de fin d’études', 'Question sur un projet', 'Discussion technique', 'Collaboration', 'Réseau professionnel', 'Retour sur le portfolio', 'Autre'] : ['Internship', 'Project question', 'Technical discussion', 'Collaboration', 'Networking', 'Portfolio feedback', 'Other'];
  const openings = lang === 'fr' ? ['Je vous écris au sujet d’une opportunité de stage.', 'J’aimerais vous poser une question sur votre projet.', 'J’aimerais échanger sur votre approche technique.', 'Je vous contacte pour vous proposer une collaboration.', 'Votre parcours m’a donné envie de faire connaissance.', 'Voici un retour sur votre portfolio.', ''] : ['I’m reaching out about an internship opportunity.', 'I’d like to ask about a project.', 'I’d like to discuss your technical approach.', 'I’m reaching out to propose a collaboration.', 'I’d like to connect after reading about your background.', 'Here is my feedback on your portfolio.', ''];
  const [topic, setTopic] = useState(topics[0]);
  const draft = (index: number) => tr(lang, 'Bonjour Can,', 'Hi Can,') + '\n\n' + openings[index] + '\n\n';
  const [body, setBody] = useState(() => draft(0));
  const [edited, setEdited] = useState(false);
  const [copied, setCopied] = useState(false);
  return <section className="ed-section"><PageHeading title="Contact" text={copy[lang].contactDesc} />
    <div className="ed-contact">
      <div className="ed-contact-links"><a href={`mailto:${identity.email}`}>{identity.email}</a><a href={linkedin}>LinkedIn ↗</a><a href={github}>GitHub ↗</a><CvLink lang={lang} /><p>Paris, France</p></div>
      <div className="ed-compose"><h2>{tr(lang, 'Préparer un message', 'Draft a message')}</h2><form onSubmit={event => {
        event.preventDefault();
        location.href = `mailto:${identity.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
      }}><label>{tr(lang, 'Motif', 'Subject')}<select value={topic} onChange={e=>{setTopic(e.target.value);if(!edited)setBody(draft(topics.indexOf(e.target.value)));}}>{topics.map(value=><option key={value}>{value}</option>)}</select></label><label>{tr(lang, 'Message', 'Message')}<textarea rows={5} required maxLength={3000} value={body} onChange={e=>{setBody(e.target.value);setEdited(true);setCopied(false);}} /></label><div className="ed-actions"><button className="ed-button" type="submit" disabled={!body.trim()}>{tr(lang, 'Ouvrir ma messagerie', 'Open my email app')} ↗</button><button className="ed-button outline" type="button" onClick={async()=>{try{await navigator.clipboard.writeText(body);setCopied(true);}catch{setCopied(false);}}}>{tr(lang, 'Copier', 'Copy')}</button><button className="ed-button outline" type="button" onClick={()=>{setBody(draft(topics.indexOf(topic)));setEdited(false);setCopied(false);}}>{tr(lang, 'Réinitialiser', 'Reset')}</button></div><p className="ed-status" role="status">{copied ? tr(lang, 'Message copié.', 'Message copied.') : ''}</p></form></div>
    </div>
  </section>;
}

export default function EditorialPortfolio() {
  const [route, setRoute] = useState(() => parseRoute(location.hash || (storage.get('portfolio-language') === 'en' ? '#/en/' : '')));
  const [theme, setTheme] = useState(() => storage.get('portfolio-theme') === 'dark' ? 'dark' : 'light');
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const navigated = useRef(false);
  const {lang, page, id} = route;
  const c = copy[lang];
  const project = featuredProjects.find(item=>item.id===id);
  const path = page==='home' ? '' : page + (id ? '/' + id : '');
  const nav = [['', c.home], ['work', c.work], ['about', c.about], ['contact', c.contact]];
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = (event: MediaQueryListEvent) => setReduced(event.matches);
    motion.addEventListener('change', onMotion);
    const onHash = () => { navigated.current = true; setRoute(parseRoute(location.hash)); };
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('hashchange', onHash); motion.removeEventListener('change', onMotion); };
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    storage.set('portfolio-language', lang);
    document.title = `${project?.title || (page === 'home' ? 'Data & Business Analytics' : nav.find(item=>item[0]===page)?.[1] || c.work)} | Can Pekgoz`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', project?.summary[lang] || tr(lang, 'Portfolio de Can Pekgoz, étudiant en Master 2 BIDABI. Data, BI et transformation IA. Stage à partir de mars 2027.', 'Portfolio of Can Pekgoz, BIDABI master’s student. Data, BI and AI transformation. Available from March 2027.'));
    window.scrollTo(0, 0);
    if (navigated.current) document.getElementById('content')?.focus({preventScroll:true});
  // Titles depend on the active route and language.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, page, id]);
  useEffect(() => {
    document.documentElement.dataset.appearance = theme;
    storage.set('portfolio-theme', theme);
  }, [theme]);
  let content;
  if (page === 'home') content = <Home lang={lang} />;
  else if (page === 'work' && project) content = <Case project={project} lang={lang} />;
  else if (page === 'about' || page === 'recruiter') content = <About lang={lang} />;
  else if (page === 'contact') content = <Contact lang={lang} key={lang} />;
  else content = <ProjectList lang={lang} />;
  return <AppContext.Provider value={{lang, c, route, reduced, setReduced}}><div className="ed-shell"><a className="ed-skip" href="#content" onClick={e=>{e.preventDefault();document.querySelector<HTMLElement>('#content')?.focus();}}>{c.skip}</a>
    <header className="ed-header"><div className="ed-nav"><a className="ed-brand" href={routeHref(lang)} aria-label="Can Pekgoz"><span aria-hidden="true">CP</span></a>
      <nav aria-label={tr(lang, 'Navigation principale', 'Main navigation')}>{nav.map(([to,label])=><a key={to} href={routeHref(lang,to)} aria-current={(to || 'home')===page ? 'page' : undefined}>{label}</a>)}</nav>
      <div className="ed-controls"><CvLink lang={lang} className="ed-nav-cv" /><a href={routeHref(lang === 'fr' ? 'en' : 'fr',path)} aria-label={c.language}>{lang === 'fr' ? 'EN' : 'FR'}</a><button aria-label={tr(lang, 'Mode sombre', 'Dark mode')} aria-pressed={theme==='dark'} onClick={()=>setTheme(value=>value==='light'?'dark':'light')}>{theme==='dark'?'☀':'◐'}</button></div>
    </div></header>
    <main id="content" tabIndex={-1} key={path+lang}>{content}</main>
    <footer className="ed-footer"><span>Can Pekgoz</span><a href={routeHref(lang, 'contact')}>Contact</a><a href={linkedin}>LinkedIn</a><a href={github}>GitHub</a></footer>
  </div></AppContext.Provider>;
}
