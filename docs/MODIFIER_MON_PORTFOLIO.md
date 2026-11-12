# Modifier mon portfolio, sans passer par le terminal

Ce guide concerne le dépôt dédié `NacPKZ-Portfolio`. Les changements sont conservés dans GitHub. Vercel reconstruit et publie le site après une modification de la branche `main`, lorsque les contrôles réussissent.

## Remplacer mon CV

La méthode simple consiste à conserver le même nom de fichier.

1. Exporte ton nouveau CV en PDF.
2. Sur ton ordinateur, renomme-le exactement `Can_Pekgoz_CV.pdf`.
3. Dans GitHub, ouvre le dépôt du portfolio, puis `public`, `assets`.
4. Clique sur **Add file**, puis **Upload files**.
5. Dépose le nouveau PDF. Il doit remplacer `Can_Pekgoz_CV.pdf` dans ce dossier.
6. Dans le message du commit, écris par exemple `Mettre à jour mon CV`.
7. Valide avec **Commit changes** sur `main`, ou crée une branche et une pull request si une règle de validation est en place.
8. Attends le résultat des contrôles et du déploiement Vercel, puis ouvre le site et clique sur le téléchargement du CV.

Le lien reste valide parce que le chemin ne change pas : `public/assets/Can_Pekgoz_CV.pdf`. Ne dépose pas le PDF à la racine du dépôt. Un fichier appelé `CV_final_v2.pdf` ne remplace pas automatiquement celui utilisé par le site.

Le nom peut rester identique même si la date, le design ou le contenu du CV changent. Vérifie les coordonnées que tu souhaites rendre publiques avant de valider le remplacement.

Le portfolio possède aussi une synthèse recruteur distincte du PDF. Si ton parcours change, mets à jour le texte du site aux endroits ci-dessous : changer seulement le PDF ne met pas à jour les autres pages.

## Où modifier les autres informations

| Ce que je veux changer | Fichier à ouvrir | À savoir |
|---|---|---|
| Mon CV téléchargeable | `public/assets/Can_Pekgoz_CV.pdf` | Remplacer le PDF en gardant ce nom |
| Ma présentation, disponibilité, formation et textes de navigation | `src/i18n/copy.ts` | Deux parties, `fr` et `en` ; modifier les deux |
| Mes expériences professionnelles | `src/data/profile.ts` | Dates, lieux, entreprises, rôles et descriptions |
| Mes loisirs, ateliers et engagement culturel | `src/data/interests.ts` | Quatre volets avec textes français et anglais |
| Mon projet Excel, la PL-300 et mes prochains objectifs | `src/data/roadmap.ts` | Garder un statut fidèle à l'avancement réel |
| Les fiches de mes projets | `src/data/projects.ts` | Contexte, outils, résultats, limites et sources |
| Les captures de dashboards | `public/assets/projects/` | Images WebP ; mettre aussi à jour leur référence dans la fiche projet |
| La présentation du mode recruteur | `src/pages/Recruiter.tsx` | La structure est ici, une partie des textes vient de `copy.ts` |
| Les couleurs et animations | `src/styles/` | Éviter une modification large sans aperçu et vérification |

## Modifier un texte directement dans GitHub

1. Ouvre le fichier souhaité dans le dépôt.
2. Clique sur le crayon **Edit this file**.
3. Change seulement le texte concerné, en gardant les apostrophes, accolades et virgules qui l'entourent.
4. Vérifie le texte français et sa version anglaise.
5. Clique sur **Commit changes**, donne un message clair, puis valide.
6. Attends les contrôles. Si un contrôle échoue, le nouveau build Vercel ne doit pas remplacer la dernière version réussie.

Exemple pour un centre d'intérêt : dans `interests.ts`, les textes utilisent `l('texte français', 'English text')`. Garde cette structure. Pour écrire une apostrophe dans une chaîne entourée d'apostrophes simples, utilise une apostrophe typographique `’` comme dans les textes existants, ou échappe l'apostrophe avec `\'`.

## Ajouter ou modifier un projet

Une fiche est décrite dans `src/data/projects.ts`. Il faut conserver :

