import { useState } from 'react';
import { projects } from '../data/projects';
import { useApp } from '../utils/context';
import { Arrow, Eyebrow, Link } from './UI';
import { journeys } from '../data/journeys';
export default function VisitPlanner(){const {lang}=useApp();const [selected,setSelected]=useState(0);const journey=journeys[selected];const picks=journey.ids.map(id=>projects.find(p=>p.id===id)).filter(p=>p!==undefined);
 return <section className="visit-planner wrap"><div><Eyebrow>{lang==='fr'?'CHOISISSEZ VOTRE POINT DE DÉPART':'CHOOSE A STARTING POINT'}</Eyebrow><h2 className="section-title">{lang==='fr'?'Qu’est-ce qui vous intéresse ?':'What interests you?'}</h2><p>{lang==='fr'?'Un itinéraire en trois projets, selon votre curiosité.':'A three-project route, based on your curiosity.'}</p><div className="journey-choices" role="group" aria-label={lang==='fr'?'Choisir un itinéraire':'Choose a route'}>{journeys.map((item,i)=><button key={item.id} aria-pressed={i===selected} onClick={()=>setSelected(i)}>{item[lang]}<Arrow/></button>)}</div><Link className="text-link" to="recruiter">{lang==='fr'?'Je préfère la synthèse recruteur':'I prefer the recruiter overview'}<Arrow/></Link></div><ol className="journey-results" key={journey.id}>{picks.map((p,i)=><li key={p.id} style={{'--item':i} as React.CSSProperties}><Link to={'work/'+p.id}><span className="micro">{lang==='fr'?'ÉTAPE':'STEP'} 0{i+1}</span><h3>{p.title}</h3><p>{p.tagline[lang]}</p><span className="journey-arrow" aria-hidden="true">↗</span></Link></li>)}</ol></section>;
}
