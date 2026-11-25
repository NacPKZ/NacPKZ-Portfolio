import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Lang } from '../../data/types';
import { useReducedMotion } from './useReducedMotion';

const ideas = [
  {fr: 'Le besoin', en: 'The need', text: {fr:'Partir de la question métier et comprendre ce qui compte.', en:'Start with the business question and understand what matters.'}},
  {fr: 'L’analyse', en: 'The analysis', text: {fr:'Structurer les données, vérifier les chiffres, chercher les explications.', en:'Structure the data, check the figures and explore explanations.'}},
  {fr: 'La décision', en: 'The decision', text: {fr:'Rendre les résultats lisibles pour discuter des actions possibles.', en:'Make results readable to discuss possible next steps.'}},
];

export default function HeroStudio({lang}: {lang: Lang}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => setActive(value => (value + 1) % ideas.length), 5200);
    return () => window.clearTimeout(timer);
  }, [active, playing, reduced]);
  return <div className="hero-studio" data-playing={playing && !reduced} data-step={active}>
    <div className="studio-art" aria-hidden="true">
      <div className="studio-halo" />
      <div className="studio-track track-one"/><div className="studio-track track-two"/>
      <div className="studio-layer layer-data">
        {Array.from({length: 25}, (_, index) => <i key={index} style={{'--index':index} as CSSProperties}/>)}
      </div>
      <div className="studio-layer layer-analysis">
        {[35,62,47,88,67,100].map((height,index) => <i key={index} style={{'--bar':height + '%','--index':index} as CSSProperties}/>)}
      </div>
      <div className="studio-layer layer-decision"><i/><i/><i/><b/></div>
      <span className="studio-orbit orbit-one"/><span className="studio-orbit orbit-two"/>
    </div>
    <div className="studio-caption">
      <div className="studio-tabs" role="group" aria-label={lang === 'fr' ? 'Ma démarche' : 'My approach'}>
        {ideas.map((idea,index) => <button key={idea.en} onClick={() => setActive(index)} aria-pressed={active === index}>{idea[lang]}</button>)}
      </div>
      <div className="studio-note">
        <p key={active} className="studio-description">{ideas[active].text[lang]}</p>
        {!reduced && <button className="motion-control" onClick={() => setPlaying(value => !value)}
          aria-label={lang === 'fr' ? (playing ? 'Mettre l’animation en pause' : 'Animer la composition') : (playing ? 'Pause animation' : 'Animate composition')}>
          {lang === 'fr' ? (playing ? 'Pause' : 'Animer') : (playing ? 'Pause' : 'Play')}
        </button>}
      </div>
    </div>
  </div>;
}
