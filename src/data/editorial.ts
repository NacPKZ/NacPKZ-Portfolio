import { projects } from './projects';
import { l } from './types';
import type { Project } from './types';

const retailflow: Project = {
  id: 'retailflow', number: '04', title: 'RetailFlow', category: ['strategy', 'engineering'], accent: 'clay',
  eyebrow: l('Simulation opérationnelle · projet d’équipe', 'Operations simulation · team project'),
  tagline: l('Ouvrir les bonnes caisses au bon moment.', 'Open the right checkouts at the right time.'),
  summary: l('Un simulateur de files d’attente en supermarché. L’équipe a développé un magasin animé en 2D et un tableau de bord pour comparer le temps d’attente, la saturation et le coût de personnel.', 'A supermarket checkout simulator. Our team built an animated 2D store and a dashboard for comparing wait times, saturation and staffing costs.'),
  nature: l('Arrivées et durées de service simulées selon les paramètres saisis.', 'Arrival times and service durations are simulated from the input parameters.'),
  tech: ['Python', 'Streamlit', 'JavaScript', 'pytest'], metrics: [{ value: '301', label: l('tests Python vérifiés', 'verified Python tests') }],
  problem: l('Comment évaluer les compromis entre le nombre de caisses ouvertes, l’attente des clients et le coût du personnel ?', 'How can a store assess the trade-offs between open checkouts, customer waits and staffing costs?'),
  method: [l('Simuler l’arrivée, l’attente et le service des clients.', 'Simulate customer arrivals, waits and service.'), l('Temporaliser les événements pour les restituer dans le magasin 2D.', 'Map simulation events onto a timeline for the 2D store.'), l('Comparer les scénarios avec le temps d’attente moyen et au 95e percentile, la saturation et le coût de personnel.', 'Compare scenarios using mean and 95th-percentile wait time, saturation and staffing cost.')],
  outcome: l('La démo permet de jouer plusieurs configurations de caisses et d’observer leurs effets sur les files simulées.', 'The demo lets you run several checkout configurations and observe their effects on simulated queues.'),
  limits: l('Les résultats dépendent des arrivées et durées paramétrées. Une décision en magasin demanderait des données terrain.', 'Results depend on the configured arrivals and service times. Staffing decisions would require real store data.'),
  learning: l('Une visualisation compréhensible exige une chronologie cohérente entre les événements du moteur et les animations.', 'A legible visualisation requires a consistent timeline between simulation events and animation.'),
  repo: 'https://github.com/NacPKZ/RetailFlow', demo: 'https://retailflow-bidabi.streamlit.app/',
  sources: [{ label: l('Méthode et validation', 'Methods and validation'), url: 'https://github.com/NacPKZ/RetailFlow/blob/main/docs/VERSION_8_VALIDATION.md' }],
  images: [
    {src: 'retailflow-store', caption: l('Magasin 2D capturé dans RetailFlow.', '2D store captured in RetailFlow.')},
    {src: 'retailflow-dashboard', caption: l('Bilan d’une simulation RetailFlow avec des données synthétiques.', 'RetailFlow dashboard for one run with simulated data.')},
  ],
};

export const featuredProjects = [
  ...['consultai', 'olist', 'novatel'].map(id => projects.find(project => project.id === id)!),
  retailflow,
];

export const projectRoles = {
  consultai: l('J’ai mené le projet de bout en bout, de la génération des données à la restitution. Le principal enjeu était de garder visibles les périmètres et les hypothèses derrière chaque indicateur.', 'I led the project end to end, from data generation to reporting. The challenge was to keep metric definitions and assumptions visible at every stage.'),
  olist: l('J’ai conçu l’entrepôt et écrit les contrôles SQL. La séparation des transactions, articles et paiements était essentielle pour éviter de compter deux fois les montants.', 'I designed the warehouse and wrote the SQL checks. Separating orders, items and payments was essential to prevent double-counting.'),
  novatel: l('J’ai préparé les données et construit les six pages Power BI. Les comparaisons portent sur des groupes descriptifs et servent à formuler des pistes à tester.', 'I prepared the data and built the six Power BI pages. Comparisons describe groups and help identify ideas to test.'),
  retailflow: l('J’ai travaillé sur la scène 2D et l’intégration de la démonstration Streamlit au sein d’une équipe de quatre.', 'I worked on the 2D store and Streamlit demo integration in a four-person team.'),
};

export const projectCovers: Record<string, string> = {
  consultai: 'consult-01', olist: 'olist-erd', novatel: 'novatel-01', retailflow: 'retailflow-store',
};
