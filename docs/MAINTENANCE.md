# Mettre à jour le portfolio

## Ajouter un projet

Ajouter une entrée `Project` dans `src/data/projects.ts`. Fournir un identifiant stable, un numéro, les deux langues, le contexte, la nature des données, les méthodes, les limites et les sources. Le projet apparaît automatiquement dans l'index, sa page et la carte des compétences. Les trois sélections de la page d'accueil sont des compositions spécifiques : les modifier dans `Home.tsx` si le projet phare change.

Les métriques doivent préciser un libellé et un périmètre. Ne pas publier une valeur sans source et ne pas transformer un volume de données en preuve de performance. Ajouter une traduction de format dans `metricDisplay` si un affichage textuel nécessite un format différent en anglais.

## Ajouter une capture

Copier une capture authentique et autorisée dans `public/assets/projects`, de préférence en WebP. Utiliser une taille adaptée, généralement 2 000 px de largeur maximum. Ajouter son identifiant sans extension dans la fiche du projet, avec une légende FR/EN. La galerie, les miniatures et la vue agrandie sont générées automatiquement. Les captures existantes sont des captures réelles, sans reconstruction graphique trompeuse.

Une image ne remplace pas un indicateur interactif. Si une capture comporte un filtre ou une valeur vide, sa légende doit le dire. Les schémas conceptuels du portfolio ne doivent pas être présentés comme des captures d'un logiciel.

## Modifier le texte ou les langues

Les textes d'interface sont dans `src/i18n/copy.ts`. L'objet anglais est typé à partir de la structure française. Une clé ajoutée doit exister dans les deux langues. Le contenu des projets utilise des objets `fr` et `en`. Ne pas modifier les captures originales pour en fabriquer une traduction.

## Expériences et formation

Les expériences sont centralisées dans `src/data/profile.ts`. Les rubriques de formation apparaissent dans `About.tsx`, `Recruiter.tsx` et les traductions. Conserver l'intitulé officiel français du diplôme en anglais si nécessaire. Une future refonte peut centraliser davantage ces données si le parcours s'allonge.

## Remplacer le CV

Remplacer `public/assets/Can_Pekgoz_CV.pdf` par la version validée. Mettre à jour la date du CV dans les traductions et dans le registre des sources. Vérifier le téléchargement et le contenu avant publication. Le document peut contenir des coordonnées personnelles : choisir explicitement la version destinée au public.

## Modifier le design

Les variables principales sont dans `src/styles/index.css` : couleur de fond, papier, accent, typographie et marges. `refinements.css` contient les premiers ajustements. `experience.css`, puis `discovery.css`, définit la nouvelle typographie sans-serif, la navigation fixe et les transitions. Les polices sont hébergées localement ; leurs licences se trouvent à côté des fichiers. Vérifier les noms accessibles et les contrastes après tout changement.

## Animations et accessibilité

L'introduction se joue une fois par session et peut être ignorée. GSAP est chargé à la demande avec nettoyage du contexte. MotionScene révèle les sections avec ScrollTrigger sans réduire le contraste de leur texte. Les routes utilisent View Transitions quand disponibles, avec un rideau GSAP de repli. Les animations CSS et GSAP respectent la préférence de réduction du mouvement ; un contrôle est disponible dans le pied de page. Les fonctions essentielles restent accessibles sans effet 3D, survol ou geste complexe.

Le menu mobile utilise une boîte de dialogue native en plein écran, une entrée GSAP et une fermeture animée. Échap ferme le menu et rend le focus au bouton. La galerie utilise une vraie boîte de dialogue avec fermeture par Échap et retour au déclencheur. Le lien d'accès direct au contenu place le focus sur le contenu principal.

## Calculs du Lab

`roi()` calcule le gain net de première année et un délai de retour simple supposant des flux constants. Les coûts annuels sont une hypothèse supplémentaire du visiteur et valent zéro dans les scénarios initiaux. Un investissement nul est interdit. Un flux annuel net non positif ne donne aucun délai de retour.

`errorCosts()` applique les coûts hypothétiques aux faux positifs et faux négatifs documentés du test DataCo. Les erreurs restent fixes : changer les coûts ne change pas le modèle. Toute nouvelle courbe de seuil doit provenir d'exports réconciliés, jamais d'une interpolation inventée.

## Vérification et publication

Exécuter les quatre commandes de validation du README, puis contrôler les parcours sur ordinateur, petite largeur et tablette. Vérifier aussi les états négatifs du ROI, les coûts nuls, la traduction, le rechargement d'une étude de cas, le retour navigateur, le CV et les liens.

Publier uniquement la version approuvée. Utiliser `docs/DEPLOYMENT.md` pour Vercel, cible principale. Le workflow Pages reste manuel. Un build ou un workflow fourni ne suffit pas pour annoncer un site public : ouvrir l'URL déployée et observer le chargement des ressources. Consigner les limites restantes dans `VALIDATION.md`.

## Présentation personnelle

`src/data/interests.ts` contient les quatre volets déclaratifs et leurs traductions. Ne pas inventer de titres culturels préférés, de dates d’association, de rôle de responsable ou de résultats d’atelier. `PersonalInterlude.tsx` affiche un résumé dans l’accueil et le détail dans Parcours.

## Recherche et préférences

La palette et la recherche de projets réutilisent `matchesSearch`. Les mots sont comparés sans accents ni casse, et tous les termes doivent être présents. Le stockage local concerne uniquement le choix index/galerie et la réduction du mouvement. Aucun historique de recherche n’est envoyé ni conservé par le site.

## Studio, objectifs et scène post-générique

`Studio.tsx` regroupe Tous les projets, La suite, Mon carnet, Ambiance et Scène post-générique. `ProjectAtlas.tsx`, chargé à la demande, présente les projets dans une grille égale, sans centre. Les cartes suivent automatiquement `projects.ts`.

Les notes du visiteur sont du texte brut local, limité à 2 000 caractères. Elles ne sont ni publiées ni transmises. Les commandes d'export et de copie agissent uniquement à la demande du visiteur.

`roadmap.ts` contient les projets et apprentissages à venir. Ne pas transformer un objectif en certification obtenue ni publier un pourcentage de progression arbitraire. Après publication effective, mettre à jour le statut du portfolio indépendant pour éviter de garder un état « en préparation » périmé.

Les effets de la scène post-générique durent huit secondes au maximum et se ferment par Échap ou leur bouton. Leur rendu utilise un portail à l'intérieur du dialogue Studio quand il est ouvert. Garder cette règle pour éviter un effet invisible derrière la couche modale.


La collection de l’accueil réutilise `projects.ts`. Les préférences locales comprennent aussi la sélection de trois projets, la couleur, le carnet, le mode lecture et les références découvertes. Le brouillon de contact reste en mémoire jusqu’à la navigation et n’est jamais envoyé par le site.
