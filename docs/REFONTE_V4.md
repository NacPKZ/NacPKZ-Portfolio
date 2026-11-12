# Huit jeux et trois ambiances

12 novembre 2026. Une rubrique Jeux est disponible depuis la navigation principale et la recherche rapide. Don Draper reste le jeu proposé à l’ouverture de la rubrique. Les quatre jeux déjà intégrés dans les pages restent également accessibles à leur emplacement d’origine.

| Personnage | Jeu | Fonctionnement |
|---|---|---|
| Don Draper | Le brief | Trois cartes pour préparer un vrai brouillon de contact |
| Sherlock | Le chifoumi | Il voit le choix et joue toujours son contre réel, trois manches |
| Gus Fring | Le dernier jeton | Douze jetons, retraits de 1 à 3, stratégie gagnante et mise stage ou CDI |
| Logan Roy | Le code | Trois chiffres de 1 à 4, sept essais et indices de placement |
| Walter White | Les signaux | Quatre manches de mémoire, de deux à cinq signaux |
| Tyrion Lannister | Le timing | Trois essais pour arrêter un repère au centre, meilleur score conservé |
| Tony Soprano | Les anomalies | Trois dossiers fictifs, corrections et score |
| Daenerys | Les paires | Huit cartes et quatre paires à retrouver |

Les mises sont humoristiques, sans engagement. Aucun message ne part automatiquement. Les liens finaux ouvrent Contact ou préparent un brouillon de mail. Gus complète chaque retrait pour faire quatre jetons par tour ; sa victoire découle des règles. Sherlock affiche réellement feuille contre pierre, ciseaux contre feuille ou pierre contre ciseaux. Le score est calculé à partir des gestes affichés.

## Ambiances

Le bandeau supérieur propose Normal, Givre et Cuivré. Les deux variantes changent légèrement les couleurs des pages, panneaux, bordures et images de projets. Le texte ne subit aucun flou. Le choix est conservé dans le navigateur avec `can-theme-v1`. Un choix invalide ou un stockage indisponible conserve un comportement utilisable.

## Présentation et animation

L’index de projets réserve explicitement une colonne à l’image, une au texte et une aux outils. Le titre SmartCheck ne déborde plus sous les badges. À petite largeur, les éléments s’empilent. Les dix projets conservent une illustration.

Les nouveaux effets accompagnent les actions : cartes du catalogue, personnages SVG, jetons retirés, coffre, indices, signaux, repère et résultats. Les jeux sont chargés à la demande. Les temporisateurs et animations sont nettoyés au démontage. La préférence système de mouvement réduit est respectée, avec repère manuel et référence statique pour les jeux concernés.

## Modifier cette version

- Catalogue, titres et descriptions : `src/data/gameCatalog.ts`.
- Page de sélection et liens directs : `src/pages/Games.tsx`.
- Composants : `src/components/games/`.
- Règles : `src/utils/games.ts` et `src/utils/arcade.ts`.
- Thèmes : `src/utils/themes.ts` et `src/components/ThemeSwitcher.tsx`.
- Couleurs, animations et correction de l’index : `src/styles/arcade.css`.
- CV : remplacer `public/assets/Can_Pekgoz_CV.pdf`, nom inchangé.

Les règles déterministes sont testées séparément des animations. Voir le bilan de validation pour les contrôles réellement exécutés et leurs limites.

## Ajustement de fluidité

Les images des projets restent droites. Le suivi 3D de la souris et la rotation d’apparition des cartes sont supprimés. Les mouvements d’entrée et transitions sont plus courts, avec un zoom de survol discret. Les informations en bas des cartes de l’accueil sont alignées. Les effets des jeux restent indépendants de ces corrections.
