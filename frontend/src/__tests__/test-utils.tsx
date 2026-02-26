/**
 * =============================================================
 *  TEST HELPER — Render avec les Providers nécessaires
 * =============================================================
 *
 * Fonction utilitaire pour rendre un composant avec tous les
 * providers nécessaires (ThemeProvider, etc.)
 * Utilisation : renderWithProviders(<MonComposant />) au lieu de render(...)
 */

import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";

/**
 * Wrapper qui fournit le contexte de thème et tout autre
 * provider global nécessaire aux composants dans les tests.
 */
function AllProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

/**
 * Custom render qui enveloppe automatiquement le composant
 * dans les providers globaux de l'application.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Ré-exporter tout @testing-library/react pour pouvoir
// importer depuis un seul endroit
export * from "@testing-library/react";
export { renderWithProviders as render };
