import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { identity } from './data/identity';
import { portfolioProjects } from './data/portfolio';
import type { PortfolioProject } from './data/portfolio';
import type { Lang } from './data/types';
import { asset, parseRoute, routeHref } from './utils/route';
import { copy } from './i18n/copy';
import HeroStudio from './components/portfolio/HeroStudio';
import ProjectExperience from './components/portfolio/ProjectExperience';
import ProfileExperience from './components/portfolio/ProfileExperience';
import MailComposer from './components/portfolio/MailComposer';
import type { Draft } from './components/portfolio/MailComposer';
import { AnimatedPage, ReadingProgress } from './components/portfolio/Motion';

const linkedIn = 'https://www.linkedin.com/in/can-pekgoz/';
const github = 'https://github.com/NacPKZ';
const t = (lang: Lang, fr: string, en: string) => lang === 'fr' ? fr : en;

function readPreference(key: string) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function savePreference(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Browser storage can be disabled. */ }
}
function Cv({lang, className = ''}: {lang: Lang; className?: string}) {
  return <a className={className} href={asset('assets/CV_Can_Pekgoz.pdf')} download="CV_Can_Pekgoz.pdf">{copy[lang].cv}</a>;
}

function HomeCard({entry,lang,lead}: {entry: PortfolioProject;lang: Lang;lead: boolean}) {
  return <a className={`home-project theme-${entry.id}${lead ? ' lead' : ''}`} href={routeHref(lang,'work/'+entry.id)} data-reveal data-tilt>
    <div className="home-project-image"><img src={asset(`assets/projects/${entry.cover}.webp`)} alt="" loading="lazy" /></div>
    <div className="home-project-text"><span>{entry.area[lang]}</span><h3>{entry.project.title}</h3><p>{entry.description[lang]}</p><strong>{entry.fact[lang]}</strong></div>
  </a>;
}

function Home({lang}: {lang: Lang}) {
  return <>
    <section className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow">{t(lang,'Économie, data et intelligence artificielle','Economics, data and artificial intelligence')}</p>
        <h1>{t(lang,'Comprendre les données.','Understand the data.')}<em>{t(lang,'Accompagner les transformations.','Support transformation.')}</em></h1>
        <p className="hero-intro">{t(lang,'J’ai commencé par l’économie, puis je me suis tourné vers la data. Dans mes projets, j’explore comment des données fiables et des usages pertinents de l’IA peuvent aider les équipes à décider.', 'I started in economics before moving into data. In my projects, I explore how reliable data and practical AI use cases can help teams make decisions.')}</p>
        <p className="hero-availability">{t(lang,'Je recherche un stage de six mois en Île-de-France à partir de mars 2027.','I’m looking for a six-month internship in Île-de-France from March 2027.')}</p>
        <div className="actions"><a className="button primary" href={routeHref(lang,'work')}>{t(lang,'Découvrir mes projets','Explore my projects')}</a><Cv lang={lang} className="button ghost"/></div>
      </div>
      <HeroStudio lang={lang}/>
    </section>
    <section className="wrap home-work" aria-labelledby="home-work-title">
      <div className="section-heading"><div><p className="eyebrow">{t(lang,'Quelques réalisations','Selected work')}</p><h2 id="home-work-title">{t(lang,'Des questions concrètes.','Practical questions.')}<em>{t(lang,'Des projets pour y répondre.','Projects that answer them.')}</em></h2></div><a className="text-link" href={routeHref(lang,'work')}>{t(lang,'Toutes les études de cas','All case studies')}</a></div>
      <div className="home-project-grid">{portfolioProjects.map((entry,index) => <HomeCard key={entry.id} entry={entry} lang={lang} lead={index===0}/>)}</div>
    </section>
  </>;
}

function Work({lang}: {lang: Lang}) {
  return <section className="wrap section work-page">
    <header className="page-head"><p className="eyebrow">{t(lang,'Analyse, construction et restitution','Analysis, building and reporting')}</p><h1>{t(lang,'Trois projets,','Three projects,')}<em>{t(lang,'trois façons d’explorer.','three ways to explore.')}</em></h1><p>{t(lang,'Je présente ici les questions, les choix et les résultats de chaque projet, avec les sources pour aller plus loin.','Here are the questions, choices and findings behind each project, with sources to explore them further.')}</p></header>
    <div className="project-exhibits">{portfolioProjects.map((entry,index) => <article className={`project-exhibit theme-${entry.id}`} key={entry.id} data-reveal>
      <div className="exhibit-copy"><p className="eyebrow">{entry.area[lang]}</p><h2>{entry.project.title}</h2><p className="exhibit-question">{entry.question[lang]}</p><p>{entry.description[lang]}</p><div className="tech-tags">{entry.project.tech.slice(0,4).map(tool=><span key={tool}>{tool}</span>)}</div><a className="button primary" href={routeHref(lang,'work/'+entry.id)}>{t(lang,'Explorer le projet','Explore the project')}</a></div>
      <a className="exhibit-preview" data-tilt href={routeHref(lang,'work/'+entry.id)} aria-label={t(lang,'Ouvrir l’étude de cas ','Open the case study ')+entry.project.title}>
        <div className="exhibit-frame" style={{'--exhibit-delay':index*60+'ms'} as CSSProperties}><img src={asset(`assets/projects/${entry.cover}.webp`)} alt="" loading="lazy" /></div><span className="exhibit-fact">{entry.fact[lang]}</span>
      </a>
    </article>)}</div>
  </section>;
}

