import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { PortfolioProject } from '../../data/portfolio';
import type { Lang } from '../../data/types';
import { asset, routeHref } from '../../utils/route';
import { AnimatedValue } from './Motion';

const text = (lang: Lang, fr: string, en: string) => lang === 'fr' ? fr : en;

function Gallery({entry, lang}: {entry: PortfolioProject; lang: Lang}) {
  const images = entry.project.images ?? [];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = images[active];
  useEffect(() => {
    if (open) modal.current?.showModal();
    else if (modal.current?.open) modal.current.close();
  }, [open]);
  const close = () => { setOpen(false); trigger.current?.focus(); };
  if (!selected) return null;
  return <section className="case-gallery" aria-label={text(lang, 'Visuels du projet', 'Project visuals')}>
    {images.length > 1 && <div className="gallery-tabs" role="group" aria-label={text(lang, 'Choisir une capture', 'Choose a screenshot')}>
      {images.map((image,index) => <button key={image.src} onClick={() => setActive(index)} aria-pressed={index === active}>
        {entry.id === 'consultai'
          ? [text(lang,'Vue globale','Overview'), text(lang,'Ventes','Sales'), text(lang,'Logistique','Logistics'), text(lang,'Qualité','Quality'), text(lang,'Modèle ML','ML model'), 'ROI', text(lang,'Recommandations','Recommendations')][index]
          : [text(lang,'Vue globale','Overview'), text(lang,'Facteurs associés','Associated factors'), text(lang,'Segments','Segments'), text(lang,'Fidélisation','Retention'), text(lang,'Finance','Finance'), text(lang,'Simulation','Simulation')][index]}
      </button>)}
    </div>}
    <button className="gallery-image" ref={trigger} onClick={() => setOpen(true)} aria-label={text(lang, 'Agrandir la capture du projet', 'Enlarge the project screenshot')}>
      <img key={selected.src} src={asset(`assets/projects/${selected.src}.webp`)} alt={selected.caption[lang]} />
      <span>{text(lang,'Agrandir','Enlarge')}</span>
    </button>
    <p className="gallery-caption">{selected.caption[lang]}</p>
    <dialog ref={modal} className="image-dialog" aria-label={text(lang, 'Capture agrandie', 'Enlarged screenshot')} onCancel={event => {event.preventDefault();close();}} onClose={() => setOpen(false)}>
      <div className="dialog-toolbar"><p>{entry.project.title}</p><button className="button ghost" onClick={close}>{text(lang,'Fermer','Close')}</button></div>
      {open && <img src={asset(`assets/projects/${selected.src}.webp`)} alt={selected.caption[lang]} />}
      <p>{selected.caption[lang]}</p>
    </dialog>
  </section>;
}

function ConsultVisual({entry, lang}: {entry: PortfolioProject; lang: Lang}) {
  return <div className="consult-visual">
    <div className="consult-context" data-reveal>
      <p className="eyebrow">NexaRetail</p>
      <h2>{text(lang,'Une mission de bout en bout.', 'An end-to-end project.')}</h2>
      <p>{text(lang,'Un cas fictif de distribution pour relier qualité des données, reporting et usages IA.', 'A fictional retail case connecting data quality, reporting and AI use cases.')}</p>
      <div className="tech-tags">{entry.project.tech.map(tool => <span key={tool}>{tool}</span>)}</div>
    </div>
    <Gallery entry={entry} lang={lang} />
  </div>;
}

function OlistVisual({entry, lang}: {entry: PortfolioProject; lang: Lang}) {
  const [layer, setLayer] = useState(0);
  const layers = [
    {name:'RAW', description:text(lang,'Conserver les sources pour retrouver l’origine de chaque donnée.', 'Preserve the sources to trace every piece of data.')},
    {name:'CLEAN', description:text(lang,'Harmoniser les formats, contrôler les références et qualifier les anomalies.', 'Standardise formats, check references and identify anomalies.')},
    {name:'DW', description:text(lang,'Organiser faits et dimensions au bon niveau de détail pour les analyses.', 'Organise facts and dimensions at the right grain for analysis.')},
  ];
  return <div className="olist-visual">
    <div className="warehouse-panel" data-reveal>
      <p className="eyebrow">{text(lang,'L’architecture','The architecture')}</p>
      <h2>{text(lang,'Chaque table à sa place.','Each table in the right place.')}</h2>
      <div className="warehouse-levels" role="group" aria-label={text(lang,'Couches de l’entrepôt','Warehouse layers')}>
        {layers.map((item,index) => <button key={item.name} onClick={() => setLayer(index)} aria-pressed={layer === index}><span className="database-mark" aria-hidden="true"/><strong>{item.name}</strong></button>)}
      </div>
      <p key={layer} className="layer-explanation">{layers[layer].description}</p>
    </div>
    <Gallery entry={entry} lang={lang} />
  </div>;
}

