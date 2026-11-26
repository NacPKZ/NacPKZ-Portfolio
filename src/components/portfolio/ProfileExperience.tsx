import { experiences } from '../../data/profile';
import { interests } from '../../data/interests';
import { skillGroups } from '../../data/portfolio';
import { copy } from '../../i18n/copy';
import type { Lang } from '../../data/types';
import InterestMotion from './InterestMotion';

const translations: Record<string,string> = {
  Statistiques:'Statistics', Économétrie:'Econometrics', Modélisation:'Data modelling',
  'Contrôles qualité':'Quality checks', Visualisation:'Visualisation',
  'Analyse économique':'Economic analysis', Cadrage:'Scoping', 'Analyse financière':'Financial analysis',
  Restitution:'Presenting findings', 'Gestion de projet':'Project management', Pédagogie:'Explaining concepts',
};

export default function ProfileExperience({lang}: {lang: Lang}) {
  const fr = lang === 'fr';
  const interestItems = [
    {title: fr ? 'Cinéma et récits' : 'Film and stories', text: fr ? 'Films, séries et documentaires. J’aime découvrir des univers et des points de vue différents.' : 'Films, series and documentaries. I enjoy discovering different worlds and perspectives.', icon:'screen'},
    {title: fr ? 'Curiosité et entrepreneuriat' : 'Curiosity and entrepreneurship', text: interests[1].text[lang], icon:'spark'},
    {title: fr ? 'Culture et transmission' : 'Culture and sharing', text: fr ? 'La langue et la culture kurdes, les échanges et les ateliers linguistiques occupent une place importante dans mes engagements.' : 'Kurdish language and culture, conversations and language workshops play an important part in my community involvement.', icon:'culture'},
    {title: fr ? 'Solidarité et engagement' : 'Volunteering and community', text: fr ? 'J’ai participé à des collectes solidaires et à des actions associatives. J’ai aussi aidé des entreprises dans leurs démarches administratives.' : 'I have taken part in fundraising collections and community activities, and helped businesses with administrative tasks.', icon:'people'},
  ];
  return <div className="profile-page wrap section">
    <header className="profile-intro"><p className="eyebrow">{fr ? 'Économie, data et curiosité' : 'Economics, data and curiosity'}</p>
      <h1>{fr ? 'Un parcours qui relie' : 'A background connecting'}<em>{fr ? 'les chiffres et les gens.' : 'numbers and people.'}</em></h1>
      <p>{fr ? 'Mes études en économie et mes expériences en comptabilité et en recouvrement m’ont appris à regarder de près les chiffres qu’on utilise pour décider. C’est ce que je poursuis aujourd’hui en Master BIDABI.' : 'Studying economics and working in accounting and collections taught me to look closely at the figures people use to make decisions. I’m continuing that work in my BIDABI master’s programme.'}</p>
    </header>
    <div className="background-grid">
      <section className="education-panel" data-reveal><h2>{fr ? 'Formation' : 'Education'}</h2>
        <article><p className="period">{fr ? 'De 2025 à 2027' : '2025 to 2027'}</p><h3>{copy[lang].degree}</h3><p>{copy[lang].degreeTrack}</p><p>Université Sorbonne Paris Nord</p></article>
        <article><p className="period">{fr ? 'De 2021 à 2025' : '2021 to 2025'}</p><h3>{fr ? 'Licence Économie et gestion' : 'Bachelor’s in Economics and Management'}</h3><p>Université Sorbonne Paris Nord</p></article>
      </section>
      <section className="experience-panel" data-reveal><h2>{fr ? 'Expériences' : 'Experience'}</h2>
        {experiences.map(exp => <article key={exp.company} data-reveal><p className="period">{exp.date[lang]}</p><h3>{exp.role[lang]}</h3><p className="company">{exp.company}</p><p>{exp.desc[lang]}</p></article>)}
      </section>
    </div>
    <section className="skills-section">
      <div className="section-heading"><h2>{fr ? 'Compétences' : 'Skills'}</h2><p>{fr ? 'Des compétences développées dans mes études, mes projets et mes expériences.' : 'Skills developed through my studies, projects and experience.'}</p></div>
      <div className="skills-grid">{skillGroups.map(group => <article key={group.title.en} data-reveal><h3>{group.title[lang]}</h3><p>{group.description[lang]}</p><ul>{group.items.map(item => <li key={item}>{fr ? item : translations[item] ?? item}</li>)}</ul></article>)}</div>
    </section>
    <section className="interests-section">
      <div className="section-heading"><h2>{fr ? 'Ce qui nourrit ma curiosité' : 'What keeps me curious'}</h2></div>
      <div className="interest-grid">{interestItems.map(item => <article key={item.icon} data-reveal><div className="interest-visual"><InterestMotion kind={item.icon}/></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>
  </div>;
}
