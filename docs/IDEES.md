# 100 pistes pour faire évoluer le portfolio

Version du 12 novembre 2026. Les trente premières lignes décrivent le travail de cette version ou un mécanisme renforcé. Les soixante-dix suivantes sont des pistes à arbitrer, pas des fonctionnalités promises ni du contenu personnel supposé.

Le fil conducteur : exploration visuelle, lecture claire, preuves vérifiables, personnalité et stabilité. Chaque animation doit aider à comprendre un changement ou à se repérer. Le site conserve le défilement natif et le contrôle des mouvements.

## Version préparée

| N° | Amélioration | État concret |
|---|---|---|
| 1 | Palette de recherche globale | Ajoutée, pages et projets |
| 2 | Raccourci Ctrl K / Cmd K | Ajouté, navigation au clavier |
| 3 | Recherche sans accents ni casse imposée | Ajoutée |
| 4 | Recherche de plusieurs mots | Ajoutée, tous les termes requis |
| 5 | Recherche combinée aux catégories | Ajoutée |
| 6 | État sans résultat avec réinitialisation | Ajouté |
| 7 | Choix index ou galerie | Ajouté |
| 8 | Mémorisation locale de ce choix | Ajoutée |
| 9 | Aperçus de captures authentiques | Ajoutés à la galerie de projets |
| 10 | Compositions typographiques pour les projets sans image | Ajoutées, sans fausse capture |
| 11 | Arrivée progressive des cartes | Ajoutée |
| 12 | Zoom discret des aperçus au survol et au focus | Ajouté |
| 13 | Introduction personnelle sur l'accueil | Ajoutée |
| 14 | Quatre volets de centres d'intérêt | Ajoutés dans Parcours |
| 15 | Changement animé du volet personnel | Ajouté, texte et composition |
| 16 | Texte personnel FR/EN | Ajouté |
| 17 | Navigation par chapitres d'étude de cas | Ajoutée |
| 18 | Repère du chapitre courant au défilement | Ajouté |
| 19 | Arrivée au chapitre avec focus clavier | Ajoutée |
| 20 | Retour en haut contextuel | Ajouté |
| 21 | Préférence locale de réduction du mouvement | Renforcée, mémorisation |
| 22 | Pages préchargées avant la transition | Renforcées, suppression du fallback lors des navigations déjà préparées |
| 23 | Transitions natives et repli GSAP | Conservés et raccordés aux nouvelles vues |
| 24 | Source autonome sans hébergement ChatGPT | Préparée |
| 25 | Métadonnées selon l'origine réelle du déploiement | Préparées, sans domaine inventé |
| 26 | Tests dans le build Vercel | Configurés, exécution distante en attente |
| 27 | Validation GitHub sur push et pull request | Configurée, exécution distante en attente |
| 28 | Pages comme repli explicite | Workflow manuel préparé |
| 29 | Archive du source filtrée | Script préparé |
| 30 | Tests de recherche et de métadonnées | Six tests ajoutés |

## Mouvement et composition

| N° | Piste | Intérêt et condition |
|---|---|---|
| 31 | Transition partagée miniature vers étude de cas | Garder le même objet visuel pendant l'ouverture, après mesure des performances |
| 32 | Apparition des titres ligne par ligne selon leur longueur réelle | Éviter les découpages de mots sur mobile |
| 33 | Métamorphose de la grille d'index vers la galerie | Tester GSAP Flip et limiter le déplacement des cartes |
| 34 | Déplacement de profondeur de deux plans seulement | Donner du relief sans multiplier les calques |
| 35 | Ligne de lecture de section qui se dessine | Montrer l'avancement d'un chapitre |
| 36 | Zoom sur une zone exacte d'un dashboard | Guider le regard avec un point cliquable et un texte équivalent |
| 37 | Transition de couleur liée au projet actif | Renforcer l'identité de chaque cas, avec contrastes contrôlés |
| 38 | Survol magnétique des seuls boutons principaux | À limiter aux souris et à une petite amplitude |
| 39 | Dépliage d'une carte de méthode | Montrer une étape sans changement complet de page |
| 40 | Perspective d'un schéma activée volontairement | Exploration 3D légère avec alternative 2D |
| 41 | Transition de galerie par masque directionnel | Distinguer précédent et suivant |
| 42 | Dernier projet visité rappelé discrètement | Continuité locale, sans suivi distant |
| 43 | Introduction alternative pilotée par le visiteur | Rejouer le générique avec un bouton, sans retarder les visites |
| 44 | Variation typographique au point de bascule d'un chapitre | Réserver un seul effet fort par page |
| 45 | Dégradé lumineux lié au pointeur sur les grandes captures | Très faible amplitude, sans modifier la lisibilité |

## Exploration et recrutement

| N° | Piste | Intérêt et condition |
|---|---|---|
| 46 | Entrée par question métier | Fiabiliser les données, expliquer le churn, mesurer une hypothèse |
| 47 | Parcours de trois projets selon le métier recherché | Sélection basée sur les projets réels |
| 48 | Comparateur de deux projets | Comparer contexte, outils, données et livrables, sans score arbitraire |
| 49 | Sélection de projets à garder | Favoris locaux, effaçables |
| 50 | Synthèse imprimable de la sélection | Aider une discussion avec un recruteur |
| 51 | Indication du type de livrable avant ouverture | Code, dashboard, rapport ou démonstration |
| 52 | Glossaire contextuel des outils | Explications courtes accessibles au clic |
| 53 | Résumé de chaque cas en trois phrases | Question, travail, limite |
| 54 | Vue technique détaillée repliable | Permettre deux niveaux de lecture |
| 55 | Liens directs vers une section d'étude de cas | Ajouter un schéma de fragment compatible et testé |
| 56 | Filtres encodés dans l'URL | Partager une sélection sans dépendre du stockage local |
| 57 | Recherche des sources et limites | Retrouver une preuve par mot clé |
| 58 | Menu d'historique de navigation local | Revenir à un chapitre sans collecter de données |
| 59 | Page 404 plus utile | Proposer la recherche et les projets principaux |
| 60 | Carte du parcours économie vers Data | Frise factuelle, sans progression ou date inventée |

