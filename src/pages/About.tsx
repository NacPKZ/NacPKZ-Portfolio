import { useApp } from '../utils/context';
import { experiences } from '../data/profile';
import ExperienceExplorer from '../components/ExperienceExplorer';
import Skills from '../components/Skills';
import { Eyebrow, PageTitle } from '../components/UI';
import Contact from './Contact';
import PersonalInterlude from '../components/PersonalInterlude';
import Roadmap from '../components/Roadmap';
import GameSpot from '../components/GameSpot';
export default function About() {
  const { c, lang } = useApp();
  return <><PageTitle pre={c.aboutPre} one={c.aboutTitle} two={c.aboutItalic} description={c.aboutIntro} /><section className="about-statement wrap"><div className="about-monogram" aria-hidden="true"><strong>CAN<br />PEKGOZ</strong><span>{lang === 'fr' ? 'ÉCONOMIE' : 'ECONOMICS'}<br />DATA<br />{lang === 'fr' ? 'STRATÉGIE' : 'STRATEGY'}</span></div><div><Eyebrow>{c.education}</Eyebrow><article className="education-row"><span className="micro">2026 → 2027</span><h2>{c.degree}</h2><p>{c.degreeTrack}</p><p className="muted">Université Sorbonne Paris Nord</p></article><article className="education-row"><span className="micro">2021 → 2025</span><h2>{c.bachelor}</h2><p className="muted">Université Sorbonne Paris Nord</p></article></div></section><section className="experiences-section wrap"><Eyebrow>{lang === 'fr' ? 'EXPÉRIENCES PROFESSIONNELLES' : 'PROFESSIONAL EXPERIENCE'}</Eyebrow><h2 className="section-title">{c.experiences}</h2><div className="experience-list">{experiences.map((exp, i) => <article className="experience-row" key={exp.company}><span className="experience-number">0{i + 1}</span><div className="experience-date"><span>{exp.date[lang]}</span><small>{exp.place}</small></div><div><h3>{exp.company}</h3><span className="role">{exp.role[lang]}</span><p>{exp.desc[lang]}</p></div></article>)}</div><p className="source-note">{c.experienceNote}</p></section><ExperienceExplorer/><Skills /><PersonalInterlude /><GameSpot kind="memory"/><Roadmap/><Contact compact /></>;
}
