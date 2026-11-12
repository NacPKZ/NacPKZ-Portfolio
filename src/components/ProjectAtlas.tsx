import { useState } from 'react';
import { projects } from '../data/projects';
import { useApp } from '../utils/context';
import { routeHref, asset } from '../utils/route';
export default function ProjectAtlas({onNavigate}:{onNavigate:()=>void}) {
 const {lang}=useApp();const [active,setActive]=useState<string|null>(null);
 return <div className="project-atlas"><p>{lang==='fr'?'Neuf projets, neuf points de départ. À vous de choisir.':'Nine projects, nine starting points. Choose your own.'}</p><div className="atlas-grid">{projects.map((p,i)=><a key={p.id} href={routeHref(lang,'work/'+p.id)} onClick={onNavigate} onFocus={()=>setActive(p.id)} onPointerEnter={()=>setActive(p.id)} onPointerLeave={()=>setActive(null)} className={active===p.id?'selected':''} style={{'--item':i} as React.CSSProperties}><div className="atlas-art">{p.images?.[0]?<img src={asset('assets/projects/'+p.images[0].src+'.webp')} alt="" loading="lazy"/>:<span>{p.tech[0]}</span>}<b>{p.number}</b></div><h3>{p.title}</h3><p>{p.tagline[lang]}</p><span className="micro">{p.tech.slice(0,3).join(' / ')}<i aria-hidden="true">↗</i></span></a>)}</div></div>;
}