- Un `id` unique et stable, utilisé dans l'adresse de l'étude de cas.
- Le titre, les descriptions françaises et anglaises.
- Les outils, la nature des données, les méthodes, les limites et les sources.
- Les résultats réellement documentés, avec leur périmètre.
- Des liens GitHub ou des démonstrations qui fonctionnent.

Modifier une fiche existante est plus simple que créer une nouvelle structure. Les nouveaux projets apparaissent automatiquement dans la collection d’accueil et dans le Studio. Vérifier l’affichage mobile après l’ajout. Les itinéraires de visite se configurent dans `src/data/journeys.ts`.

## Mettre à jour la feuille de route

Ouvre `src/data/roadmap.ts`. Le projet porte le nom Projet Excel en construction. La certification est Microsoft PL-300.

Ne transforme pas une préparation en certification obtenue sans avoir passé l'examen. Si un objectif est terminé, il faut mettre à jour son statut et son texte ensemble, et adapter les libellés dans `Roadmap.tsx` si un nouveau statut est ajouté. Le site n'affiche pas de pourcentage de progression inventé.

## Comprendre les validations

Une modification suit ce chemin : **modification GitHub → commit sur main → contrôles → build Vercel → site mis à jour**.

Les contrôles vérifient le typage TypeScript, le lint, les tests et la construction. Ils ne détectent pas toutes les fautes de frappe ni tous les défauts visuels. Après une mise à jour, vérifie au moins :

- La page concernée sur ordinateur et téléphone.
- Le français et l'anglais.
- Le téléchargement du CV si tu l'as remplacé.
- Les liens et boutons que tu as modifiés.

Si le navigateur affiche encore l'ancien PDF, rafraîchis la page et réessaie dans un onglet privé. Vérifie surtout que le fichier téléchargé vient bien du dernier déploiement réussi.

## Revenir en arrière

Pour une erreur de texte ou de PDF, le plus simple est de corriger ou de remettre le fichier précédent, puis de créer un nouveau commit. L'historique GitHub garde les versions. Pour revenir à une version précédente, restaure les fichiers concernés depuis l’historique GitHub puis valide un nouveau commit. Les contrôles et la publication repartent automatiquement.

Tu peux aussi me demander : « Remplace mon CV par ce PDF » ou « Mets à jour mon expérience dans le portfolio ». Je pourrai modifier les bons fichiers et vérifier les résultats, avec les accès nécessaires.

## Documentation officielle

- [Ajouter des fichiers dans GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Modifier des fichiers dans GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)
- [Déploiements Vercel depuis Git](https://vercel.com/docs/git)

## Identité et mini-jeux

`src/data/identity.ts` centralise le nom public. Les invitations et noms des huit jeux sont dans `src/data/gameCatalog.ts`, les jeux dans `src/components/games/`, les règles dans `src/utils/games.ts` et `src/utils/arcade.ts`. Les animations sont dans `src/styles/play.css` et `src/styles/arcade.css`.

Les trois ambiances Normal, Givre et Cuivré se modifient dans `src/utils/themes.ts` pour les noms, et `src/styles/arcade.css` pour les couleurs. Elles ne changent ni le CV ni les informations du portfolio.

Les projets documentés sont dans `src/data/projects.ts`. Le projet Excel en construction est dans `src/data/newProjects.ts`. Les photographies sont dans `public/assets/editorial/`, avec leurs crédits dans `public/assets/media-manifest.json`.

Le CV reste `public/assets/Can_Pekgoz_CV.pdf`. Le remplacer en conservant exactement son nom, puis valider un commit dans GitHub.

## Adresse en ligne

Site principal : https://nacpkz-portfolio.vercel.app/

Dépôt : https://github.com/NacPKZ/NacPKZ-Portfolio

La publication utilise Vercel, projet `nacpkz-portfolio` dans l’espace Nac (`nac18`). Après un commit sur `main`, Vercel installe les dépendances, contrôle TypeScript et ESLint, exécute les tests puis construit et déploie le site. Consulter GitHub Actions et les déploiements Vercel pour suivre la publication. Si le build échoue, la dernière production réussie reste en ligne.

GitHub Pages conserve une copie de secours synchronisée à https://nacpkz.github.io/NacPKZ-Portfolio/.
