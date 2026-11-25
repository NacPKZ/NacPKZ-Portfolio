# Can Pekgoz · Portfolio Data & Business Analytics

[Portfolio public](https://nacpkz-portfolio.vercel.app/) · [Dépôt](https://github.com/NacPKZ/NacPKZ-Portfolio)

Étudiant en Master 2 Économie des entreprises et des marchés, parcours BIDABI à l’Université Sorbonne Paris Nord. Je cherche un stage de fin d’études de six mois dès mars 2027 en Île-de-France.

## Études de cas

| Projet | Sujet |
|---|---|
| ConsultAI 360 | Fiabilité des indicateurs et cadrage d’un pilote IA pour un distributeur fictif |
| Olist | Entrepôt PostgreSQL, contrôles qualité et mesure des ventes et livraisons |
| NovaTel | Attrition client et scénarios de fidélisation documentés dans Power BI |
| RetailFlow | Simulation d’attente en magasin et comparaison des configurations de caisses |

Le site est bilingue. Les préférences de langue et de thème sont mémorisées dans le navigateur. La page Contact prépare un message éditable qui s’ouvre dans la messagerie du visiteur. Le PDF servi par la navigation est `public/assets/CV_Can_Pekgoz.pdf`.

## Développement

```bash
npm ci
npm run dev
npm run validate
npm run build
```

React et TypeScript avec Vite. `src/EditorialPortfolio.tsx` porte les routes publiques. `src/data/editorial.ts` sélectionne les projets et leurs couvertures. Les anciens composants et autres études restent consultables dans le code et l’historique du dépôt. [Déploiement Vercel et GitHub Pages](docs/DEPLOYMENT.md) · [Refonte et vérifications](docs/REFONTE_2026_11_25.md).