function Contact({lang,draft,onDraft}: {lang: Lang; draft: Draft|null; onDraft: (draft: Draft)=>void}) {
  return <section className="wrap section contact-page">
    <header className="page-head"><p className="eyebrow">{t(lang,'Pour la suite','What comes next')}</p><h1>{t(lang,'Et si on','Shall we')}<em>{t(lang,'en discutait ?','talk about it?')}</em></h1></header>
    <div className="contact-layout">
      <div className="contact-intro" data-reveal><p>{t(lang,'Une opportunité de stage, une question sur un projet ou simplement l’envie d’échanger ? Tu peux préparer ton message ici.','An internship opportunity, a project question, or simply a conversation? You can draft your message here.')}</p>
        <div className="contact-availability"><h2>{t(lang,'Disponible dès mars 2027','Available from March 2027')}</h2><p>{t(lang,'Pour un stage de six mois en Île-de-France.','For a six-month internship in Île-de-France.')}</p></div>
        <a className="contact-email" href={'mailto:'+identity.email}>{identity.email}</a>
        <div className="contact-social"><a href={linkedIn}>LinkedIn</a><a href={github}>GitHub</a><Cv lang={lang}/></div>
      </div>
      <MailComposer lang={lang} draft={draft} onChange={onDraft}/>
    </div>
  </section>;
}

export default function Portfolio() {
  const [route,setRoute] = useState(() => parseRoute(location.hash || (readPreference('portfolio-language') === 'en' ? '#/en/' : '')));
  const [dark,setDark] = useState(() => readPreference('portfolio-theme') === 'dark');
  const [draft,setDraft] = useState<Draft|null>(null);
  const navigated = useRef(false);
  const {lang,page,id} = route;
  const entry = portfolioProjects.find(item=>item.id===id);
  const navigation = [{to:'',label:copy[lang].home},{to:'work',label:copy[lang].work},{to:'about',label:copy[lang].about},{to:'contact',label:copy[lang].contact}];
  const path = page==='home' ? '' : page+(id?'/'+id:'');
  const title = entry?.project.title ?? navigation.find(item=>(item.to||'home')===page)?.label ?? copy[lang].work;
  useEffect(() => {
    const change = () => {navigated.current=true;setRoute(parseRoute(location.hash));};
    window.addEventListener('hashchange',change);
    return () => window.removeEventListener('hashchange',change);
  },[]);
  useEffect(() => {
    document.documentElement.lang=lang;
    document.title=`${title} | Can Pekgoz`;
    savePreference('portfolio-language',lang);
    document.querySelector('meta[name="description"]')?.setAttribute('content',t(lang,'Portfolio de Can Pekgoz. Économie, data, Business Intelligence et transformation IA. Stage de six mois en Île-de-France à partir de mars 2027.','Portfolio of Can Pekgoz. Economics, data, Business Intelligence and AI transformation. Seeking a six-month internship in Île-de-France from March 2027.'));
    window.scrollTo(0,0);
    if(navigated.current)document.getElementById('main')?.focus({preventScroll:true});
  },[lang,path,title]);
  useEffect(() => {
    document.documentElement.dataset.appearance=dark?'dark':'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#251e2d':'#f0e8f3');
    savePreference('portfolio-theme',dark?'dark':'light');
  },[dark]);

  let content;
  if(page==='home')content=<Home lang={lang}/>;
  else if(page==='work'&&entry)content=<ProjectExperience entry={entry} lang={lang}/>;
  else if(page==='about'||page==='recruiter')content=<ProfileExperience lang={lang}/>;
  else if(page==='contact')content=<Contact lang={lang} draft={draft} onDraft={setDraft}/>;
  else content=<Work lang={lang}/>;
  return <>
    <ReadingProgress/>
    <div className="site-atmosphere" aria-hidden="true"><span/><span/></div>
    <a className="skip" href="#main" onClick={event=>{event.preventDefault();document.getElementById('main')?.focus();}}>{copy[lang].skip}</a>
    <header className="site-header"><div className="wrap header-inner">
      <a className="wordmark" href={routeHref(lang)}>Can Pekgoz<span className="wordmark-symbol" aria-hidden="true"/></a>
      <nav aria-label={t(lang,'Navigation principale','Main navigation')}>{navigation.map(({to,label})=><a key={to} href={routeHref(lang,to)} aria-current={(to||'home')===page?'page':undefined}>{label}</a>)}</nav>
      <div className="controls"><a className="language-toggle" href={routeHref(lang==='fr'?'en':'fr',path)} lang={lang} aria-label={t(lang,'Français, passer en anglais','English, switch to French')}>{lang.toUpperCase()}</a>
        <button className="theme-toggle" onClick={()=>setDark(value=>!value)} aria-pressed={dark} aria-label={t(lang,'Thème sombre','Dark theme')}><span className="theme-symbol" aria-hidden="true"/></button>
      </div>
    </div></header>
    <main id="main" tabIndex={-1}><AnimatedPage key={lang+path}>{content}</AnimatedPage></main>
    <footer className="wrap site-footer"><div><p>{t(lang,'Une nouvelle question','A new question')}<em>{t(lang,'à explorer ensemble.','to explore together.')}</em></p><a className="text-link" href={routeHref(lang,'contact')}>{t(lang,'Échangeons','Let’s talk')}</a></div><div className="footer-bottom"><p>{t(lang,'Stage de six mois en Île-de-France dès mars 2027.','Six-month internship in Île-de-France from March 2027.')}</p><nav aria-label={t(lang,'Liens utiles','Useful links')}><a href={routeHref(lang,'contact')}>{copy[lang].contact}</a><a href={linkedIn}>LinkedIn</a><a href={github}>GitHub</a></nav></div></footer>
  </>;
}
