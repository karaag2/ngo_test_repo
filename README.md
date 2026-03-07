# Projet ONG - Solution MKRT

Bienvenue sur le dépôt du projet MKRT, une application web complète (Frontend et Backend) destinée à une Organisation Non Gouvernementale. Ce projet constitue une solution robuste pour la gestion des activités, des services et de l'administration d'une ONG.

### Liens de Production et Tests

- **Frontend (Vercel)** : [https://ngo-test-repo.vercel.app](https://ngo-test-repo.vercel.app)
- **Backend API (Render)** : [https://fajr-ong.onrender.com](https://fajr-ong.onrender.com)

## 🎯 Architecture du Projet

Ce dépôt est structuré sous forme de **Monorepo** logique, divisé en deux parties distinctes avec une séparation claire des responsabilités :

- **`/frontend`** : L'application web côté client (Next.js 14, React, TailwindCSS, Framer Motion).
- **`/backend`** : L'API RESTful côté serveur (Node.js, Express, Prisma ORM, Zod).

## ✨ Fonctionnalités Principales

- **Site Vitrine & Design** : Une interface moderne, responsive, avec animations fluides.
- **Gestion des Activités** : Publication et affichage des activités (blog) sous forme d'images et de contenus.
- **Présentation des Services** : Mise en avant des services offerts par l'ONG.
- **Formulaire de Contact** : Prise de contact avec gestion des messages côté administration.
- **Espace d'Administration Sécurisé** :
  - Authentification par JWT (Access & Refresh tokens).
  - Sécurité avancée (Mots de passe hashés avec bcrypt, protection CSRF/XSS, Rate Limiting).
  - Authentification à Double Facteur (2FA) via OTP.
  - Gestion des rôles (SUPER_ADMIN et ADMIN).

## 🚀 Démarrage Rapide

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou pnpm
- Une base de données PostgreSQL (ou SQLite par défaut selon la configuration actuelle). _NB : L'instruction d'utiliser PostgreSQL peut être appliquée en changeant le `provider` dans `backend/prisma/schema.prisma`._

### Installation Globale

Cloner le dépôt et installer les dépendances pour chaque sous-projet :

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Configuration et Exécution

Veuillez consulter les README respectifs pour plus de détails :

- 👉 [Documentation du Backend](./backend/README.md)
- 👉 [Documentation du Frontend](./frontend/README.md)

Ce code a été conçu et optimisé pour la production :

- Architecture modulaire et séparation des responsabilités.
- Validation stricte des données avec Zod.
- Documentation API complète via OpenAPI/Swagger.
- Tests automatisés avec Vitest.

Solution déployée et maintenue pour les tests de l'ONG.
