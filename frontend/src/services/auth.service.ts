/**
 * ─── Services d'Authentification (Client-Side) ────────────────
 */

import type { SignUpInput, LoginInput } from "@/src/lib/auth.validators";

// URL de base du serveur backend Express
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

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
    if (json.necessite2FA) {
      return {
        success: true,
        requires2FA: true,
        tempAdminId: json.adminTemporaire,
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
    if (!res.ok || !json.codeValide) {
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

/**
 * ─── Configuration 2FA ───────────────────────────────────────
 */

export type Setup2FAResponse =
  | { success: true; qrCode: string; manualKey: string; message?: string }
  | { success: false; message?: string };

export const setup2FAService = async (): Promise<Setup2FAResponse> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/setup-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json.message || "Erreur lors de la configuration du 2FA",
      };
    }

    return {
      success: true,
      qrCode: json.qrCode,
      manualKey: json.manualKey,
    };
  } catch {
    return {
      success: false,
      message: "Impossible de joindre le serveur. Réessayez.",
    };
  }
};

export const confirmSetup2FAService = async (
  code: string,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/confirm-setup-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ code }),
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json.message || "Code 2FA incorrect ou invalide",
      };
    }

    return { success: true, message: json.message };
  } catch {
    return {
      success: false,
      message: "Impossible de joindre le serveur. Réessayez.",
    };
  }
};
