# Travail à Rendre : Mise en place d'une API de notes Markdown versionnée sur GitHub

**Auteur :** Janou BERTRAND
**Date :** 16 Mai 2026  
**TD-2 :** cours-notes-api 
**Lien du depot github :** https://github.com/janoujan/cours-notes-api

---

## Sommaire

1. [Réponses aux Questions (Q1 à Q6)](#1-réponses-aux-questions-q1-à-q6)
2. [Évolution du Workflow : Du Push Direct au Modèle Pull Request](#2-évolution-du-workflow--du-push-direct-au-modèle-pull-request)
3. [Procédure de Contribution via Branche Feature](#3-procédure-de-contribution-via-branche-feature)
4. [Création et Validation d'une Pull Request](#4-création-et-validation-dune-pull-request)
5. [Le Rôle de la Revue de Code](#5-le-rôle-de-la-revue-de-code)
6. [Mise en Place des Règles de Protection de Branche](#6-mise-en-place-des-règles-de-protection-de-branche)

---

## 1. Réponses aux Questions (Q1 à Q6)

### Q1. Pourquoi un fichier `.gitignore` est-il indispensable ?

Le fichier `.gitignore` est crucial pour exclure du versionnage les fichiers et dossiers qui n'ont pas leur place dans le dépôt distant. Cela inclut :

- **Les dépendances (`node_modules/`)** : Elles sont volumineuses et peuvent être réinstallées via `npm install`.
- **Les secrets et configurations locales (`.env`)** : Pour éviter les fuites de données sensibles.
- **Les fichiers temporaires ou générés** : Qui pollueraient l'historique de modification sans apporter de valeur.

### Q2. Dans un contexte collaboratif, à quoi sert le `README.md` ?

Le `README.md` sert de porte d'entrée au projet. Il permet aux autres contributeurs de :

- Comprendre les objectifs du projet.
- Installer et lancer l'application rapidement (documentation des prérequis et commandes).
- Connaître les conventions de contribution.
- Identifier les auteurs et les licences.

### Q3. Quelles sont les limites du "push direct" sur la branche principale ?

Le push direct présente plusieurs risques majeurs en milieu professionnel :

- **Risque de casse** : Une erreur de code est immédiatement intégrée à la branche de production.
- **Absence de validation** : Aucun regard extérieur ne vérifie la qualité ou la sécurité du code avant son intégration.
- **Historique pollué** : Difficile de suivre l'évolution logique des fonctionnalités.
- **Incompatibilité avec le CI/CD** : Le déploiement automatique pourrait propager des bugs instantanément.

### Q4. Quelles sont les étapes de création et de validation d'une Pull Request ?

Le processus suit généralement ces étapes :

- 1.**Création d'une branche locale** :

```bash
git checkout -b feature/nom-fonctionnalité
```

- 2.**Développement et commits** :

```bash
git add .
```

puis

```bash
git commit -m "Description"
```

- 3.**Publication de la branche** :

```bash
git push origin feature/nom-fonctionnalité
```

- 4.**Ouverture de la PR** :
Sur GitHub, cliquer sur "Compare & pull request".

- 5.**Exécution des tests (CI)** :
Les GitHub Actions vérifient automatiquement le code.

- 6.**Revue de code** :
Un pair valide les changements.

- 7.**Merge** :
Intégration dans `main` une fois les critères remplis.

### Q5. Quel est l'intérêt de séparer le code (app.js + server.js) ?

Cette séparation facilite les **tests unitaires et d'intégration**. En exportant `app.js` sans appeler `listen()`, on peut simuler des requêtes HTTP avec des outils comme Supertest sans réellement occuper un port réseau, ce qui rend les tests plus rapides et plus stables dans un environnement de CI.

### Q6. Pourquoi imposer la validation par Pull Request et le passage des tests ?

- **Require a pull request before merging** :
Garantit que chaque changement est documenté et potentiellement revu.

- **Require status checks to pass** :
Empêche l'intégration de code qui échoue aux tests automatisés ou aux règles de linting, assurant ainsi la stabilité constante de la branche `main`.

---

## 2. Évolution du Workflow : Du Push Direct au Modèle Pull Request

Le passage d'un modèle de "Push Direct" à un modèle "Pull Request" marque la transition d'un projet personnel vers un projet **industriel et collaboratif**.

Dans le modèle initial, le développeur est seul juge de son travail. Dans le modèle PR, chaque modification est soumise à un **sas de sécurité** (tests automatisés et revue humaine) avant d'être fusionnée. Cela garantit que la branche `main` reste toujours dans un état stable et déployable.

---

## 3. Procédure de Contribution via Branche Feature

Pour toute nouvelle fonctionnalité ou correction (par exemple, l'ajout d'une nouvelle note), la procédure est la suivante :

1. **Mise à jour du dépôt local** :

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Création d'une branche dédiée** :

   ```bash
   git checkout -b feature/ma-nouvelle-note
   ```

3. **Réalisation des modifications** (ajout du fichier `.md`).

4. **Validation locale** (Linting et Tests) :

   ```bash
   npm run lint
   npm test
   ```

---

## 4. Création et Validation d'une Pull Request

Une fois la branche prête :

1. **Pousser la branche sur GitHub** :

   ```bash
   git push origin feature/ma-nouvelle-note

   ```

2. **Ouvrir la Pull Request** sur l'interface GitHub en fournissant une description claire des changements.

3. **Attendre le succès de la CI** : Vérifier que tous les "checks" de GitHub Actions sont au vert.

4. **Demander une revue** à un collaborateur (ou se relire attentivement en mode solo).

---

## 5. Le Rôle de la Revue de Code

La revue de code est une étape de partage de connaissances et de contrôle qualité. Elle vise à :

- **Détecter les erreurs** que l'auteur aurait pu manquer.
- **Assurer la cohérence** du style de code avec le reste du projet.
- **Optimiser les performances** et la sécurité.
- **Partager la connaissance** fonctionnelle du code entre les membres de l'équipe.

---

## 6. Mise en Place des Règles de Protection de Branche

Pour sécuriser le projet, les règles suivantes doivent être configurées dans les paramètres du dépôt GitHub (**Settings > Branches > Branch protection rules**) pour la branche `main` :

1. **Require a pull request before merging** : Interdit le push direct.
2. **Require status checks to pass before merging** : Sélectionner le job `build-and-test` de GitHub Actions.
3. **Include administrators** (optionnel) : Pour s'assurer que même les admins respectent le workflow.

Cette configuration transforme la branche `main` en une zone protégée, garantissant que seul le code validé techniquement et humainement y est admis.
