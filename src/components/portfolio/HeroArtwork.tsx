import { useId } from 'react';
import type { Lang } from '../../data/types';

export default function HeroArtwork({chapter,lang}: {chapter: number;lang: Lang}) {
  const uid = useId().replace(/[^a-zA-Z0-9-]/g,'');
  const fr = lang === 'fr';
  if (chapter === 0) return <svg className="hero-artwork artwork-brief" viewBox="0 0 440 210" fill="none" aria-hidden="true">
    <rect className="art-paper" x="25" y="18" width="390" height="176" rx="10"/>
    <rect className="art-accent-fill brief-heading" x="47" y="40" width="112" height="6" rx="3"/>
    <path className="art-line brief-writing" d="M47 63H323M47 76H270"/>
    {[48,178,308].map((x,index) => <g key={x} className={'brief-cell brief-cell-'+index}>
      <rect className="art-panel" x={x} y="101" width="101" height="66" rx="6"/>
      <path className="art-accent-stroke" d={`M${x+13} 120h22M${x+13} 130h46`}/>
      <text className="art-label" x={x+13} y="152">{(fr ? ['Contexte','Données','Usages'] : ['Context','Data','Use cases'])[index]}</text>
    </g>)}
    <path className="brief-focus art-accent-stroke" d="M17 46V10h42M381 10h42v36M423 168v34h-42M59 202H17v-34"/>
  </svg>;
  if (chapter === 1) return <svg className="hero-artwork artwork-plot" viewBox="0 0 440 210" fill="none" aria-hidden="true">
    <defs><linearGradient id={'plot-'+uid} x1="0" y1="24" x2="0" y2="190" gradientUnits="userSpaceOnUse"><stop className="plot-stop" stopOpacity=".25"/><stop className="plot-stop" offset="1" stopOpacity="0"/></linearGradient></defs>
    <path className="plot-grid" d="M26 44H416M26 88H416M26 132H416M26 176H416M76 26V187M158 26V187M240 26V187M322 26V187M404 26V187"/>
    <path className="plot-area" d="M26 166C70 164 69 115 115 126S167 152 203 102S248 119 281 77S337 89 370 50S402 43 416 30V188H26Z" fill={'url(#plot-'+uid+')'}/>
    <path className="plot-curve" d="M26 166C70 164 69 115 115 126S167 152 203 102S248 119 281 77S337 89 370 50S402 43 416 30"/>
    <g className="plot-callout"><rect className="art-panel" x="232" y="139" width="165" height="44" rx="6"/><path className="art-accent-stroke" d="M248 154h24M248 166h58"/><path className="art-line" d="M330 154h49M330 166h34"/></g>
  </svg>;
  return <svg className="hero-artwork artwork-decision" viewBox="0 0 440 210" fill="none" aria-hidden="true">
    <path className="decision-wire wire-one" d="M130 105h34c25 0 15-64 42-64h31"/>
    <path className="decision-wire wire-two" d="M130 105H237"/>
    <path className="decision-wire wire-three" d="M130 105h34c25 0 15 64 42 64h31"/>
    <rect className="art-paper" x="22" y="76" width="108" height="58" rx="8"/>
    <text className="art-label" x="76" y="110" textAnchor="middle">{fr ? 'Le constat' : 'The finding'}</text>
    {[19,83,147].map((y,index) => <g className={'decision-option option-'+index} key={y}>
      <rect className="art-panel" x="237" y={y} width="178" height="44" rx="7"/>
      <rect className="art-accent-fill" x="252" y={y+15} width="8" height="14" rx="2"/>
      <text className="art-label" x="274" y={y+27}>{(fr ? ['Les options','Les priorités','Les actions'] : ['The options','The priorities','The actions'])[index]}</text>
    </g>)}
  </svg>;
}
