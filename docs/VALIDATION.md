# Bilan de validation du portfolio

Date : 12 novembre 2026. Ce bilan concerne le portfolio, pas une réexécution des projets Data qu'il présente.

## Vérifications exécutées

| Vérification | Résultat observé |
|---|---|
| Installation verrouillée | `npm ci` exécuté par l'installateur ; 211 paquets installés après synchronisation du lockfile |
| TypeScript strict | Réussi |
| ESLint | Réussi après correction de deux arguments inutilisés et d'un export de constante |
| Tests Vitest | 24 tests réussis : ROI, coûts annuels, absence de retour, erreurs invalides, coûts DataCo, contenu et langues |
| Build de production | Réussi, pages lourdes séparées en modules et GSAP chargé à la demande |
| Chemin GitHub Pages | Build testé avec `/NacPKZ-Portfolio/`, chemins CSS, JS et polices contrôlés |
| Métadonnées publiques | Canonical et Open Graph absolu vérifiés dans le HTML construit |
| CV | Téléchargement effectivement déclenché dans Chromium ; fichier source PDF présent |
| Contact | Liens email/LinkedIn/GitHub présents ; retour « Email address copied » observé après copie |

## Parcours réellement manipulés dans Chromium

- Sélection Business, Data et Strategy dans l'accueil et modification du texte associé.
- Ouverture de l'index et filtre ML : trois projets, ConsultAI, Spotify et Word2Vec.
- Passage FR vers EN en conservant le chapitre.
- Ouverture de ConsultAI et sélection de l'étape dbt.
- Scénario Critical : 1 057 689 lignes RAW, 261 822 événements et 64 901 512,00 € de CA documenté.
- Galerie agrandie : image suivante avec flèche droite, fermeture par Échap et retour du focus au déclencheur.
- ROI avec gains nuls : -100 %, -50 000 € et aucun délai de retour.
- Coûts DataCo par défaut : baseline 119 970 €, forêt 82 490 € ; avec fausse alerte à 100 € et retard manqué à 1 €, baseline 80 942 € contre 219 613 €.
- Carte des compétences, catégorie conseil : ConsultAI, NovaTel et SmartCheck.
- Mode recruteur, CV et retour navigateur vers la synthèse.
- Menu mobile ouvert, puis navigation vers l'index.

Les tests de navigation utilisent le navigateur fourni et ses actions Playwright/AX. Ils ne constituent pas une suite Playwright CLI rejouable incluse dans ce dépôt. Les tests de calculs et de contenu sont, eux, rejouables avec Vitest.

## Responsive et captures

Rendu inspecté sur la fenêtre desktop et dans des iframes de largeurs extérieures 320, 390 et 768 px. Les largeurs utiles sont réduites par les barres de défilement du navigateur de test, notamment 305, 375 et 753 px. Il s'agit d'un contrôle des mises en page CSS, pas d'une émulation matérielle d'iPhone ou d'une validation tactile sur appareil réel.

Les débordements observés sur le module Lab, le minimum de largeur de page et le pied de page anglais ont été corrigés à leur source. Les captures de revue ne font pas partie du build publié.

## Accessibilité

Audit axe-core exécuté depuis un harnais local non publié, sur des règles WCAG 2 A/AA, 2.1 A/AA et 2.2 AA.

| Vue contrôlée après correction | Résultat automatique |
|---|---|
| Accueil FR à petite largeur | Aucune violation détectée ; 24 contrôles réussis ; certaines analyses de contraste sur fonds complexes demandent une revue humaine |
| ConsultAI FR à largeur tablette | Aucune violation détectée ; 29 contrôles réussis ; contraste de certains fonds complexes à revoir manuellement |
| Mode recruteur FR | Aucune violation détectée ; 22 contrôles réussis ; aucun contrôle incomplet retourné |
| Lab ROI FR | Aucune violation détectée ; 27 contrôles réussis ; aucun contrôle incomplet retourné |

Les premiers audits ont permis de corriger les noms accessibles de liens, les numéros de miniatures, la structure d'une liste de définitions et des contrastes. La préférence de mouvement réduit est prise en compte par CSS et par l'initialisation des animations. La galerie a été testée au clavier. Cela ne constitue pas une certification de conformité intégrale.

