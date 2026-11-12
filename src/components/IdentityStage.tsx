import { useState } from 'react';
import { useApp } from '../utils/context';
import { identity } from '../data/identity';
const ideas = [
 {fr:'Comprendre',en:'Understand',description:['Partir de la question métier. Écouter, cadrer et identifier ce qui compte.','Start with the business question. Listen, frame and identify what matters.']},
 {fr:'Construire',en:'Build',description:['Passer de données dispersées à une analyse explicable, de SQL à la BI.','Turn scattered data into an explainable analysis, from SQL to BI.']},
 {fr:'Transmettre',en:'Share',description:['Rendre les résultats lisibles, partager la méthode et discuter les limites.','Make results readable, share the method and discuss limitations.']},
];
export default function IdentityStage(){
 const {lang}=useApp();const [active,setActive]=useState(0);
 return <div className="identity-stage"><div className="identity-heading"><span className="micro">{lang==='fr'?'ÉCONOMIE / DATA / STRATÉGIE':'ECONOMICS / DATA / STRATEGY'}</span><h1 aria-label={identity.name}><span>CAN</span><span>PEKGOZ</span></h1></div><div className="approach-console"><div className="console-tabs" role="group" aria-label={lang==='fr'?'Mon approche':'My approach'}>{ideas.map((idea,i)=><button key={idea.fr} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{idea[lang]}<i aria-hidden="true"/></button>)}</div><div className={'console-screen console-'+active} key={active}><div className="signal-art" aria-hidden="true">{Array.from({length:14},(_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div><p>{ideas[active].description[lang==='fr'?0:1]}</p><span className="micro">{lang==='fr'?'UNE QUESTION. UNE MÉTHODE. UNE DISCUSSION.':'A QUESTION. A METHOD. A CONVERSATION.'}</span></div></div></div>;
}
