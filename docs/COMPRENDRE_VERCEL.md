# Comment ton portfolio est en ligne

Ton site principal est ici : https://nacpkz-portfolio.vercel.app/

Ton code est ici : https://github.com/NacPKZ/NacPKZ-Portfolio

## Le rôle de chacun

**GitHub conserve les fichiers et leur historique.** C’est le dossier du projet, avec les versions précédentes. Un commit correspond à une modification enregistrée.

**Vercel construit et héberge le site.** Il récupère les fichiers depuis GitHub, prépare une version utilisable dans un navigateur, puis la sert à l’adresse publique. Un déploiement correspond à une version du site mise en ligne.

**Le navigateur du visiteur affiche le portfolio.** Il télécharge les fichiers produits, les images et le CV. Le site fonctionne sans connexion à ChatGPT.

## Ce que j’ai configuré pour toi

1. Création du dépôt public `NacPKZ/NacPKZ-Portfolio` sur ton compte.
2. Développement en React et TypeScript, avec Vite pour construire le site et GSAP pour certaines animations.
3. Import de ce dépôt dans ton espace Vercel **Nac**, dont le nom technique est `nac18`.
4. Création du projet Vercel **nacpkz-portfolio** et sélection de la branche **main** pour la production.
5. Configuration du dossier racine du dépôt et de la sortie **dist**.
6. Installation avec `npm ci`, puis construction avec `npm run validate && npm run build`.
7. Publication et ouverture de l’adresse réellement attribuée : https://nacpkz-portfolio.vercel.app/.

Tu n’as pas à envoyer manuellement les fichiers sur Vercel après chaque changement.

## Ce qui se passe quand tu modifies un fichier

1. Tu modifies un fichier dans GitHub, par exemple ton CV.
2. Tu enregistres la modification avec **Commit changes**.
3. Vercel voit le nouveau commit sur `main` et démarre un déploiement.
4. Il installe les dépendances du projet.
5. Les contrôles vérifient TypeScript, les règles de code et les tests automatiques.
6. Vite transforme les sources en fichiers HTML, CSS et JavaScript, placés dans `dist`.
7. Si le build réussit, la nouvelle version remplace la précédente à la même URL.

Si la compilation échoue, la dernière production réussie reste disponible. Les tests ne prouvent pas à eux seuls qu’un texte est exact ou qu’une mise en page est parfaite : il faut aussi ouvrir le site pour contrôler le résultat.

## Remplacer ton CV

Garde exactement ce chemin et ce nom : `public/assets/Can_Pekgoz_CV.pdf`.

Dans GitHub : ouvre `public`, puis `assets`, utilise **Add file**, **Upload files**, dépose le nouveau PDF portant le même nom, puis valide le commit. Attends le succès du déploiement Vercel et teste le lien du CV sur le site.

Le guide complet est dans [MODIFIER_MON_PORTFOLIO.md](MODIFIER_MON_PORTFOLIO.md).

## Où vérifier que la publication a réussi

Dans Vercel, ouvre l’espace **Nac**, puis le projet **nacpkz-portfolio**, puis **Deployments**. Le bon déploiement doit afficher :

- Le statut **Ready**.
- L’environnement **Production**.
- La branche **main**.
- Le commit correspondant à ta modification.

L’onglet **Actions** de GitHub affiche aussi les validations et la copie de secours GitHub Pages. Ton adresse principale reste celle de Vercel.

## Comment fonctionne le contact

La page Contact et le volet **M’écrire** du Studio préparent un email pour `canpekgoz.pro@gmail.com`. Le sujet, le texte et le projet choisi sont déjà remplis. Le visiteur choisit son application mail, Gmail ou Outlook, puis confirme l’envoi dans sa messagerie.

Le site n’affiche pas de faux message « envoyé ». Il ne possède pas de serveur d’envoi automatique d’emails. Cela évite de demander un accès à la messagerie du visiteur ou d’exposer une clé d’envoi dans le code public.

## Sources officielles

- Fonctionnement Git/Vercel : https://vercel.com/docs/git
- Déploiements : https://vercel.com/docs/deployments
- Liens qui préparent un email : https://www.rfc-editor.org/rfc/rfc6068.html