Rapports de contraste calculés sur les couleurs principales : texte secondaire sur fond sombre 8,53:1 ; accent sage sur fond sombre 13,10:1 ; texte secondaire du mode recruteur 5,46:1 ; texte clair sur cobalt 7,42:1 ; texte des bandeaux clairs 8,88:1. Ces calculs ne couvrent pas tous les pixels des images et dégradés.

## Limites restant explicites

- Aucun score Lighthouse n'a été exécuté ni revendiqué. Les tailles gzip viennent du build Vite, pas d'une mesure sur un appareil utilisateur.
- Firefox et Safari réels n'ont pas été testés dans cet environnement. Les contrôles navigateur concernent Chromium.
- L'impression est mise en page par CSS ; aucune imprimante physique n'a été utilisée.
- La disponibilité de Streamlit et des services externes n'est pas garantie. Les liens de sources GitHub ont été fondés sur les fichiers consultés ; les deux chemins d'architecture supplémentaires ont été ouverts et confirmés.
- Les descriptions et légendes sont bilingues ; les captures et le CV authentiques restent en français, ce qui est signalé.
- Les résultats ML, SQL et BI des projets sources ne sont pas réexécutés par ce portfolio.
- Le workflow GitHub Pages est préparé. Aucun succès d'Actions ou de déploiement GitHub Pages n'est annoncé avant sa mise en service autorisée.

La version privée de revue sert à évaluer le rendu avant toute publication publique. Une publication ne doit être annoncée qu'après confirmation de son résultat réel.

## Refonte de navigation et de mouvement

Contrôles du 12 novembre 2026 après remplacement de l'identité CP par le nom complet, ajout des polices Nimbus Sans locales et agrandissement des textes.

- Navigation desktop manipulée vers Projets puis Parcours, et langue changée en conservant le parcours.
- Menu mobile à 390 px ouvert, fermé par Échap, rouvert, puis utilisé pour ouvrir Projets. Menu natif avec arrière-plan bloqué.
- Contrôle de réduction du mouvement activé, attribut `data-motion=reduced` observé, puis navigation vers le Lab depuis le menu.
- Compositions inspectées sur desktop FR/EN et largeurs extérieures 320, 390, 768 et 1024 px. Chevauchements du titre et des commandes corrigés. Pas de débordement de page observé aux largeurs utiles 305, 375 et 753 px.
- Audit axe du menu ouvert : aucune violation, 15 contrôles réussis.
- Audit axe de l'accueil à 320 px après correction des révélations : aucune violation, 24 contrôles réussis. Analyses manuelles complémentaires signalées par axe pour certains attributs et fonds complexes.
- Audit axe de ConsultAI à 1024 px : aucune violation, 29 contrôles réussis, mêmes limites sur certains attributs et fonds complexes.
- TypeScript, ESLint, 24 tests Vitest et build de production réussis pendant la refonte.

Les transitions natives ont été manipulées dans Chromium. Le repli GSAP pour les navigateurs sans View Transitions est présent mais n'a pas été exécuté sur Safari ou Firefox réels. Aucun score de performance utilisateur ni conformité intégrale n'est revendiqué.

## Version indépendante, Studio et feuille de route

12 novembre 2026. Parcours vérifiés dans Chromium sur le source React/TypeScript autonome, sans appel à une API ChatGPT :

- Ctrl K ouvre la recherche ; recherche « olist », puis Entrée ouvre Olist. Les noms de pages et de projets restent accessibles.
- Galerie de projets activée ; recherche SQL : cinq projets correspondants. La recherche et les catégories se combinent.
- Page Parcours : sélection de Culture & bénévolat, texte personnel observé sur ordinateur et à 390 px.
- Studio : sélection de NovaTel dans la constellation ; titre, outils et lien d'étude de cas mis à jour.
- Carnet : saisie, changement de volet, copie confirmée, téléchargement texte effectivement déclenché, puis suppression des notes de test.
- Ambiance : accent Lilas choisi, attribut `data-motion=reduced` observé après sélection de Réduit, puis réglages rétablis.
- Feuille de route : PL-300 dépliée, étapes et statut à venir affichés. Aucun examen réussi n'est revendiqué. Le projet Excel est Smart Finance 360.
- Passages secrets : références Stranger Things et Game of Thrones déclenchées dans le Studio ; Dunder Data déclenché depuis la recherche rapide. Les effets sont fermables et temporaires, sans son ni extrait de série.
- Menu mobile à 320 px, navigation vers Projets puis ConsultAI. Sélection dbt et saut au chapitre Sources ; focus reçu par la section Sources, chapitre courant correct.
- Débordement de 8 px détecté dans la grille pipeline puis corrigé par colonnes `minmax(0,1fr)` et marges internes adaptées. Largeur utile finale observée : 305 px, `scrollWidth=305`.

