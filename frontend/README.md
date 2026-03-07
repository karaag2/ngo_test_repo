# Frontend - Application Web Solution ONG

Le frontend est une application web moderne (site vitrine et espace administration) optimisée pour le SEO, les performances et l'expérience utilisateur.

**Lien de test (Vercel)** : [https://ngo-test-repo.vercel.app](https://ngo-test-repo.vercel.app)

## 🛠️ Stack Technique

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS, class-variance-authority, clsx
- **UI Components** : Radix UI, Shadcn/ui
- **Animations** : Framer Motion (Optimisé via LazyMotion)
- **State Management & Fetching** : SWR
- **Validation de formulaires** : React Hook Form + Zod
- **Cartographie** : MapLibre GL
- **Tests** : Vitest, React Testing Library

## ⚙️ Configuration & Installation

Créez un fichier `.env.local` à la racine de `/frontend` :

```env
NEXT_PUBLIC_API_URL="http://localhost:7000/api"
```

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en mode développement (sur le port 8000)
npm run dev

# Lancer la suite de tests
npm run test
```

## Fonctionnalités Principales

- **Performance** : Composants React Server, images optimisées et thread d'animation séparé.
- **Dashboard Admin** : Interface protégée avec authentification sécurisée par cookies HttpOnly.
- **Responsivité** : Conception adaptative (Mobile-First).
- **Thèmes** : Support des modes Clair et Sombre.