function NovaVisual({entry, lang}: {entry: PortfolioProject; lang: Lang}) {
  return <div className="novatel-visual">
    <div className="retention-panel" data-reveal>
      <div className="churn-ring" style={{'--churn':'26.54%'} as CSSProperties} role="img" aria-label={text(lang,'26,54 % d’attrition globale','26.54% overall churn')}>
        <div><strong>{lang === 'fr' ? '26,54 %' : '26.54%'}</strong><span>{text(lang,'d’attrition','churn')}</span></div>
      </div>
      <div><h2>{text(lang,'Derrière un taux, des profils différents.','Different profiles behind one rate.')}</h2>
        <p>{text(lang,'1 869 départs observés parmi 7 043 clients. Le rapport explore les contrats, l’ancienneté et les services.', '1,869 observed departures among 7,043 customers. The report explores contracts, tenure and services.')}</p>
        <ul className="churn-legend"><li>{text(lang,'1 869 départs','1,869 departures')}</li><li>{text(lang,'5 174 clients restants','5,174 remaining customers')}</li></ul>
      </div>
    </div>
    <Gallery entry={entry} lang={lang} />
  </div>;
}

export default function ProjectExperience({entry, lang}: {entry: PortfolioProject; lang: Lang}) {
  const {project} = entry;
  return <article className={`case-experience theme-${entry.id}`}>
    <div className="wrap">
      <a className="back-link" href={routeHref(lang,'work')}>{text(lang,'Tous les projets','All projects')}</a>
      <header className="case-header">
        <div><p className="eyebrow">{entry.area[lang]}</p><h1>{project.title}</h1><p className="case-question">{entry.question[lang]}</p></div>
        <div className="case-header-aside"><p>{entry.description[lang]}</p>
          <div className="actions">
            {entry.id === 'consultai' && project.demo && <a className="button primary" href={project.demo}>{text(lang,'Ouvrir l’application','Open the application')}</a>}
            {project.repo && <a className="button ghost" href={project.repo}>{text(lang,'Voir le code','View the code')}</a>}
          </div>
        </div>
      </header>
      <dl className="metric-grid">{entry.metrics.map(metric => <div key={metric.label.en} data-reveal>
        <dt>{metric.label[lang]}</dt><dd><AnimatedValue metric={metric} lang={lang} /></dd>
        {'scope' in metric && metric.scope && <dd className="metric-note">{metric.scope[lang]}</dd>}
      </div>)}</dl>
      <p className="metric-provenance">{text(lang,'Chiffres documentés dans les sources du projet.','Figures documented in the project sources.')} {project.nature[lang]}</p>
      {entry.id === 'consultai' ? <ConsultVisual entry={entry} lang={lang} /> : entry.id === 'olist' ? <OlistVisual entry={entry} lang={lang} /> : <NovaVisual entry={entry} lang={lang} />}
      <section className="finding-panel" data-reveal><p className="eyebrow">{text(lang,'Ce que l’analyse met en évidence','What the analysis shows')}</p><h2>{entry.finding[lang]}</h2></section>
      <div className="case-story">
        <section data-reveal><p className="eyebrow">{text(lang,'La question de départ','The starting question')}</p><h2>{project.problem[lang]}</h2></section>
        <section className="role-panel" data-reveal><h2>{text(lang,'Mon rôle','My role')}</h2><p>{entry.role[lang]}</p><div className="tech-tags">{project.tech.slice(0,6).map(tool => <span key={tool}>{tool}</span>)}</div></section>
        <section className="method-panel" data-reveal><h2>{text(lang,'Comment j’ai construit la réponse','How I built the answer')}</h2><ol>{project.method.map(step => <li key={step.en}>{step[lang]}</li>)}</ol></section>
        <section data-reveal><h2>{text(lang,'Résultats et limites','Results and limitations')}</h2><p>{project.outcome[lang]}</p><p>{project.limits[lang]}</p></section>
      </div>
      {entry.id === 'consultai' && <section className="pilot-panel" data-reveal>
        <div><p className="eyebrow">{text(lang,'Transformation IA','AI transformation')}</p><h2>{text(lang,'Avant de déployer, tester l’utilité.','Test the value before a rollout.')}</h2></div>
        <p>{text(lang,'J’ai proposé un pilote de 90 jours pour tester les alertes sur un périmètre logistique limité. L’objectif est de suivre les faux positifs, les coûts d’intervention et les retours des équipes, puis de décider si une extension se justifie.', 'I proposed a 90-day pilot to test alerts on a limited logistics workflow. The aim is to track false positives, intervention costs and team feedback, then assess whether an expansion is justified.')}</p>
      </section>}
      <section className="sources-panel"><h2>{text(lang,'Pour aller plus loin','Explore the project')}</h2><div>{project.sources.map(source => <a key={source.url} href={source.url}>{source.label[lang]}</a>)}</div></section>
      <a className="button ghost" href={routeHref(lang,'contact')}>{text(lang,'Discuter de ce projet','Discuss this project')}</a>
    </div>
  </article>;
}