## Démonstrations et preuves

| N° | Piste | Intérêt et condition |
|---|---|---|
| 61 | Architecture à couches isolables | Montrer RAW, CLEAN et DW séparément |
| 62 | Chemin d'un indicateur dans le pipeline | Du champ source au KPI, avec colonnes réellement documentées |
| 63 | Exemple de jointure à granularité incorrecte | Démonstration pédagogique sur mini-données explicitement synthétiques |
| 64 | Avant/après d'un contrôle qualité | Afficher la règle et les lignes affectées |
| 65 | Courbe de sensibilité du ROI | Calculée avec les mêmes hypothèses que le simulateur |
| 66 | Matrice des coûts d'erreurs manipulable | Rendre visible le lien entre coûts et décisions |
| 67 | Choix de seuil ML | Uniquement avec exports de prédictions vérifiés |
| 68 | Explication animée de la matrice de confusion | Illustrer les catégories sans modifier les résultats historiques |
| 69 | Dictionnaire des KPI | Périmètre, formule, population et limites |
| 70 | Petite enquête interactive de diagnostic | Cas pédagogique clairement séparé des résultats des projets |
| 71 | Reconstruction d'un cas à partir de ses livrables | Relier captures, code et rapport |
| 72 | Aperçu de requête SQL annoté | Extrait réel lisible, sans exécution arbitraire côté serveur |
| 73 | Graphique de volumes comparés des scénarios | Même base et mêmes unités explicites |
| 74 | Bouton afficher les hypothèses | Rendre le raisonnement inspectable partout |
| 75 | Carnet des décisions de projet | Documenter les arbitrages réellement pris |

## Partie personnelle et transmission

| N° | Piste | Intérêt et condition |
|---|---|---|
| 76 | Carnet de découvertes culturelles | Titres choisis par Can, sans déduire ses favoris |
| 77 | Trois documentaires commentés | Attendre les titres et opinions réels |
| 78 | Mini-bibliothèque de lectures | Ajouter uniquement des livres confirmés |
| 79 | Carnet de questions qui donnent envie d'apprendre | Citations et questions rédigées par Can |
| 80 | Présentation d'un atelier réel | Objectif, public et contribution confirmés |
| 81 | Petit format « expliquer simplement » | Montrer un exemple pédagogique signé |
| 82 | Page d'engagement culturel courte | Approfondir seulement les informations que Can souhaite rendre publiques |
| 83 | Galerie d'événement associatif | Photos autorisées, consentement des personnes visibles |
| 84 | Phrase d'accueil en kurde | Formulation et traduction validées par Can |
| 85 | Carte de trois façons d'apprendre | Témoignage personnel plutôt qu'un profil psychologique supposé |

## Qualité, autonomie et publication

| N° | Piste | Intérêt et condition |
|---|---|---|
| 86 | Domaine personnel | Après choix du nom et autorisation d'achat séparée |
| 87 | Prérendu des pages principales | Métadonnées et partage propres à chaque projet |
| 88 | Versions d'image adaptées à la largeur | Réduire le poids des captures sur mobile |
| 89 | Audit Lighthouse sur déploiement réel | Mesurer avant d'annoncer un score |
| 90 | Budget de JavaScript dans la CI | Empêcher une inflation incontrôlée des effets |
| 91 | Tests de parcours navigateur rejouables | CI dédiée avec navigateurs appropriés |
| 92 | Tests Safari et Firefox réels | Confirmer les animations et leurs replis |
| 93 | Règle de branche main obligatoire | À configurer dans le compte GitHub, selon ses options |
| 94 | Prévisualisation avant fusion | Utiliser les aperçus Vercel effectivement connectés |
| 95 | Page de statut des démonstrations | Contrôle réel de disponibilité, sans prétendre à un service garanti |
| 96 | Notification de chargement de nouvelle version | Éviter les modules obsolètes après un déploiement |
| 97 | Revue clavier avec lecteur d'écran | Compléter les audits automatisés |
| 98 | Test d'impression du mode recruteur en PDF | Vérifier les coupures et liens imprimés |
| 99 | Journal de versions public | Changements réels et datés, pas un faux niveau d'activité |
| 100 | Export complet et procédure de retour arrière | Garder le contrôle du source et de l'hébergement |

Les pistes futures sont indépendantes de l'autorisation demandée pour publier la version actuelle. Elles ne déclenchent ni collecte de données ni achat ni ajout de service externe.

## Ajouts retenus pendant la seconde passe

La version préparée comprend aussi un Studio à cinq volets : constellation Canvas des neuf projets, feuille de route avec Smart Finance 360 et PL-300, carnet local avec copie et export, réglages d'ambiance et passages secrets. Trois palettes d'accent, les modes Cinéma/Signature/Réduit et un mode lecture complètent l'expérience. Les boutons réagissent au pointeur, les aperçus ont un relief discret et les effets secrets restent temporaires. Ces ajouts ne signifient pas que toutes les pistes futures du tableau sont réalisées.
