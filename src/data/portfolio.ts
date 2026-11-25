import { projects } from './projects';
import { l } from './types';
import type { Localized } from './types';

export interface PortfolioMetric {
  value: number;
  digits?: number;
  suffix?: Localized;
  label: Localized;
  scope?: Localized;
}

export const portfolioProjects = [
  {
    id: 'consultai',
    cover: 'consult-01',
    area: l('Data et transformation IA', 'Data and AI transformation'),
    description: l('Du diagnostic des données au cadrage d’un pilote IA, dans une entreprise de distribution fictive.', 'From diagnosing data quality to designing an AI pilot for a fictional retailer.'),
    role: l('J’ai généré les données, construit l’entrepôt, créé le reporting Power BI et développé l’application de consultation des KPI.', 'I generated the data, built the warehouse, created the Power BI reporting and developed the KPI application.'),
    fact: l('4,1 millions de lignes synthétiques', '4.1 million synthetic rows'),
    question: l('Comment décider quand les données sont incomplètes ?', 'How do you make decisions with incomplete data?'),
    metrics: [
      {value: 4.1, digits: 1, suffix: l(' M', 'M'), label: l('lignes RAW cumulées', 'cumulative RAW rows'), scope: l('Somme des quatre scénarios synthétiques.', 'Total across four synthetic scenarios.')},
      {value: 4, label: l('scénarios de qualité', 'data quality scenarios')},
      {value: 120000, label: l('commandes de référence', 'reference orders'), scope: l('Périmètre analytique de référence.', 'Reference analytical scope.')},
      {value: 10, label: l('tables sources', 'source tables')},
      {value: 16, label: l('modèles dbt', 'dbt models')},
      {value: 37, label: l('tests dbt documentés', 'documented dbt tests'), scope: l('Dernier build historique du projet.', 'Last documented project build.')},
      {value: 7, label: l('pages Power BI', 'Power BI report pages')},
      {value: 35, label: l('magasins simulés', 'simulated stores')},
    ] satisfies PortfolioMetric[],
    finding: l('Dans le scénario moyen, 6 000 commandes n’ont pas de montant. Le chiffre d’affaires documenté est de 68,45 M€. Je montre la couverture de l’indicateur avant d’en tirer une recommandation.', 'In the medium scenario, 6,000 orders have no amount. Documented revenue is €68.45M. I show how much of the data the metric covers before making recommendations.'),
  },
  {
    id: 'olist',
    cover: 'olist-erd',
    area: l('SQL et data warehouse', 'SQL and data warehousing'),
    description: l('Rapprocher commandes, paiements et livraisons pour construire une base d’analyse fiable.', 'Connect orders, payments and deliveries to build a reliable analytical foundation.'),
    role: l('J’ai modélisé l’entrepôt, écrit les transformations et contrôles SQL, puis analysé les ventes, les délais de livraison et la satisfaction.', 'I modelled the warehouse, wrote SQL transformations and checks, then analysed sales, delivery times and satisfaction.'),
    fact: l('99 441 commandes étudiées', '99,441 orders analysed'),
    question: l('Des données dispersées à un entrepôt cohérent.', 'From scattered data to a coherent warehouse.'),
    metrics: [
      {value: 99441, label: l('commandes tous statuts', 'orders across all statuses')},
      {value: 96096, label: l('clients uniques', 'unique customers')},
      {value: 96478, label: l('commandes livrées', 'delivered orders')},
      {value: 112650, label: l('lignes d’articles', 'order item rows')},
      {value: 12.5, digits: 2, suffix: l(' j', ' days'), label: l('délai moyen de livraison', 'average delivery time'), scope: l('Commandes livrées avec durée connue.', 'Delivered orders with a known duration.')},
      {value: 6.77, digits: 2, suffix: l(' %', '%'), label: l('taux de retard', 'late delivery rate'), scope: l('Retards rapportés aux commandes livrées.', 'Late orders divided by delivered orders.')},
    ] satisfies PortfolioMetric[],
    finding: l('Les notes moyennes passent de 4,29 sur 5 pour les livraisons à l’heure à 2,27 pour celles en retard. L’association est descriptive et donne une piste d’investigation logistique.', 'Average review scores are 4.29 out of 5 for on-time deliveries and 2.27 for late deliveries. This descriptive association points to a logistics question worth investigating.'),
  },
  {
    id: 'novatel',
    cover: 'novatel-01',
    area: l('Business Intelligence et rétention', 'Business intelligence and retention'),
    description: l('Comprendre les départs des abonnés et explorer des pistes de fidélisation dans Power BI.', 'Understand subscriber churn and explore retention options in Power BI.'),
    role: l('J’ai préparé les données avec Power Query, construit les mesures DAX et conçu les six pages du rapport interactif.', 'I prepared the data with Power Query, wrote the DAX measures and designed the six-page interactive report.'),
    fact: l('7 043 clients analysés', '7,043 customers analysed'),
    question: l('Pourquoi certains clients partent-ils davantage ?', 'Why do some customer groups leave more often?'),
    metrics: [
      {value: 7043, label: l('clients analysés', 'customers analysed')},
      {value: 1869, label: l('départs observés', 'observed departures')},
      {value: 26.54, digits: 2, suffix: l(' %', '%'), label: l('attrition globale', 'overall churn rate')},
      {value: 6, label: l('pages interactives', 'interactive report pages')},
      {value: 5174, label: l('clients restants', 'remaining customers'), scope: l('7 043 clients moins 1 869 départs.', '7,043 customers minus 1,869 departures.')},
      {value: 54.61, digits: 2, suffix: l(' %', '%'), label: l('attrition du segment ciblé', 'churn in the selected segment'), scope: l('Clients fibre avec contrat mensuel.', 'Fibre customers on monthly contracts.')},
    ] satisfies PortfolioMetric[],
    finding: l('Les clients fibre avec un contrat mensuel présentent 54,61 % d’attrition. Ce constat permet de cibler les hypothèses de fidélisation à tester.', 'Fibre customers on monthly contracts show a 54.61% churn rate. This finding helps focus the retention ideas to test.'),
  },
].map(item => ({ ...item, project: projects.find(project => project.id === item.id)! }));

