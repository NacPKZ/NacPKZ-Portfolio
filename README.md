# Can Pekgoz — Portfolio

Étudiant en Master 2 BIDABI à l’Université Sorbonne Paris Nord. Stage de fin d’études de six mois dès mars 2027 en Île-de-France. [Portfolio](https://nacpkz-portfolio.vercel.app/)

Le portfolio relie économie, data et transformation IA autour de trois études de cas : ConsultAI 360 pour la qualité des indicateurs et le cadrage d’usages IA, Olist pour PostgreSQL et la modélisation, et NovaTel pour la BI et la fidélisation. Chaque projet possède sa palette, sa composition et des chiffres documentés dans ses sources.

L’identité du site s’inspire du cinéma d’auteur, avec des fonds charbon, du texte ivoire, des accents rouge profond et un monogramme cadré. L’accueil propose une séquence animée et interactive en trois plans autour du besoin métier, de l’analyse et de la décision. Les vues associent apparitions au défilement, compteurs animés, relief au survol et transitions de galerie. Chaque bas de page propose un texte et une suite adaptés à son contenu. La page Parcours rassemble formation, expériences, compétences et centres d’intérêt, avec un GIF de clap original et une variante fixe pour le mouvement réduit. Le contact prend la forme d’un brouillon de mail éditable, conservé pendant la navigation, avec ouverture dans la messagerie choisie.

```bash
npm ci
npm run dev
npm run validate
npm run build
```

Le site utilise React, TypeScript et Vite. Les vues sont dans `src/Portfolio.tsx` et `src/components/portfolio/`, le contenu dans `src/data/portfolio.ts`, et le thème dans `src/styles/portfolio-site.css`. Le thème cinéma sombre est proposé à la première visite, avec une variante claire et une préférence mémorisée. Le sélecteur FR/EN affiche la langue active. Les animations respectent la préférence de mouvement réduit. Le CV est servi sous le nom `CV_Can_Pekgoz.pdf`. [Déploiement](docs/DEPLOYMENT.md)
