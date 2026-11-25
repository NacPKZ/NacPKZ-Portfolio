import { projects } from './projects';
import { l } from './types';

export const portfolioProjects = [
  {
    id: 'consultai',
    cover: 'consult-01',
    area: l('Qualité des données et aide à la décision', 'Data quality and decision support'),
    description: l('J’ai construit un environnement de distribution fictif pour mesurer l’effet des données manquantes sur les indicateurs.', 'I built a fictional retail environment to measure how missing data affects reporting.'),
    role: l('J’ai généré les données, construit l’entrepôt, suivi les indicateurs dans Power BI et créé l’application ConsultAI 360.', 'I generated the data, built the warehouse, tracked the metrics in Power BI and created the ConsultAI 360 app.'),
    fact: l('4,1 millions de lignes synthétiques', '4.1 million synthetic rows'),
  },
  {
    id: 'olist',
    cover: 'olist-erd',
    area: l('SQL et entrepôt de données', 'SQL and data warehousing'),
    description: l('J’ai organisé les données de ventes, de paiements et de livraisons d’une place de marché brésilienne dans PostgreSQL.', 'I organised sales, payments and shipping data from a Brazilian marketplace in PostgreSQL.'),
    role: l('J’ai modélisé l’entrepôt et écrit les contrôles SQL. J’ai séparé les commandes, articles et paiements pour éviter de compter deux fois les montants.', 'I modelled the warehouse and wrote SQL checks. I separated orders, items and payments to prevent double-counting.'),
    fact: l('99 441 commandes dans la source', '99,441 orders in the source data'),
  },
  {
    id: 'novatel',
    cover: 'novatel-01',
    area: l('Power BI et fidélisation client', 'Power BI and customer retention'),
    description: l('Un rapport Power BI pour repérer les profils d’abonnés dont les départs sont les plus fréquents et proposer des pistes de fidélisation.', 'A Power BI report that identifies groups of subscribers with higher churn and explores retention options.'),
    role: l('J’ai préparé les données sous Power Query, construit les mesures DAX et conçu le rapport interactif.', 'I prepared the data in Power Query, wrote the DAX measures and designed the interactive report.'),
    fact: l('7 043 clients étudiés', '7,043 customers analysed'),
  },
].map(item => ({ ...item, project: projects.find(project => project.id === item.id)! }));

export type PortfolioProject = typeof portfolioProjects[number];
