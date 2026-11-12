import { useState } from 'react';
import { experiences } from '../data/profile';
import { useApp } from '../utils/context';
import { Eyebrow } from './UI';
export default function ExperienceExplorer(){const {lang}=useApp();const [index,setIndex]=useState(0);const exp=experiences[index];
 return <section className="experience-explorer wrap"><div><Eyebrow>{lang==='fr'?'PARCOURS EN MOUVEMENT':'A JOURNEY IN MOTION'}</Eyebrow><h2 className="section-title">{lang==='fr'?'Du terrain aux données.':'From the field to data.'}</h2><p>{lang==='fr'?'Avant les tableaux de bord, il y a des factures, des dossiers et des échanges. Ces expériences nourrissent ma lecture des enjeux métier.':'Before dashboards come invoices, cases and conversations. These experiences shape how I understand business needs.'}</p></div><div><div className="experience-picks" role="group" aria-label={lang==='fr'?'Explorer les expériences':'Explore experiences'}>{experiences.map((x,i)=><button key={x.company} aria-pressed={i===index} onClick={()=>setIndex(i)}>{x.company}</button>)}</div><article className="experience-focus" key={exp.company} aria-live="polite"><span className="micro">{exp.date[lang]} / {exp.place}</span><h3>{exp.role[lang]}</h3><p>{exp.desc[lang]}</p><div className="experience-thread" aria-hidden="true"><i/><i/><i/></div></article></div></section>;
}