export type PortfolioProject = typeof portfolioProjects[number];

export const skillGroups = [
  {title: l('Analyse et statistiques', 'Analysis and statistics'), items: ['Python', 'pandas', 'NumPy', 'R', 'Excel', 'Statistiques', 'Économétrie'], description: l('Préparer un jeu de données, explorer les distributions, comparer des groupes et interpréter les résultats.', 'Prepare a dataset, explore distributions, compare groups and interpret results.')},
  {title: l('Données et qualité', 'Data and quality'), items: ['SQL', 'PostgreSQL', 'MySQL', 'dbt', 'PySpark', 'Modélisation', 'Contrôles qualité'], description: l('Relier les sources, construire un entrepôt et contrôler la cohérence des indicateurs.', 'Connect sources, build a warehouse and check metric consistency.')},
  {title: l('Business Intelligence', 'Business intelligence'), items: ['Power BI', 'DAX', 'Power Query', 'KPI', 'Visualisation'], description: l('Définir des mesures et concevoir des rapports qui répondent à une question métier.', 'Define measures and design reports that answer a business question.')},
  {title: l('IA et développement', 'AI and development'), items: ['scikit-learn', 'Ollama', 'Streamlit', 'FastAPI', 'pytest', 'Git', 'Docker'], description: l('Évaluer un modèle, encadrer un assistant et rendre une analyse utilisable dans une application.', 'Evaluate a model, constrain an assistant and make an analysis usable in an application.')},
  {title: l('Compréhension métier', 'Business understanding'), items: ['Analyse économique', 'Cadrage', 'Analyse financière', 'Documentation', 'Restitution'], description: l('Partir du besoin, expliciter les hypothèses et présenter des recommandations proportionnées aux résultats.', 'Start with the need, explain assumptions and present recommendations in line with the results.')},
  {title: l('Travail en équipe', 'Teamwork'), items: ['Gestion de projet', 'Coordination', 'Pédagogie', 'Communication'], description: l('Coordonner les contributions, partager la méthode et rendre les sujets techniques accessibles.', 'Coordinate contributions, share the approach and make technical topics accessible.')},
];
