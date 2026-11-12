# Registre des sources

Revue documentaire initiale : 12 novembre 2026. La connexion GitHub authentifiée a permis de consulter les neuf README du compte NacPKZ. Ce registre décrit ce qui a été lu ; il ne revendique aucune exécution des projets sources.

## Identité et expérience

Le brief utilisateur et le CV du 11 novembre 2026 fondent l'identité, les diplômes, la recherche de stage, les périodes et les missions. Le README de profil confirme l'email professionnel et le LinkedIn. Une version de CV plus ancienne a aussi été lue, mais ses projets « à développer » et ses certifications à confirmer ont été exclus.

Le site ne publie pas d'adresse précise dans son interface. Le CV téléchargeable est une copie du document fourni, sans ajout de réalisations. Il doit être relu par son propriétaire avant publication publique.

SmartCheck est documenté dans une présentation de groupe de 45 pages. La page 33 attribue à Can Pekgoz le rôle de Tech Lead, l'architecture technique, l'intégration finale et la participation au COPIL. La page 40 précise l'absence de déploiement et d'audit formel. Le document comporte aussi des objectifs et chiffres simulés, qui ne sont pas présentés comme des gains en exploitation.

## ConsultAI 360

Commit consulté : `d4083fce2c15649e38409d17f981ca86bdfb4134`.

Fichiers ouverts : README ; rapports `docs/08_rapport_final_prediction.md`, `docs/10_rapport_power_bi.md`, `docs/11_validation_reproductibilite.md`, `docs/12_rapport_final_conseil.md` ; `src/assistant/kpi.py`, `src/assistant/llm.py`, `src/ml/final_evaluation_dataco.py` ; journal `reports/data_quality/audit_results.csv` ; journaux d'injection Low, Medium et Critical ; audit indépendant Medium.

Les sept captures utilisées proviennent de `reports/powerbi/screenshots/medium/01.png` à `05.png`, puis `central/06.png` et `07.png`. Elles ont été inspectées sous forme de planche. Certaines captures commerciales comportent des indicateurs vides ; le texte ne les présente pas comme une validation d'exhaustivité. Une légende corrige l'interprétation des écarts de CA sans altérer la capture source.

Les volumes dégradés sont les sommes des `row_counts` des journaux. Les événements injectés ne sont pas des lignes uniques. Les CA proviennent du rapport analytique sur un périmètre distinct du RAW. Les métriques prédictives sont documentées sur DataCo, non sur NexaRetail. Les résultats détaillés des seuils ne sont pas reconstitués.

## Autres projets

| Projet | Source lue et livrable utilisé |
|---|---|
| NovaTel | README, six captures `screenshots/01_Vue_generale.png` à `06_Simulateur.png`, noms intermédiaires du dépôt conservés dans l'audit |
| Olist | README et `results/business_insights.md` ; image `diagrams/olist_data_warehouse_erd.png` |
| ClassicModels | README, analyses et limites documentées |
| FHIR | README, données synthétiques et architecture documentée ; aucune conclusion médicale ajoutée |
| Spotify | README, mention des deux auteurs ; aucune attribution individuelle exhaustive |
| Word2Vec | README, protocole et limites des mesures expérimentales |
| Google Trends | README, indices relatifs et périmètres décrits |

Liens d'origine : [compte GitHub NacPKZ](https://github.com/NacPKZ). Les fiches de projets contiennent les liens directs vers les dépôts et livrables. La disponibilité permanente d'un service externe, notamment Streamlit, n'est pas garantie.

## Méthode de conception

La recherche initiale a consulté onze références : Bruno Simon, Dennis Snellenberg, Niccolò Miranda, Aristide Benoist (fiche historique), Active Theory v4, Elva, Build in Amsterdam (fiche historique), Brittany Chiang, Lusion, The Pudding et Nicky Case. La direction finale combine un univers sombre interactif avec une typographie sans-serif condensée et une navigation animée. Aucun code, capture, logo ou animation signature de ces créateurs n'est utilisé.

La version actuelle utilise Nimbus Sans et Nimbus Sans Narrow, fournies par URW Base35 et hébergées localement. Les anciennes polices P052 et Liberation restent dans les actifs historiques. Les notices se trouvent dans `public/assets/fonts`. Les captures de projet sont les livrables du propriétaire, optimisés en WebP. Aucune photo artificielle ni image de stock n'a été ajoutée.

Références techniques de la refonte : [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) et [View Transitions, MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition). Aucun nouveau service externe ne reçoit les données du visiteur pour ces animations.

## Texte personnel

Les centres d’intérêt et le bénévolat sont des déclarations de Can, repris de ses indications et de son CV : films, séries, animés, documentaires, lecture, curiosité, entrepreneuriat, animation d’ateliers, langue et culture kurdes, collectes et maraudes. Aucun organisme précis, titre culturel préféré, responsabilité associative ni résultat d’atelier supplémentaire n’est ajouté. Les formes et compositions de cette rubrique sont réalisées en CSS et ne représentent pas des photos d’événements.

## Studio et références de conception

Les sites officiels [Dennis Snellenberg](https://dennissnellenberg.com/), [Bruno Simon](https://bruno-simon.com/) et [Brittany Chiang](https://brittanychiang.com/) ont été consultés pendant l'enrichissement. Repères retenus : orientation par le mouvement, exploration libre et contenu personnel lisible. Les composants, le Canvas et les effets sont écrits pour ce portfolio, sans reprendre leur code ou leurs médias.

Les clins d'œil à Stranger Things, Game of Thrones et The Office sont des références d'interface demandées par Can. Ils ne constituent pas une liste de ses séries préférées et ne supposent aucune affiliation. Aucun extrait, musique, image ou logo de ces séries n'est utilisé. « Winter is coming » est une courte référence textuelle ; les messages d'accompagnement sont originaux.

La PL-300 a été confirmée comme objectif par Can lors de cette préparation. Son intitulé et le lien du programme renvoient à [Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/). Aucun badge de réussite n'est fabriqué. Smart Finance 360 est le projet Excel à venir déjà envisagé, sans métrique de résultat inventée.
