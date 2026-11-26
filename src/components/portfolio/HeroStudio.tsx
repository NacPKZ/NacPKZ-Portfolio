import { useEffect, useState } from 'react';
import type { Lang } from '../../data/types';
import { useReducedMotion } from './useReducedMotion';
import HeroArtwork from './HeroArtwork';

const chapters = [
  {fr:'Le besoin', en:'The need', title:{fr:'Cadrer.',en:'Frame it.'}, kicker:{fr:'Avant les chiffres',en:'Before the numbers'}, text:{fr:'Partir de la question métier et comprendre ce qui compte.',en:'Start with the business question and understand what matters.'}},
  {fr:'L’analyse', en:'The analysis', title:{fr:'Analyser.',en:'Analyse.'}, kicker:{fr:'Relier les éléments',en:'Connect the pieces'}, text:{fr:'Structurer les données, vérifier les chiffres, chercher les explications.',en:'Structure the data, check the figures and explore explanations.'}},
  {fr:'La décision', en:'The decision', title:{fr:'Décider.',en:'Decide.'}, kicker:{fr:'Éclairer les choix',en:'Inform the choices'}, text:{fr:'Rendre les résultats lisibles pour discuter des actions possibles.',en:'Make results readable to discuss possible next steps.'}},
];

export default function HeroStudio({lang}: {lang: Lang}) {
  const [active,setActive] = useState(0);
  const [hovered,setHovered] = useState(false);
  const [focused,setFocused] = useState(false);
  const reduced = useReducedMotion();
  const fr = lang === 'fr';
  const automatic = !reduced && !hovered && !focused;
  const current = chapters[active];
  useEffect(() => {
    if (!automatic) return;
    const timer = window.setTimeout(() => setActive(value => (value + 1) % chapters.length),6800);
    return () => window.clearTimeout(timer);
  },[active,automatic]);
  return <div className="hero-studio" data-playing={!reduced} data-autoplay={automatic} data-step={active}
    onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => {if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);}}>
    <div className="cinema-topline"><span>{fr ? 'Une idée prend forme' : 'An idea takes shape'}</span><span aria-hidden="true">{String(active + 1).padStart(2,'0')} / 03</span></div>
    <div className="studio-art cinema-screen" aria-hidden="true">
      <div className="cinema-stage">
        <div className="cinema-beam"/>
        <div className="cinema-framing"><i/><i/><i/><i/></div>
        <div className="film-scene" key={active} data-chapter={active} data-active="true">
          <div className="scene-heading"><span className="scene-kicker">{current.kicker[lang]}</span><strong className="scene-title">{current.title[lang]}</strong></div>
          <HeroArtwork chapter={active} lang={lang}/>
        </div>
      </div>
      <div className="cinema-screen-edge"><span>{fr ? 'Du contexte à la décision' : 'From context to decision'}</span><span>CP</span></div>
    </div>
    <div className="studio-caption">
      <div className="studio-tabs" role="group" aria-label={fr ? 'Ma démarche' : 'My approach'}>{chapters.map((chapter,index) => <button key={chapter.en} onClick={() => setActive(index)} aria-pressed={active === index}>{chapter[lang]}</button>)}</div>
      <p key={active} className="studio-description">{current.text[lang]}</p>
    </div>
  </div>;
}
