import { useState } from 'react';
import { projects } from '../data/projects';
import type { Category } from '../data/types';
import { useApp } from '../utils/context';
import { Arrow, Eyebrow, Link } from './UI';
export default function Skills() {
  const { c, lang } = useApp();
  const [active, setActive] = useState<Category>('engineering');
  const filtered = projects.filter(p => p.category.includes(active));
  return <section className="skills-section wrap" id="skills"><Eyebrow>{lang === 'fr' ? 'LA CARTE DES COMPÉTENCES' : 'THE SKILL MAP'}</Eyebrow><div className="section-heading"><h2 className="section-title">{c.skills}</h2><p>{c.skillsDesc}</p></div><div className="skill-map"><div className="skill-options" role="group" aria-label={c.skills}>{(['engineering', 'bi', 'ml', 'strategy'] as const).map((cat, i) => <button key={cat} className={active === cat ? 'selected' : ''} aria-pressed={active === cat} onClick={() => setActive(cat)}><span>0{i + 1}</span>{c[cat]}<Arrow /></button>)}</div><div className="skill-evidence" aria-live="polite"><span className="micro">{lang === 'fr' ? 'PROJETS ASSOCIÉS' : 'RELATED PROJECTS'}</span>{filtered.map(p => <Link key={p.id} to={'work/' + p.id}><span>{p.title}<small>{p.tech.slice(0, 4).join(' / ')}</small></span><Arrow diagonal /></Link>)}</div></div></section>;
}
