# Historique V3 : quatre mini-jeux

Cette version est archivée. Voir [REFONTE_V4.md](REFONTE_V4.md) pour le comportement actuel, notamment Sherlock qui contre maintenant chaque geste.

Univers et Laboratoire sont supprimés, avec les palettes de séries, les scènes, les GIF et les trois anciennes démonstrations dépendantes du laboratoire. Le catalogue conserve neuf projets documentés et le projet Excel en construction. Toutes les cartes ont une image.

| Page | Personnage | Jeu | Résultat utile |
| --- | --- | --- | --- |
| Accueil | Sherlock | Pierre, feuille, ciseaux en trois manches | Lien vers Contact pour parler stage ou CDI |
| Projets | Tony Soprano | Trouver une anomalie dans chacun des trois dossiers fictifs | Correction expliquée, score et contact |
| Parcours | Daenerys | Retrouver quatre paires d’emblèmes | Compteur d’essais, victoire, mélange et contact |
| Contact | Don Draper | Arrêter trois cartes pour composer un brief | Message préparé dans l’application mail, Gmail ou Outlook |

Les jeux sont fermés au départ et chargés à l’ouverture. Les projets, le CV et les coordonnées restent directement accessibles. Aucun GIF ni service externe de jeu n’est nécessaire. Les personnages et emblèmes sont dessinés en SVG.

## Chifoumi

Le scénario annoncé donne deux manches à Sherlock et une au visiteur, quel que soit son choix. La manche du visiteur varie à chaque partie. Les règles du pierre-feuille-ciseaux restent respectées. La plaisanterie sur le stage ou le CDI ne représente aucun engagement réel. Le bouton final ouvre Contact ; aucun email n’est envoyé automatiquement.

## Animations

Vingt-huit nouvelles séquences CSS : personnages, dragon, clignement, gestes, score, résultats, cartes, paires, indices, brief, focus et survols. Les interactions reprennent aussi les transitions de pages et les animations GSAP existantes. La préférence système de mouvement réduit est respectée.

## Maintenance

- Textes et invitations : `src/components/GameSpot.tsx`.
- Quatre jeux : `src/components/games/`.
- Règles et données fictives : `src/utils/games.ts`.
- Personnages et emblèmes : `src/components/games/GameArt.tsx`.
- Animations et responsive : `src/styles/play.css`.
- Contact et liens de messagerie : `src/utils/contact.ts`.

Les anciennes adresses du laboratoire et de ses démonstrations renvoient vers l’index des projets.
