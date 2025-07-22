# Backend - API Authentification (Node.js + Express + MongoDB)

## ⚙️ Prérequis

- Node.js >= 16
- MongoDB local ou Atlas
- npm

## 🚀 Lancement du projet

```bash
cd backend
npm install
npm run dev
Le serveur démarre sur http://localhost:5000

🔐 Variables d’environnement (.env)
Créer un fichier .env à la racine du dossier backend :

.env

PORT=5000
MONGO_URI=mongodb://localhost:27017/nom-de-ta-bdd
JWT_SECRET=monsecret


npm run test


Les fichiers de tests sont dans le dossier tests/ :
tests/login.test.js → Tests d’intégration

⚙️ CI/CD avec GitHub Actions
📄 .github/workflows/ci.yml
Ce pipeline exécute automatiquement les tests à chaque push.


✅ Bonnes pratiques appliquées
Séparation contrôleurs / routes / middlewares

Validation des entrées utilisateur (ex: middleware validate)

Utilisation de JWT pour l’authentification

Tests avec base Mongo isolée (memory server)

