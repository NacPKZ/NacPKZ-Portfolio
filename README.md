# Can Pekgoz | Data, Intelligence & Business Strategy

Portfolio indépendant, bilingue FR/EN, développé avec React 19, TypeScript, Vite et GSAP. Projets documentés, études de cas, laboratoire de scénarios et présentation personnelle.

## État de publication

Dépôt public : https://github.com/NacPKZ/NacPKZ-Portfolio. Publication Vercel autorisée, en cours de préparation après la refonte.

Le projet est autonome : aucun compte ChatGPT, composant OpenAI, service d'IA ou serveur privé n'est nécessaire aux visiteurs. Tout le contenu et les calculs du Lab s'exécutent dans le navigateur.

## Développement

Node.js 22, npm et Git. Le lockfile fixe les versions résolues.

```bash
npm ci
npm run dev
npm run validate
npm run build
```

`validate` exécute TypeScript, ESLint et Vitest. Le build Vercel exécute cette validation avant de générer `dist`.

## Expérience

- Navigation fixe et menu mobile modal, recherche globale Ctrl K ou Cmd K.
- Recherche de projets insensible aux accents, combinable avec les catégories.
- Index et galerie visuelle, avec préférence conservée localement.
- Transitions de pages natives avec repli GSAP ; chapitres contextuels des études de cas.
- Galerie de captures authentiques, modules ROI/erreurs/qualité et mode recruteur avec CV.
- Rubrique « Ce qui m’anime » : films, séries, animés, documentaires, lecture, curiosité, ateliers, culture kurde et solidarité.
- Studio à cinq volets : Tous les projets, La suite, Mon carnet, Ambiance et Scène post-générique.
- Objectifs à venir : projet Excel Smart Finance 360 et préparation PL-300, sans prétendre à leur réalisation.
- Préférence de mouvement réduit, mode lecture, trois accents et retour en haut de page accessibles au clavier.

Les routes par fragment fonctionnent sur Vercel et GitHub Pages : `#/fr/`, `#/en/work`, `#/fr/work/consultai`, `#/fr/about`, `#/fr/lab`, `#/fr/recruiter`, `#/fr/contact`. La langue conserve la page courante. Le CV et les captures authentiques restent en français.

## Structure

| Emplacement | Rôle |
|---|---|
| `src/data/projects.ts` | Neuf projets, résultats, sources, limites et captures |
| `src/data/interests.ts` | Présentation personnelle FR/EN, déclarative |
| `src/data/profile.ts` | Expériences professionnelles |
| `src/components/CommandPalette.tsx` | Navigation et recherche au clavier |
| `src/components/PersonalInterlude.tsx` | Présentation personnelle interactive |
| `src/components/ChapterNav.tsx` | Chapitres d'une étude de cas |
| `src/components/ProjectIndex.tsx` | Recherche, catégories, index et galerie |
| `src/components/MotionScene.tsx` | Animations progressives et nettoyage GSAP |
| `src/utils/` | Routage, recherche, calculs et origine publique |
| `src/styles/` | Mise en page, responsive, impression et préférences de mouvement |
| `public/assets/` | Captures, CV, image de partage et polices locales licenciées |
| `tests/` | Calculs, contenu, recherche et métadonnées de déploiement |
| `vercel.json` | Build validé et sortie Vercel |
| `.github/workflows/validate.yml` | Contrôles sur push et pull request |
| `.github/workflows/pages.yml` | Alternative Pages déclenchée manuellement |
| `docs/DEPLOYMENT.md` | Publication et contrôle de l'URL réelle |
| `docs/IDEES.md` | 100 pistes, avec distinction entre livré et proposé |

## Publication

Vercel est la cible principale, connecté au dépôt dédié. Le build vérifié s'exécute avant chaque déploiement. Un changement qui échoue à TypeScript, au lint, aux tests ou au build ne remplace pas la production.

Créer des branches de travail et valider les changements avant fusion dans `main`. Le contrôle GitHub `Validate portfolio / validate` peut être rendu obligatoire dans une règle de branche, selon les options disponibles du compte. Cette règle n'est pas activée par un simple fichier de workflow.

Voir [le guide de déploiement](docs/DEPLOYMENT.md). L'origine publique est lue dans `PUBLIC_SITE_URL` ou les variables système Vercel. Aucun ancien domaine d'aperçu n'est codé en dur. Sans domaine connu, le build n'invente pas de canonical et désactive l'indexation dans `robots.txt`.

## Créer l'archive de source

Après validation et commit local :

```bash
npm run release:archive
```

Le script utilise `git archive` et refuse les fichiers locaux sensibles ou les modifications non committées. Il exclut les dépendances, sorties de build et secrets. Le ZIP contient le source à installer, et non une revendication de publication.

## Nature du contenu

ConsultAI utilise NexaRetail synthétique et un volet ML DataCo indépendant. Les ROI sont des hypothèses, les résultats projet sont documentés sans réexécution complète. Aucun client fictif n'est présenté comme réel. Les textes personnels sont déclaratifs ; aucun rôle associatif précis ni préférence culturelle supplémentaire n'est inventé.

Sources, licences, maintenance et limites des tests : [SOURCES](docs/SOURCES.md), [MAINTENANCE](docs/MAINTENANCE.md), [VALIDATION](docs/VALIDATION.md).

## Modifier mon CV ou mes informations

Voir [le guide simple, sans terminal](docs/MODIFIER_MON_PORTFOLIO.md). Pour changer seulement le CV, remplacer `public/assets/Can_Pekgoz_CV.pdf` en gardant ce nom.

## Refonte

Voir `docs/REFONTE.md` : 20 changements de structure et de fonction, 36 nouvelles séquences CSS et six GIF originaux. Sélection comparative, itinéraires, explorateur d’expériences et brouillon de contact inclus.
