"use client";

/**
 * ─── Formulaire de Vérification 2FA ──────────────────────────
 *
 * Écran de saisie du code d'authentification à deux facteurs.
 * Affiché après une connexion réussie lorsque le 2FA est activé.
 *
 * Le `tempAdminId` est récupéré depuis les paramètres d'URL
 * (transmis par la page de connexion).
 */

import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { verify2FAService } from "@/src/services/auth.service";

export const Verify2FAForm = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupération de l'identifiant temporaire depuis l'URL
  const searchParams = useSearchParams();
  const tempAdminId = searchParams.get("tempAdminId");

  /** Vérification du code 2FA auprès du backend */
  const handleVerify = async () => {
    if (!tempAdminId) {
      setError("ID de session manquant. Veuillez vous reconnecter.");
      return;
    }

    setError(null);
    setIsPending(true);

    try {
      const result = await verify2FAService(code, tempAdminId);

      if (!result.success) {
        setError(result.message || "Code invalide");
        setIsPending(false);
        return;
      }

      setIsRedirecting(true);
      // Redirection vers le tableau de bord
      router.replace("/admin/dashboard");
    } catch (e: any) {
      setError(e.message || "Une erreur inattendue est survenue.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* En-tête avec Icône et Titre */}
      <div className="space-y-3">
        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10 backdrop-blur-md">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-main tracking-tight">
          Vérifier votre identité
        </h1>
        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-md">
          Votre compte est protégé par l'authentification à deux facteurs.
          Saisissez le code à 6 chiffres de votre application.
        </p>
      </div>

      {/* Carte de Saisie du Code */}
      <div className="bg-card border border-border/40 rounded-4xl p-8 md:p-10 flex flex-col gap-y-8 shadow-premium relative overflow-hidden">
        {/* Décoration d'arrière-plan */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Message d'Erreur */}
        {error && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-y-4 text-center relative z-10">
          <label className="text-[10px] uppercase font-black tracking-widest text-main/60">
            Code d'authentification
          </label>

          {/* Input du Code 2FA */}
          <div className="relative w-full max-w-sm mx-auto">
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="000 000"
              disabled={isPending}
              className="w-full bg-muted/10 border border-border rounded-xl h-16 text-center text-3xl font-black tracking-[0.5em] focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-mono placeholder:text-foreground/20 text-main disabled:opacity-50"
              autoFocus
            />
          </div>
        </div>

        {/* Bouton de Vérification */}
        <Button
          onClick={handleVerify}
          disabled={code.length !== 6 || isPending || isRedirecting}
          className="w-full max-w-sm mx-auto h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:shadow-none disabled:transform-none relative z-10"
        >
          {isRedirecting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Redirection...
            </>
          ) : isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Vérification en cours...
            </>
          ) : (
            "Vérifier & Continuer"
          )}
        </Button>
      </div>

      {/* Navigation en Bas de Page */}
      <div className="flex max-md:flex-col max-md:gap-y-4 items-center justify-between pt-6 border-t border-border px-2">
        <Link
          href="/admin/auth/login"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-main transition-colors font-bold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à la connexion
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-main transition-colors font-bold"
        >
          <KeyRound className="w-4 h-4" />
          Utiliser une clé de secours
        </Link>
      </div>
    </div>
  );
};