### Audits axe après correction

| Vue | Résultat observé |
|---|---|
| Parcours et rubrique personnelle à 390 px | Aucune violation, 23 contrôles réussis ; certains contrôles manuels complémentaires |
| Palette de recherche à 320 px | Aucune violation, 20 contrôles réussis ; contraste de certains fonds complexes incomplet |
| Studio, constellation à 320 px | Aucune violation, 19 contrôles réussis ; contraste incomplet sur certains fonds |
| Studio, feuille de route à 320 px | Aucune violation, 19 contrôles réussis ; aucun contrôle incomplet |
| ConsultAI avec navigation de chapitres à 320 px | Aucune violation, 29 contrôles réussis ; contrôles manuels complémentaires signalés |

Ces audits ont conduit à retirer des contrôles interactifs imbriqués de la recherche, corriger des noms accessibles et placer les effets déclenchés depuis le Studio dans la bonne couche de dialogue. Les conclusions ne constituent pas une certification globale ni une garantie d'absence de bug.

La constellation est chargée à la demande. Son rendu Canvas s'arrête au démontage ; les animations respectent la réduction du mouvement. Les réglages et notes restent locaux. Aucun service analytique ou historique de notes n'est envoyé.

### Publication

La source est préparée pour Vercel et GitHub Pages. Le connecteur Vercel est connecté et l'accès à l'espace a été confirmé par la liste des projets, encore vide. Aucune publication indépendante n'a été effectuée. Le futur dépôt public dédié et l'URL finale restent à créer après l'autorisation finale demandée par le propriétaire.

Les vérifications distantes Vercel, GitHub Actions, Safari et Firefox ne sont pas revendiquées. Le code n'a pas encore de succès de déploiement indépendant à annoncer.

## Refonte du 12 novembre 2026, accueil centré sur Can

Histoire vérifiée : le visiteur choisit un itinéraire, sélectionne des projets, les compare, ouvre leurs études de cas, explore le Studio puis prépare un contact. Les données éditoriales sont locales ; aucune API privée ni base de données n’intervient dans ces parcours.

- 33 tests Vitest, TypeScript et ESLint validés avant publication.
- Accueil : erreur initiale corrigée sur les projets sans métrique. L’outil principal est alors affiché ; aucune métrique n’est inventée.
- Comparaison NovaTel/Olist : quatre lignes de comparaison et liens vers les études visibles.
- Approche : changement Comprendre vers Construire confirmé.
- Itinéraire Data : Olist, FHIR Streaming, Spotify & PySpark confirmés.
- GIF : lecture déclenchée ; changement en Points et tempo 1,5 testés.
- Studio : grille égale des projets et nom « Scène post-générique » confirmés.
- Contact : choix du sujet projet, texte du brouillon et lien mailto encodé confirmés. Aucun email envoyé.
- Expériences : sélection Matera et restitution du rôle et de la mission confirmées.
- Accueil à 320 px : largeur utile 305 px, largeur de défilement 305 px. Aucun débordement horizontal de la page.
- Audit axe après stabilisation à 320 px : zéro violation, 28 contrôles réussis. Vérifications manuelles signalées par axe pour certains attributs et fonds complexes.
- Corrections mobiles : disposition de la console en colonne à très petite largeur et libellés des liens de captures corrigés.

Les animations d’entrée font varier temporairement l’opacité. Un audit déclenché pendant leur exécution peut mesurer un contraste transitoire. Le contrôle indiqué ci-dessus a été réalisé sur le rendu stabilisé. Le mode de mouvement réduit désactive ces animations et garde les GIF en images fixes.

## Vérification distante GitHub Pages

Le workflow Pages du commit `78ac2a2` a terminé avec succès le 12 novembre 2026 : validation 23 secondes, déploiement 10 secondes, durée totale 40 secondes. Le site public s’ouvre à https://nacpkz.github.io/NacPKZ-Portfolio/ sans connexion.

