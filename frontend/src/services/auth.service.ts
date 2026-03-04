/**
 * ─── Service d'Authentification (Client-Side) ────────────────
 *
 * Gère toutes les requêtes HTTP liées à l'authentification
 * côté client (signup, login, vérification 2FA).
 *
 * Chaque service retourne un objet typé avec un champ `success`
 * pour faciliter la gestion d'erreurs dans les composants React.
 */

import type { SignUpInput, LoginInput } from "@/src/lib/auth.validators";

// URL de base du serveur backend Express
const API_URL = "http://localhost:7000";

// ─── Types de Réponse ────────────────────────────────────────

/** Réponse du service d'inscription */
export type SignupResponse =
  | { success: true }
  | {
      success: false;
      fieldErrors?: Record<string, string[]>;
      message?: string;
    };

/** Réponse du service de connexion (avec support 2FA) */
export type LoginResponse =
  | { success: true; requires2FA?: boolean; tempAdminId?: string }
  | {
      success: false;
      fieldErrors?: Record<string, string[]>;
      message?: string;
    };

/** Réponse du service de vérification 2FA */
export type Verify2FAResponse =
  | { success: true }
  | { success: false; message?: string };

// ─── Inscription ─────────────────────────────────────────────

/**
 * Envoie les données d'inscription au backend.
 * POST /api/auth/register
 *
 * @param data - Les données validées du formulaire d'inscription
 * @returns SignupResponse avec le statut et les erreurs éventuelles
 */
export const signupService = async (
  data: SignUpInput,
): Promise<SignupResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const json = await res.json();

    // Gestion des erreurs retournées par l'API
    if (!res.ok) {
      return {
        success: false,
        message: json.message || "Une erreur est survenue",
        fieldErrors: json.fieldErrors,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      message: "Impossible de joindre le serveur. Réessayez.",
    };
  }
};

// ─── Connexion ───────────────────────────────────────────────

/**
 * Authentifie un administrateur via email/mot de passe.
 * POST /api/auth/login
 *
 * Si le 2FA est activé, retourne `requires2FA: true` avec
 * l'identifiant temporaire pour la vérification du code.
 *
 * @param data - Les identifiants de connexion validés
 * @returns LoginResponse avec le statut et/ou les infos 2FA
 */
export const loginService = async (
  data: LoginInput,
): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const json = await res.json();

    // Gestion des erreurs retournées par l'API
    if (!res.ok) {
      return {
        success: false,
        message: json.message || "Email ou mot de passe incorrect",
        fieldErrors: json.fieldErrors,
      };
    }

    // Si le backend indique que le 2FA est requis
    if (json.requires2FA) {
      return {
        success: true,
        requires2FA: true,
        tempAdminId: json.tempAdmin,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      message: "Impossible de joindre le serveur. Réessayez.",
    };
  }
};

// ─── Vérification 2FA ────────────────────────────────────────

/**
 * Vérifie le code 2FA saisi par l'administrateur.
 * POST /api/auth/check-2fa
 *
 * @param code        - Le code à 6 chiffres de l'application d'authentification
 * @param tempAdminId - L'identifiant temporaire retourné lors du login
 * @returns Verify2FAResponse avec le statut de la vérification
 */
export const verify2FAService = async (
  code: string,
  tempAdminId: string,
): Promise<Verify2FAResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/check-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ code, tempAdminId }),
    });

    const json = await res.json();

    // Vérification combinée : statut HTTP + validation métier
    if (!res.ok || !json.isCodeCorrect) {
      return {
        success: false,
        message: json.message || "Code 2FA incorrect ou invalide",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      message: "Impossible de joindre le serveur. Réessayez.",
    };
  }
};
