# Frontend - Application Web MKRT ONG

Le frontend du projet MKRT est une application web moderne (site vitrine + espace admin) optimisée pour le SEO, les performances et l'expérience utilisateur.

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

## 🌟 Fonctionnalités Structurantes

- **Performance** : Composants React Server by default, images optimisées (WEBP/AVIF), et séparation du thread d'animation.
- **Dashboard Admin** : Interface d'administration protégée, avec appels API authentifiés via cookies HttpOnly gérés automatiquement par le backend.
- **Responsivité** : Conception Mobile-First.
- **Thèmes** : Support des modes Clair et Sombre (next-themes).
