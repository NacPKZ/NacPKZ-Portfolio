# Refonte du 12 novembre 2026

## 20 changements de structure et de fonction

1. Accueil entièrement recomposé autour du nom Can Pekgoz.
2. Console interactive Comprendre, Construire, Transmettre avec trois comportements visuels distincts.
3. Suppression de la grande mise en avant exclusive ConsultAI dans l’accueil.
4. Collection des neuf projets avec des cartes de même taille et un même niveau de lecture.
5. Remplacement de la constellation centrée sur ConsultAI par une grille de projets dans le Studio.
6. Trois itinéraires de visite, chacun proposant trois projets selon un centre d’intérêt.
7. Sélection locale de trois projets au maximum, conservée entre les visites.
8. Vue dédiée à la sélection personnelle, combinable avec un domaine.
9. Comparaison des projets sélectionnés : enjeux, outils, nature des données et limites.
10. Galerie de six GIF originaux avec versions fixes et légendes thématiques.
11. Terrain d’animation interactif : barres, points et rubans.
12. Contrôle du tempo et commande de reprise depuis le début.
13. Lecture et pause explicites des GIF, remplacement par des images fixes en mouvement réduit.
14. Nouvelle présentation de la méthode en trois cartes éditoriales.
15. Accès direct au CV depuis l’accueil, aux côtés des projets.
16. Explorateur des expériences professionnelles, sans inventer de nouvelle expérience.
17. Compositeur de brouillon de contact, avec sujet et texte, ouverture de l’application email et copie.
18. Copie du lien et partage natif d’une étude de cas, avec repli vers la copie.
19. Identité et noms d’interface centralisés ; titres des onglets fondés sur les vrais noms de projet.
20. Transitions d’ouverture des pages et des études de cas différenciées, avec versions réduites.

Compléments : entrée Studio en billet de cinéma, nouveau nom validé « Scène post-générique », nouvelles illustrations typographiques pour les projets sans capture, adaptation des nouvelles interfaces à 320 px, suppression du calcul radial donnant un centre à ConsultAI.

## Animations nouvelles

Les noms ci-dessous sont définis dans `src/styles/reboot.css`. Les états interactifs peuvent être déclenchés au clavier. Les GIF demandent une action de lecture. Les animations CSS sont désactivées par le mouvement réduit.

| N° | Animation | Déclencheur / emplacement |
| --- | --- | --- |
| 1 | name-rise | Entrée des deux lignes du nom |
| 2 | period-land | Arrivée du point de signature |
| 3 | stamp-turn | Apparition du tampon Paris sur grand écran |
| 4 | console-arrive | Entrée du module d’approche |
| 5 | console-switch | Changement d’approche |
| 6 | signal-breathe | Signal de l’approche Comprendre |
| 7 | signal-sort | Formes de l’approche Construire |
| 8 | signal-share | Points de l’approche Transmettre |
| 9 | scroll-cue | Invitation à explorer la suite |
| 10 | ticker-travel | Bandeau typographique |
| 11 | card-deal | Cartes filtrées de la collection |
| 12 | pin-pop | Ajout d’un projet à la sélection |
| 13 | compare-open | Ouverture de la comparaison |
| 14 | caption-focus | Choix d’un GIF et de sa légende |
| 15 | rhythm-bars | Barres du terrain d’animation |
| 16 | rhythm-dots | Points du terrain d’animation |
| 17 | rhythm-ribbons | Rubans du terrain d’animation |
| 18 | ticket-scan | Billet Studio |
| 19 | atlas-deal | Cartes du Studio |
| 20 | launcher-arrive | Bouton flottant Studio |
| 21 | studio-unfold | Ouverture du Studio |
| 22 | brand-sharpen | Identité dans la navigation au défilement |
| 23 | interest-turn | Sélecteur d’intérêt dans Parcours |
| 24 | interest-copy-in | Contenu d’un intérêt sélectionné |
| 25 | feedback-pop | Confirmation de copie et de partage |
| 26 | arrow-nudge | Flèche d’une ligne de l’index |
| 27 | nav-type | Réaction typographique de la navigation |
| 28 | social-lift | Liens sociaux |
| 29 | thumb-lock | Miniature sélectionnée dans la galerie |
| 30 | cta-arrive | Entrée de l’action principale |
| 31 | journey-slide | Changement d’itinéraire |
| 32 | experience-reveal | Changement d’expérience |
| 33 | thread-travel | Fil visuel des expériences |
| 34 | reboot-page-in | Arrivée d’une page |
| 35 | reboot-page-out | Sortie d’une page |
| 36 | reboot-project-in | Ouverture d’une étude de cas |

Six animations GIF supplémentaires : Signal, Rythme, Connexions, Perspectives, Cinéma et Circulation. Les 36 lignes ne comptent pas les anciennes animations GSAP, ni les transitions CSS de survol ou les différentes instances d’une même animation.

## Visuels et inspiration

GIF procéduraux originaux générés par `scripts/generate-motion-loops.py` (Pillow nécessaire uniquement pour régénérer les images). Aucun besoin de Python pour développer ou déployer le site.

Inspiration de principe : exploration ludique du portfolio de Bruno Simon (https://bruno-simon.com/) et travail typographique et animation de Cassie Evans (https://www.cassie.codes/). Aucun code, marque, personnage ou extrait de série repris. Les GIF illustrent des idées, sans prétendre représenter les résultats d’un projet.
