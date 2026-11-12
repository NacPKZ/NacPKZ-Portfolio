# Publication indépendante

## Hébergement principal actif

- Dépôt public : https://github.com/NacPKZ/NacPKZ-Portfolio
- Site principal : https://nacpkz-portfolio.vercel.app/
- Hébergeur : Vercel, espace Nac (`nac18`), projet `nacpkz-portfolio`.
- Source : dépôt GitHub `NacPKZ/NacPKZ-Portfolio`, branche de production `main`.
- Premier déploiement production : `dpl_78vW9kEQ21MQZKChZ41FwzE4fru1`, commit `78ac2a2bb05469f129aa693b10a83d93e3920d5e`.
- Propriétaire du dépôt : NacPKZ. Aucun compte ChatGPT requis pour visiter le site.

La publication publique, le contenu personnel et le CV ont été autorisés par le propriétaire. La connexion GitHub a été établie dans le compte Vercel Nac. L’ancien espace Vercel du connecteur ne doit pas être utilisé pour ce projet.

## Publication d’une mise à jour

Vercel est connecté au dépôt et reconstruit les commits sur `main`. `vercel.json` impose `npm ci`, puis `npm run validate && npm run build`, sortie `dist`. `validate` lance TypeScript, ESLint et les tests automatiques. Une compilation échouée ne remplace pas la dernière production réussie.

Pour modifier le site, créer une branche, examiner les changements puis fusionner dans `main`. GitHub Actions exécute également une validation séparée. La présence d’un workflow ne constitue pas une règle imposant une revue humaine : aucune règle de branche supplémentaire n’a été ajoutée.

## Copie de secours GitHub Pages

https://nacpkz.github.io/NacPKZ-Portfolio/

Le workflow `.github/workflows/pages.yml` se déclenche sur `main`, valide les sources et déploie cette copie. Les variables `PAGES_BASE` et `PUBLIC_SITE_URL` sont calculées depuis le dépôt. Aucun secret de déploiement manuel n’est nécessaire. GitHub délivre un jeton OIDC limité au job Pages.

## Métadonnées et ressources

Sur Vercel, garder `PAGES_BASE` vide. Le build lit `VERCEL_PROJECT_PRODUCTION_URL` pour le domaine stable et utilise `PUBLIC_SITE_URL` si cette variable est fournie. Le build génère canonical, image de partage, JSON-LD, robots et sitemap. Les routes utilisent des fragments. Les captures, GIF, CV et polices suivent le chemin Vite.

Le build Pages a également été vérifié : les polices suivent `/NacPKZ-Portfolio/`, sans requête vers `/assets/` à la racine.

Ne jamais ajouter de clé au code. Les variables locales, dépendances, caches et identifiants de déploiement sont ignorés par Git. Le projet est React et TypeScript, avec Vite et GSAP, sans serveur ChatGPT.
