import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Lang } from '../../data/types';
import { useReducedMotion } from './useReducedMotion';

const chapters = [
  {fr:'Le besoin', en:'The need', text:{fr:'Partir de la question métier et comprendre ce qui compte.', en:'Start with the business question and understand what matters.'}},
  {fr:'L’analyse', en:'The analysis', text:{fr:'Structurer les données, vérifier les chiffres, chercher les explications.', en:'Structure the data, check the figures and explore explanations.'}},
  {fr:'La décision', en:'The decision', text:{fr:'Rendre les résultats lisibles pour discuter des actions possibles.', en:'Make results readable to discuss possible next steps.'}},
];

export default function HeroStudio({lang}: {lang: Lang}) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const fr = lang === 'fr';
  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setActive(value => (value + 1) % chapters.length), 5800);
    return () => window.clearTimeout(timer);
  }, [active, reduced]);
  return <div className="hero-studio" data-playing={!reduced} data-step={active}>
    <div className="cinema-topline"><span>{fr ? 'Une idée prend forme' : 'An idea takes shape'}</span><span aria-hidden="true">{String(active + 1).padStart(2,'0')} / 03</span></div>
    <div className="studio-art cinema-screen" aria-hidden="true">
      <div className="cinema-beam"/>
      <div className="cinema-framing"><i/><i/><i/><i/></div>
      <div className="film-scene scene-context" data-active={active === 0}>
        <span className="scene-kicker">{fr ? 'Avant les chiffres' : 'Before the numbers'}</span>
        <strong className="scene-title">{fr ? 'Cadrer.' : 'Frame it.'}</strong>
        <div className="context-strips">{(fr ? ['Le contexte','Les données','Les usages'] : ['The context','The data','The use cases']).map((item,index) => <span key={item} style={{'--index':index} as CSSProperties}>{item}</span>)}</div>
      </div>
      <div className="film-scene scene-analysis" data-active={active === 1}>
        <span className="scene-kicker">{fr ? 'Relier les éléments' : 'Connect the pieces'}</span>
        <strong className="scene-title">{fr ? 'Analyser.' : 'Analyse.'}</strong>
        <div className="analysis-picture"><div className="analysis-bars">{[32,52,43,75,60,91,72].map((height,index) => <i key={index} style={{'--bar':height+'%','--index':index} as CSSProperties}/>)}</div>
          <svg viewBox="0 0 350 160" fill="none"><path className="analysis-guide" d="M0 125H350M0 80H350M0 35H350"/><path className="analysis-line" d="M7 130L61 101L113 112L168 57L222 75L277 29L342 39"/></svg>
        </div>
      </div>
      <div className="film-scene scene-decision" data-active={active === 2}>
        <span className="scene-kicker">{fr ? 'Donner du sens' : 'Make sense of it'}</span>
        <strong className="scene-title">{fr ? 'Voir plus' : 'See more'}<em>{fr ? 'clair.' : 'clearly.'}</em></strong>
        <div className="decision-notes">{(fr ? ['Comprendre','Expliquer','Décider'] : ['Understand','Explain','Decide']).map((item,index) => <span key={item} style={{'--index':index} as CSSProperties}><i/>{item}</span>)}</div>
      </div>
      <div className="cinema-screen-edge"><span>{fr ? 'Du contexte à la décision' : 'From context to decision'}</span><span>CP</span></div>
    </div>
    <div className="studio-caption">
      <div className="studio-tabs" role="group" aria-label={fr ? 'Ma démarche' : 'My approach'}>{chapters.map((chapter,index) => <button key={chapter.en} onClick={() => setActive(index)} aria-pressed={active === index}><span>{chapter[lang]}</span><i aria-hidden="true"/></button>)}</div>
      <p key={active} className="studio-description">{chapters[active].text[lang]}</p>
    </div>
  </div>;
}
