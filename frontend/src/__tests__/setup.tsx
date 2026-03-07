/**
 * =============================================================
 *  SETUP GLOBAL DES TESTS — Fichier de configuration Vitest
 * =============================================================
 *
 * Ce fichier s'exécute AVANT chaque fichier de test.
 * Il configure l'environnement, les matchers personnalisés
 * et les mocks globaux nécessaires.
 */

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// ─── Nettoyage automatique après chaque test ──────────────────
// Supprime le DOM rendu pour éviter les fuites entre les tests.
afterEach(() => {
  cleanup();
});

// ─── Mock de next/image ───────────────────────────────────────
// Next.js Image est un composant complexe avec optimisation côté serveur.
// En test, on le remplace par une simple balise <img>.
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // Convertir les props Next.js en props HTML standard
    const { fill, priority, sizes, ...rest } = props;
    return <img {...rest} data-fill={fill ? "true" : undefined} />;
  },
}));

// ─── Mock de next/link ────────────────────────────────────────
// Remplace le composant Link de Next.js par une simple balise <a>.
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// ─── Mock de next/navigation ──────────────────────────────────
// Simule les hooks de navigation Next.js pour les composants client.
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(),
}));

// ─── Mock de next/dynamic ─────────────────────────────────────
// Simule le chargement dynamique de Next.js
vi.mock("next/dynamic", () => ({
  __esModule: true,
  default: (loader: () => Promise<{ default: React.ComponentType }>) => {
    // Retourne un composant placeholder
    const DynamicComponent = (props: Record<string, unknown>) => (
      <div data-testid="dynamic-component" {...props} />
    );
    DynamicComponent.displayName = "DynamicComponent";
    return DynamicComponent;
  },
}));

// ─── Mock de framer-motion ────────────────────────────────────
// Les animations Framer Motion ne sont pas pertinentes dans les tests unitaires.
// On remplace les composants animés par de simples éléments HTML.
vi.mock("framer-motion", () => {
  const motionProxy = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        // Retourne un composant qui rend l'élément HTML correspondant
        const Component = ({
          children,
          initial,
          animate,
          whileInView,
          whileHover,
          viewport,
          variants,
          transition,
          ...rest
        }: any) => {
          const Tag = prop as any;
          return <Tag {...rest}>{children}</Tag>;
        };
        Component.displayName = `motion.${prop}`;
        return Component;
      },
    },
  );

  return {
    motion: motionProxy,
    m: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
    useTransform: () => ({ set: vi.fn(), get: () => 0 }),
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
  };
});

// ─── Mock de next-themes ──────────────────────────────────────
// Simule le provider et le hook de gestion du thème.
vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    resolvedTheme: "light",
    themes: ["light", "dark"],
  }),
}));

// ─── Mock de maplibre-gl ──────────────────────────────────────
// MapLibre GL nécessite WebGL, indisponible dans jsdom.
vi.mock("maplibre-gl", () => ({
  Map: vi.fn(),
  Marker: vi.fn(() => ({
    setLngLat: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
    setPopup: vi.fn().mockReturnThis(),
    getElement: vi.fn(() => document.createElement("div")),
  })),
  Popup: vi.fn(() => ({
    setHTML: vi.fn().mockReturnThis(),
    setLngLat: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
  })),
  NavigationControl: vi.fn(),
}));

// ─── Mock de embla-carousel-react ─────────────────────────────
// Le carousel nécessite un vrai DOM mesuré, incompatible avec jsdom.
vi.mock("embla-carousel-react", () => ({
  __esModule: true,
  default: () => {
    const ref = vi.fn();
    const api = {
      canScrollPrev: () => true,
      canScrollNext: () => true,
      scrollPrev: vi.fn(),
      scrollNext: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
    };
    return [ref, api];
  },
}));

// ─── Mock de radix-ui ─────────────────────────────────────────
// Radix UI components require portal and complex behavior.
vi.mock("radix-ui", () => {
  const React = require("react");

  const createMockComponent = (displayName: string, defaultTag = "div") => {
    const Component = ({
      children,
      asChild,
      ...props
    }: {
      children?: React.ReactNode;
      asChild?: boolean;
      [key: string]: unknown;
    }) =>
      React.createElement(
        asChild ? React.Fragment : defaultTag,
        props,
        children,
      );
    Component.displayName = displayName;
    return Component;
  };

  const MockRoot = ({ children }: { children: React.ReactNode }) => children;

  const Dialog = {
    Root: MockRoot,
    Trigger: createMockComponent("Dialog.Trigger", "button"),
    Close: createMockComponent("Dialog.Close", "button"),
    Portal: ({ children }: { children: React.ReactNode }) => children,
    Overlay: createMockComponent("Dialog.Overlay"),
    Content: createMockComponent("Dialog.Content"),
    Title: createMockComponent("Dialog.Title", "h2"),
    Description: createMockComponent("Dialog.Description", "p"),
  };

  const RadioGroup = {
    Root: createMockComponent("RadioGroup.Root"),
    Item: createMockComponent("RadioGroup.Item", "button"),
    Indicator: createMockComponent("RadioGroup.Indicator", "span"),
  };

  const Label = {
    Root: createMockComponent("Label.Root", "label"),
  };

  return { Dialog, RadioGroup, Label };
});

// ─── Suppression des warnings React dans la console de test ───
// Silently ignore missing CSS & image imports in test environment
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  const message = typeof args[0] === "string" ? args[0] : "";
  if (
    message.includes("Could not parse CSS") ||
    message.includes("Not implemented: navigation")
  ) {
    return;
  }
  originalConsoleError.apply(console, args);
};
