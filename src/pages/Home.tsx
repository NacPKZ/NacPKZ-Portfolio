import IdentityStage from '../components/IdentityStage';
import { Arrow, Link } from '../components/UI';
import { identity } from '../data/identity';
import { useApp } from '../utils/context';
import { asset } from '../utils/route';

const pillars = [
  {
    title: { fr: 'Data & Analytics', en: 'Data & Analytics' },
    text: {
      fr: 'Structurer les données, fiabiliser les indicateurs et éclairer les décisions avec SQL et Power BI.',
      en: 'Structure data, build reliable metrics and inform decisions with SQL and Power BI.',
    },
  },
  {
    title: { fr: 'IA & Transformation', en: 'AI & Transformation' },
    text: {
      fr: 'Identifier les usages pertinents de l’IA, évaluer leurs risques et préparer leur adoption par les équipes.',
      en: 'Identify where AI can help, assess its risks and plan for team adoption.',
    },
  },
  {
    title: { fr: 'Business & Strategy', en: 'Business & Strategy' },
    text: {
      fr: 'Relier les choix technologiques aux priorités métier, aux coûts et aux bénéfices attendus.',
      en: 'Connect technology choices to business priorities, costs and expected benefits.',
    },
  },
];

export default function Home() {
  const { c, lang } = useApp();

  return (
    <div className="portfolio-home wrap">
      <section className="portfolio-hero" aria-labelledby="portfolio-name">
        <div className="portfolio-intro">
          <p className="portfolio-kicker">{c.heroPre}</p>
          <h1 id="portfolio-name">{identity.name}</h1>
          <p className="portfolio-headline">
            <span>{c.heroOne}</span>
            <em>{c.heroTwo}</em>
          </p>
          <p className="portfolio-description">{c.heroDesc}</p>
          <p className="portfolio-availability">
            <span className="portfolio-status" aria-hidden="true" />
            {c.heroAvailability}
          </p>
          <div className="portfolio-actions">
            <Link to="work" className="portfolio-button portfolio-primary">
              {c.heroAction}<Arrow essential diagonal />
            </Link>
            <a className="portfolio-button portfolio-secondary" href={asset('assets/Can_Pekgoz_CV.pdf')} download="CV_Can_Pekgoz.pdf">
              {c.cv}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4" />
              </svg>
            </a>
          </div>
        </div>
        <IdentityStage />
      </section>

      <section className="portfolio-pillars" aria-label={lang === 'fr' ? 'Mes domaines de travail' : 'My areas of work'}>
        {pillars.map((pillar) => (
          <article key={pillar.title.en}>
            <h2>{pillar.title[lang]}</h2>
            <p>{pillar.text[lang]}</p>
          </article>
        ))}
      </section>

      <section className="portfolio-feature" aria-labelledby="portfolio-feature-title">
        <div>
          <p className="portfolio-kicker">{c.featured}</p>
          <h2 id="portfolio-feature-title">ConsultAI 360</h2>
          <p>{c.featuredDesc}</p>
          <Link to="work/consultai" className="portfolio-button portfolio-primary">
            {c.caseStudy}<Arrow essential diagonal />
          </Link>
        </div>
        <Link to="work/consultai" className="portfolio-feature-image" aria-label={`ConsultAI 360 — ${c.caseStudy}`}>
          <img
            src={asset('assets/projects/consult-01.webp')}
            alt={lang === 'fr' ? 'Tableau de bord Power BI de NexaRetail' : 'NexaRetail Power BI dashboard'}
            width={2000}
            height={1130}
            loading="lazy"
            decoding="async"
          />
        </Link>
      </section>
    </div>
  );
}
