# Backend - API REST Solution ONG

Le backend du projet fournit une API RESTful sécurisée permettant la gestion complète des données de l'organisation (Activités, Services, Contacts, Administrateurs).

**URL de production** : [https://fajr-ong.onrender.com](https://fajr-ong.onrender.com)

## 🛠️ Stack Technique

- **Runtime** : Node.js
- **Framework** : Express.js
- **Langage** : TypeScript
- **ORM** : Prisma
- **Validation** : Zod
- **Sécurité** : Helmet, Express Rate Limit, bcrypt, JWT (JSON Web Tokens)
- **Tests** : Vitest, Supertest
- **Documentation** : Swagger UI, OpenAPI 3.1

## ⚙️ Configuration & Installation

1. **Variables d'Environnement**
   Créez un fichier `.env` à la racine de `/backend` :

   ```env
   DATABASE_URL="file:./dev.db" # Modifiez cette URL si vous passez sous PostgreSQL
   JWT_ACCESS_SECRET="votre_super_secret_access_tres_long"
   JWT_REFRESH_SECRET="votre_super_secret_refresh_tres_long"
   PORT=7000
   NODE_ENV="development"
   FRONTEND_URL="http://localhost:8000"
   ```

2. **Génération Prisma et Base de données**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Initialisation des données (Seeding)**
   Prisma a été configuré pour lancer automatiquement le seed lors de l'exécution de migrations ou par commande manuelle :
   ```bash
   npx prisma db seed
   ```
   Ce script crée un Super Admin par défaut (`admin@fajr.com`) ainsi que les services et articles de blog initiaux.

## 🚀 Démarrage

```bash
# Mode développement
npm run dev

# Tests
npm run test
```

## 📖 Documentation de l'API

Une fois le serveur lancé, la documentation interactive Swagger/OpenAPI est accessible à l'adresse suivante :
👉 `http://localhost:7000/api-docs`

## 🔒 Sécurité Implémentée

- Validation de toutes les requêtes (body, params) avec `Zod`.
- Rate limiting global et spécifique par IP.
- Hashage des mots de passe (bcrypt, 12 rounds).
- Cookies HttpOnly / Secure pour les tokens.
- Support du 2FA (Authenticator App) pour les administrateurs.
