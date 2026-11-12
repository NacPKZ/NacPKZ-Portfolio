import { useState } from 'react';
import { projects } from '../data/projects';
import { useApp } from '../utils/context';
import ProjectVisual from './ProjectVisual';
import { routeHref } from '../utils/route';
export default function ProjectAtlas({onNavigate}:{onNavigate:()=>void}) {
 const {lang}=useApp();const [active,setActive]=useState<string|null>(null);
 return <div className="project-atlas"><p>{lang==='fr'?`${projects.length} projets et démonstrations. Des réalisations, des expériences à tester et un projet Excel en construction.`:`${projects.length} projects and demonstrations. Case studies, working experiments and an Excel project in progress.`}</p><div className="atlas-grid">{projects.map((p,i)=><a key={p.id} href={routeHref(lang,'work/'+p.id)} onClick={onNavigate} onFocus={()=>setActive(p.id)} onPointerEnter={()=>setActive(p.id)} onPointerLeave={()=>setActive(null)} className={active===p.id?'selected':''} style={{'--item':i} as React.CSSProperties}><div className="atlas-art"><ProjectVisual project={p}/><b>{p.number}</b></div><h3>{p.title}</h3>{p.status&&<span className={'project-state state-'+p.status}>{p.status==='building'?(lang==='fr'?'En construction':'In progress'):(lang==='fr'?'À tester':'Try it')}</span>}<p>{p.tagline[lang]}</p><span className="micro">{p.tech.slice(0,3).join(' / ')}</span></a>)}</div><p className="source-note">{lang==='fr'?'Captures des projets lorsqu’elles sont disponibles, photographies d’illustration pour les autres cartes.':'Project captures where available, illustrative photographs for the other cards.'}</p></div>;
}