En production : accueil centré sur Can affiché, aucune image chargée en erreur dans le contrôle DOM, comparaison NovaTel/Olist affichée, ouverture et rechargement du lien profond NovaTel réussis, changement vers l’anglais confirmé avec titre d’onglet canonique.

Audit local supplémentaire en anglais à 390 px : zéro violation axe, 28 contrôles réussis ; largeur utile et largeur de défilement identiques à 375 px. Ce contrôle utilise un cadre de navigateur et ne remplace pas un test sur téléphone physique.

## Production Vercel

Le déploiement initial `dpl_78vW9kEQ21MQZKChZ41FwzE4fru1` a terminé avec le statut « Deployed to Production » dans l’espace Nac (`nac18`). URL attribuée et ouverte : https://nacpkz-portfolio.vercel.app/. Le dépôt et le commit `78ac2a2` sont indiqués dans l’interface Vercel. L’accueil et ses ressources sont visibles à cette adresse. Le CV publié a aussi été ouvert et lu dans le visualiseur PDF du navigateur sur la copie Pages.

## Refonte cinéma et expériences, 12 novembre 2026

- 45 tests : calculs historiques, capacité et rentabilité du car wash, cas sans client, marge non positive, arrondi des clients servis, règles de l’enquête, questions SQL, composition et encodage des emails, destinations mail et intégrité des médias.
- TypeScript et ESLint validés.
- Studio : treize balises image, chacune avec une ressource locale, pour treize cartes.
- M’écrire : prénom fictif, message et sélection A1 Wash Lab saisis ; sujet et corps de l’aperçu concordent avec le mailto final. Aucun email de test envoyé.
- Univers : sept références, ambiance sélectionnée répercutée et scène de détail affichée.
- Car wash : rush à deux pistes, 120 clients servis et 1 160 € de résultat ; trois pistes, 180 clients servis et 1 780 € de résultat, hypothèses inchangées.
- Enquête : sélection 03/04/05/06, verdict 4/4, total brut 750 €, CA selon la règle 505 €.
- Atelier : trois réponses exactes, score 3/3 et corrections visibles.
- Laboratoire à 320 px : largeur utile 305 px, défilement 305 px après correction du titre. Audit axe : zéro violation, 29 contrôles réussis.
- Contact à 390 px : largeur utile 375 px, défilement 375 px. Audit axe : zéro violation, 29 contrôles réussis.
- Les contrôles sur cadres de navigateur ne remplacent pas des essais sur téléphones physiques. Les audits automatiques ne garantissent pas l’absence de tout défaut.

- Accueil à 320 px : largeur utile 305 px, défilement 305 px, aucun débordement. Audit axe : zéro violation, 26 contrôles réussis.

### Équilibre professionnel final

Références retirées de l’accueil, de l’index des projets, du parcours professionnel et du contact. Image fixe dans la partie personnelle, GIF contextuel dans le car wash, vignettes fixes dans le Studio. Nouvelle validation : TypeScript, ESLint, 45 tests et build de production réussis.

## Version quatre mini-jeux, 12 novembre 2026

Univers et Laboratoire supprimés. Plus de GIF de séries ni de lien de navigation vers le laboratoire. Dix projets illustrés conservés, dont Excel en construction.

TypeScript, ESLint et 47 tests automatiques réussis. Le chifoumi a terminé à 2 manches à 1 pour Sherlock et son lien ouvre Contact. Tony affiche 3/3 après les solutions. Don Draper compose un lien email avec le brief réellement retenu. Daenerys : quatre paires retrouvées en six essais, puis mélange et remise à zéro confirmés dans le navigateur. Traduction anglaise de Tony vérifiée.

À 320 px : Parcours et Contact affichent une largeur utile et une largeur de défilement identiques à 305 px. Aucun débordement horizontal, zéro violation axe détectée (respectivement 24 et 28 contrôles réussis). Le contrôle a révélé puis permis de corriger le nom trop large dans Parcours et un contraste transitoire du bouton final de Contact. Ces audits ne remplacent pas un test sur téléphone physique.

Contrôle complémentaire à 320 px sur l’accueil avec Sherlock ouvert : largeur 305 px, défilement 305 px, zéro violation axe détectée, 24 contrôles réussis. Le bouton de retour en haut conserve un contraste lisible dès son apparition.
