"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import {
  Copy,
  ShieldCheck,
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  setup2FAService,
  confirmSetup2FAService,
} from "@/src/services/auth.service";

export const Setup2FAForm = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [manualKey, setManualKey] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoadingSetup, setIsLoadingSetup] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchSetupData = async () => {
      setIsLoadingSetup(true);
      setErrorMsg("");
      const res = await setup2FAService();
      if (res.success && res.qrCode && res.manualKey) {
        setQrCode(res.qrCode);
        setManualKey(res.manualKey);
      } else {
        setErrorMsg(
          res.message ||
            "Erreur lors de la préparation de la configuration 2FA.",
        );
      }
      setIsLoadingSetup(false);
    };
    fetchSetupData();
  }, []);

  /** Copie la clé manuelle dans le presse-papiers */
  const handleCopy = () => {
    navigator.clipboard.writeText(manualKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /** Vérifie le code saisi pour activer le 2FA */
  const handleEnable2FA = async () => {
    setIsPending(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await confirmSetup2FAService(code);
      if (res.success) {
        setSuccessMsg(
          res.message ||
            "Authentification à deux facteurs activée avec succès !",
        );
        setCode("");
        setTimeout(() => {
          router.push("/admin/dashboard/profile");
        }, 1500);
      } else {
        setErrorMsg(res.message || "Code invalide");
        setIsPending(false);
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Une erreur inattendue est survenue.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-y-10 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* En-tête de la Page */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[9px] w-fit border border-primary/10 backdrop-blur-md">
          <ShieldCheck size={12} />
          <span className="tracking-[0.15em]">SÉCURITÉ</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-main tracking-tight">
          Authentification à Deux Facteurs
        </h1>
        <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-2xl">
          Sécurisez votre compte administrateur en ajoutant une couche de
          protection supplémentaire via votre appareil mobile.
        </p>
      </div>

      <div className="flex flex-col gap-y-6">
        {/* ─── Étape 1 : Scanner le QR Code ─── */}
        <div className="bg-card border border-border/40 rounded-[2.5rem] p-6 md:p-8 flex flex-col gap-y-6 shadow-premium relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          {/* Numéro d'Étape */}
          <div className="flex items-center gap-x-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-sm">
              1
            </div>
            <h2 className="text-xl font-black text-main">Scanner le QR Code</h2>
          </div>

          {/* Feedback messages inside Étape 1 */}
          {errorMsg && !manualKey && (
            <div className="bg-destructive/10 text-destructive border-l-4 border-destructive p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          {!errorMsg && (
            <p className="text-sm text-muted-foreground font-medium leading-relaxed relative z-10">
              Ouvrez votre application d'authentification (Google Authenticator,
              Microsoft Authenticator ou Authy) et scannez le code ci-dessous.
            </p>
          )}

          {/* Zone du QR Code et Clé Manuelle */}
          <div className="bg-muted/10 border border-border/40 rounded-3xl p-6 flex max-md:flex-col gap-8 items-center mt-2 relative z-10">
            {/* Espace du QR Code */}
            <div className="bg-primary/10 p-6 rounded-[24px] flex items-center justify-center w-full md:w-56 aspect-square shrink-0 group border border-primary/10">
              <div className="bg-white w-full h-full rounded-2xl flex items-center justify-center p-3 shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                {isLoadingSetup ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : qrCode ? (
                  <img
                    src={qrCode}
                    alt="QR Code 2FA"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-black/80 rounded-lg p-1 opacity-90 mask-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_4px)]">
                    <div className="w-full h-full mask-[repeating-linear-gradient(-45deg,#000_0,#000_2px,transparent_0,transparent_4px)] bg-black/90" />
                  </div>
                )}
                {/* Badge FJ au Centre */}
                <div className="absolute bg-white px-2 py-0.5 text-[10px] font-black rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm text-main">
                  FJ
                </div>
              </div>
            </div>

            {/* Clé Manuelle */}
            <div className="flex flex-col justify-center w-full">
              <div className="bg-card border border-border/40 shadow-sm rounded-2xl p-5 flex flex-col gap-y-3 w-full">
                <span className="text-[10px] font-black text-main/50 uppercase tracking-[0.15em]">
                  Clé d'entrée manuelle
                </span>
                <div className="flex items-center justify-between bg-muted/10 rounded-xl p-3">
                  <span className="font-mono text-primary font-bold tracking-widest text-sm md:text-base wrap-break-word">
                    {isLoadingSetup ? "..." : manualKey || "INDISPONIBLE"}
                  </span>
                  {/* Bouton Copier */}
                  <button
                    onClick={handleCopy}
                    disabled={isLoadingSetup || !manualKey}
                    className="text-primary/70 hover:text-primary transition-colors p-1.5 hover:bg-primary/10 rounded-lg cursor-pointer disabled:opacity-50"
                    title="Copier la clé"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-growth" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-5 italic font-medium">
                Problème de scan ? Entrez le code manuellement dans votre
                application.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Étape 2 : Vérifier le Code ─── */}
        {manualKey && (
          <div className="bg-card border border-border/40 rounded-[2.5rem] p-6 md:p-8 flex flex-col gap-y-6 shadow-premium relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Numéro d'Étape */}
            <div className="flex items-center gap-x-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-sm shadow-sm">
                2
              </div>
              <h2 className="text-xl font-black text-main">Vérifier le Code</h2>
            </div>

            <p className="text-sm text-muted-foreground font-medium leading-relaxed relative z-10">
              Entrez le code à 6 chiffres de votre application pour confirmer
              que la configuration est correcte.
            </p>

            {/* Feedback messages inside Étape 2 */}
            {errorMsg && (
              <div className="bg-destructive/10 text-destructive border-l-4 border-destructive p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
            )}
            {successMsg && (
              <div className="bg-green-500/10 text-green-600 dark:text-green-400 border-l-4 border-green-500/40 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="text-sm font-bold">{successMsg}</p>
              </div>
            )}

            {/* Saisie du Code et Bouton de Validation */}
            <div className="mt-2 relative z-10">
              <label className="text-[10px] uppercase font-black tracking-widest text-main/60 mb-3 block ml-1">
                Code d'authentification
              </label>
              <div className="flex max-md:flex-col items-center gap-4">
                {/* Input du Code à 6 Chiffres */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    placeholder="0 0 0  0 0 0"
                    className="w-full bg-muted/10 border border-border rounded-xl h-14 text-center text-xl font-black tracking-widest focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-mono placeholder:text-foreground/20 text-main"
                  />
                </div>
                {/* Bouton d'Activation */}
                <Button
                  onClick={handleEnable2FA}
                  disabled={code.length !== 6 || isPending || !!successMsg}
                  className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-xs flex items-center gap-2 max-md:w-full transition-all shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:shadow-none disabled:transform-none"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Activation en cours...
                    </>
                  ) : !!successMsg ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Redirection...
                    </>
                  ) : (
                    <>
                      Activer le 2FA
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation en Bas de Page */}
      <div className="flex max-md:flex-col max-md:gap-y-4 items-center justify-between pt-8 border-t border-border mt-4 px-2">
        <Link
          href="/admin/dashboard/profile"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-main transition-colors font-bold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour au profil
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-main transition-colors font-bold"
        >
          <HelpCircle className="w-4 h-4" />
          Besoin d'aide ?
        </Link>
      </div>
    </div>
  );
};
