# Publication indépendante

## Version prête à examiner

Nom de dépôt proposé : `NacPKZ-Portfolio`, compte `NacPKZ`, visibilité publique. La liste accessible des dépôts a été consultée le 12 novembre 2026 : ce dépôt n'y figurait pas. Ne pas remplacer `NacPKZ/NacPKZ`, qui est le dépôt de profil.

La source est préparée. Aucune création publique, publication Vercel ou modification des droits GitHub n'est effectuée avant l'autorisation finale demandée par le propriétaire.

## Vercel, cible principale

1. Créer le dépôt dédié public après autorisation, puis pousser cette source validée.
2. Importer ce dépôt dans le compte Vercel du propriétaire. Vérifier l'identité et le périmètre de l'intégration GitHub avant de la connecter.
3. Sélectionner Vite, branche de production `main`, dossier racine du dépôt, sortie `dist`. `vercel.json` fixe `npm ci` puis `npm run validate && npm run build`.
4. Laisser Vercel créer les aperçus des branches ; les commits et fusions dans la branche de production déclenchent la publication. Le build vérifié bloque une nouvelle version défectueuse.
5. Une fois le domaine réel attribué, contrôler `PUBLIC_SITE_URL` ou `VERCEL_PROJECT_PRODUCTION_URL`. Ne pas deviner le nom public. Le canonical et l'image de partage doivent pointer vers l'origine finale.
6. Vérifier l'URL de production sans compte ni session ChatGPT : chargement initial, ressources, navigation, rechargement d'une étude de cas, CV, FR/EN et contact. Contrôler aussi mobile et clavier.
7. Reporter uniquement le dépôt effectivement créé, le commit et l'URL effectivement publiée. Vérifier que le dépôt affiché dans Vercel est bien celui de `NacPKZ`, et que le dernier déploiement correspond au commit attendu.

Les validations GitHub et celles intégrées au build sont distinctes. La présence d'un workflow ne prouve ni son exécution distante ni une règle de branche obligatoire. Pour imposer une revue avant fusion, configurer la règle de branche correspondante dans GitHub après autorisation.

## Métadonnées

`PUBLIC_SITE_URL` peut fixer un domaine personnalisé ou un chemin GitHub Pages. À défaut, le build lit l'URL de production Vercel puis celle du déploiement. Sans origine connue, il ne fabrique pas de canonical ni de sitemap et émet `Disallow: /`. Une origine publique doit utiliser HTTPS, sans identifiants, paramètres ou fragment.

Les routes utilisent des fragments : aucun rewrite de toutes les ressources vers index.html n'est nécessaire. Il faut conserver `PAGES_BASE` vide sur Vercel. Les captures et les polices utilisent le chemin de base Vite.

## GitHub Pages, alternative

Le workflow `pages.yml` est manuel pour éviter une double publication involontaire. Après sélection de Pages comme hébergement et autorisation : activer Pages avec la source GitHub Actions, lancer le workflow, attendre le succès réel. Le chemin et l'origine sont calculés à partir du propriétaire et du nom du dépôt. Pour rendre cette alternative automatique, ajouter le déclencheur push sur `main` après avoir arrêté de l'utiliser comme simple repli.

## Accès nécessaires

Le compte GitHub connecté a accès aux projets de `NacPKZ`. Le connecteur GitHub présent sait lire et modifier des contenus existants mais ne propose pas la création de repository. Une interface de création GitHub ou un autre accès autorisé sera donc nécessaire à cette seule étape. Le connecteur Vercel est connecté. L'accès à l'espace a été autorisé et la liste des projets, encore vide, a été consultée avec succès. La création et la publication attendent l'autorisation finale.

Aucune clé ne doit être ajoutée au source. Les variables locales, caches, dépendances et métadonnées de l'ancien hébergement ne sont pas dans l'archive préparée.

## Documentation technique consultée

- [Vite sur Vercel](https://vercel.com/docs/frameworks/frontend/vite)
- [Configuration du build Vercel](https://vercel.com/docs/builds/configure-a-build)
- [Déploiement depuis Git](https://vercel.com/docs/git)
- [Déploiement statique Vite](https://vite.dev/guide/static-deploy)

La configuration est préparée selon ces contrats. Elle ne remplace pas une exécution sur le compte de destination.
