# Cours Notes API

Une API simple construite avec Express.js pour servir des notes de cours au format Markdown, converties dynamiquement en HTML.

## 🚀 Fonctionnalités

- **Liste des notes** : Récupère la liste de tous les fichiers Markdown disponibles dans le dossier `notes/`.
- **Lecture des notes** : Affiche le contenu d'une note spécifique converti en HTML.
- **Conversion Markdown** : Utilise `marked` pour transformer le Markdown en HTML côté serveur.

## 🛠️ Installation

1. **Cloner le dépôt** :

   ```bash
   git clone https://github.com/janoujan/cours-notes-api.git
   cd cours-notes-api
   ```

2. **Installer les dépendances** :

   ```bash
   npm install
   ```

3. **Démarrer le serveur** :

   ```bash
   npm start
   ```

   Le serveur sera accessible sur [http://localhost:3003](http://localhost:3003).

## 📖 Utilisation de l'API

### 1. Vérifier le fonctionnement

- **URL** : `GET /`
- **Description** : Message de bienvenue simple pour confirmer que l'API est en ligne.

### 2. Lister toutes les notes

- **URL** : `GET /notes`
- **Réponse** : Un tableau JSON contenant les noms des fichiers (sans l'extension `.md`).

  ```json
  ["git-introduction"]
  ```

### 3. Lire une note spécifique

- **URL** : `GET /notes/:slug`
- **Exemple** : `GET /notes/git-introduction`
- **Réponse** : Le contenu HTML généré à partir du fichier Markdown correspondant.

## 📂 Structure du projet

- `server.js` : Le point d'entrée de l'application Express.
- `notes/` : Répertoire contenant les fichiers `.md` de vos cours.
- `package.json` : Configuration du projet et dépendances.

## 📦 Dépendances principales

- [Express.js](https://expressjs.com/) : Framework web pour Node.js.
- [Marked](https://marked.js.org/) : Compilateur Markdown vers HTML.

## 📄 Licence

Ce projet est sous licence ISC.
