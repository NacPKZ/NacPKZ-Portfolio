import { useApp } from '../utils/context';
import { Eyebrow } from './UI';

const content = {
  fr: {
    label: 'Transformation digitale & IA',
    title: 'Comment cadrer un pilote IA ?',
    intro: 'Dans le scénario NexaRetail, je propose un pilote de 90 jours pour aider les équipes à repérer les retards logistiques et à comprendre les écarts dans leurs indicateurs.',
    steps: [
      ['Cadrer le besoin', 'Valider les indicateurs, leurs sources et les décisions que les équipes logistiques doivent prendre.'],
      ['Évaluer les risques', 'Surveiller les données manquantes et les fausses alertes. Limiter l’assistant à des KPI calculés et faire valider ses interprétations par un responsable métier.'],
      ['Accompagner l’adoption', 'Tester sur un périmètre restreint, définir qui examine les alertes et consigner les actions, les incidents et les retours des équipes.'],
      ['Mesurer la valeur', 'Comparer les alertes à une règle simple et suivre les retards détectés, les fausses alertes et les coûts d’intervention avant d’envisager une extension.'],
    ],
    note: 'Le pilote est une recommandation pour une entreprise fictive. Le ROI présenté dans l’étude repose sur des hypothèses.',
  },
  en: {
    label: 'Digital & AI transformation',
    title: 'How would I design an AI pilot?',
    intro: 'In the NexaRetail scenario, I propose a 90-day pilot to help teams spot shipping delays and understand discrepancies in their metrics.',
    steps: [
      ['Define the business need', 'Agree on the metrics, their sources and the decisions logistics teams need to make.'],
      ['Assess the risks', 'Monitor missing data and false alerts. Ground the assistant in calculated KPIs and have a business owner review its interpretations.'],
      ['Support adoption', 'Test within a limited scope, assign ownership of alerts, and record actions, incidents and team feedback.'],
      ['Measure the value', 'Compare alerts with a simple rule and track detected delays, false alerts and intervention costs before considering a rollout.'],
    ],
    note: 'The pilot is a recommendation for a fictional company. The ROI in the case study is based on assumptions.',
  },
};

export default function ConsultAIPilot() {
  const { lang } = useApp();
  const { label, title, intro, steps, note } = content[lang];

  return (
    <section id="case-pilot" className="consultai-pilot wrap" tabIndex={-1} aria-labelledby="consultai-pilot-title">
      <div className="consultai-pilot-inner">
        <Eyebrow>{label}</Eyebrow>
        <h2 id="consultai-pilot-title" className="section-title">{title}</h2>
        <p className="consultai-pilot-intro">{intro}</p>
        <dl>
          {steps.map(([heading, description]) => (
            <div key={heading}>
              <dt>{heading}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
        <p className="source-note">{note}</p>
      </div>
    </section>
  );
}
