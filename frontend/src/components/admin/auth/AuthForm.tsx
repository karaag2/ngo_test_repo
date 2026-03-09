"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import {
  signUpSchema,
  SignUpInput,
  loginSchema,
  LoginInput,
} from "@/src/lib/auth.validators";
import { signupService, loginService } from "@/src/services/auth.service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  UserPlus,
  LogIn,
  Mail,
  Lock,
  User,
  Loader2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

// ─── Formulaire d'Inscription ────────────────────────────────

export const SignUpForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  /** Soumission du formulaire d'inscription vers le backend */
  const onSubmit = async (data: SignUpInput) => {
    setServerError(null);
    setIsPending(true);

    try {
      const result = await signupService(data);

      if (!result.success) {
        // Injection des erreurs de champs retournées par le serveur
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof SignUpInput, {
              type: "server",
              message: messages?.[0],
            });
          });
        }
        // Affichage du message d'erreur global
        if (result.message) {
          setServerError(result.message);
        }
        setIsPending(false);
        return;
      }

      setIsSuccess(true);
      setIsPending(false);
    } catch (e: any) {
      setServerError(e.message || "Une erreur inattendue est survenue.");
      setIsPending(false);
    }
  };

  /* ─── Écran de Succès après Inscription ─── */
  if (isSuccess) {
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-y-6 p-10 bg-card border border-border/40 rounded-[2.5rem] text-center shadow-premium">
          {/* Icône de Confirmation */}
          <div className="w-20 h-20 bg-growth/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-growth" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-main">
              Compte créé avec succès !
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
              Votre compte administrateur a bien été créé. Vous pouvez
              maintenant vous connecter pour accéder au portail.
            </p>
          </div>

          {/* Bouton de Redirection vers Login */}
          <Link href="/admin/auth/login" className="w-full max-w-xs">
            <Button className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3">
              Se connecter
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-y-8 p-8 md:p-10 bg-card border border-border/40 rounded-[2.5rem] shadow-premium relative overflow-hidden">
        {/* Décoration d'arrière-plan */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* En-tête du Formulaire */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[9px] w-fit border border-primary/10 backdrop-blur-md">
            <UserPlus size={12} />
            <span className="tracking-[0.15em]">NOUVEL ADMIN</span>
          </div>
          <h1 className="text-3xl font-black text-main tracking-tight">
            Créer un compte
          </h1>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed">
            Attention les admins ne peuvent pas ajouter d'autres admins seul le
            superadmin le peux.
          </p>
        </div>

        {/* Message d'Erreur Global */}
        {serverError && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{serverError}</p>
          </div>
        )}

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 relative z-10"
        >
          {/* Champ : Nom Complet */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1">
              Nom complet
            </Label>
            <div className="relative group">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <Input
                {...register("name")}
                placeholder="Abdou Moumouni"
                autoComplete="name"
                className="h-12 pl-10 rounded-xl border-border bg-muted/10 focus:bg-background transition-all font-bold text-main placeholder:font-medium"
              />
            </div>
            {errors.name && (
              <p className="text-destructive text-xs font-medium ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Champ : Adresse Email */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1">
              Adresse email
            </Label>
            <div className="relative group">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <Input
                type="email"
                {...register("email")}
                placeholder="admin@Fajr.org"
                autoComplete="email"
                className="h-12 pl-10 rounded-xl border-border bg-muted/10 focus:bg-background transition-all font-bold text-main placeholder:font-medium"
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-xs font-medium ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Champ : Mot de Passe */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1">
              Mot de passe
            </Label>
            <div className="relative group">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <Input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                autoComplete="new-password"
                className="h-12 pl-10 rounded-xl border-border bg-muted/10 focus:bg-background transition-all font-bold text-main placeholder:font-medium"
              />
            </div>
            {errors.password && (
              <p className="text-destructive text-xs font-medium ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Champ : Confirmation Mot de Passe */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1">
              Confirmer le mot de passe
            </Label>
            <div className="relative group">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <Input
                type="password"
                {...register("confirmPassword")}
                placeholder="••••••••"
                autoComplete="new-password"
                className="h-12 pl-10 rounded-xl border-border bg-muted/10 focus:bg-background transition-all font-bold text-main placeholder:font-medium"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-destructive text-xs font-medium ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Bouton de Soumission */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 mt-2"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Création en cours...
              </>
            ) : (
              <>
                S'inscrire
                <ArrowRight size={14} />
              </>
            )}
          </Button>
        </form>

        {/* Lien vers la Connexion */}
        <p className="text-center text-sm text-muted-foreground font-medium relative z-10">
          Déjà un compte ?{" "}
          <Link
            href="/admin/auth/login"
            className="text-primary font-bold hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

// ─── Formulaire de Connexion ─────────────────────────────────

export const LogInForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  /** Soumission du formulaire de connexion vers le backend */
  const onSubmit = async (data: LoginInput) => {
    setServerError(null);
    setIsPending(true);

    try {
      const result = await loginService(data);
      if (!result.success) {
        // Injection des erreurs de champs retournées par le serveur
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof LoginInput, {
              type: "server",
              message: messages?.[0],
            });
          });
        }
        // Affichage du message d'erreur global
        if (result.message) {
          setServerError(result.message);
        }
        setIsPending(false);
        return;
      }

      setIsRedirecting(true);
      // Redirection vers la vérification 2FA si nécessaire
      if (result.requires2FA && result.tempAdminId) {
        router.push(`/admin/auth/verify-2fa?tempAdminId=${result.tempAdminId}`);
        return;
      }

      // Redirection vers le tableau de bord
      router.push("/admin/dashboard");
    } catch (e: any) {
      setServerError(e.message || "Une erreur inattendue est survenue.");
      setIsPending(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-y-8 p-8 md:p-10 bg-card border border-border/40 rounded-[2.5rem] shadow-premium relative overflow-hidden">
        {/* Décoration d'arrière-plan */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* En-tête du Formulaire */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[9px] w-fit border border-primary/10 backdrop-blur-md">
            <LogIn size={12} />
            <span className="tracking-[0.15em]">CONNEXION</span>
          </div>
          <h1 className="text-3xl font-black text-main tracking-tight">
            Content de vous revoir
          </h1>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed">
            Connectez-vous à votre espace d'administration.
          </p>
        </div>

        {/* Message d'Erreur Global */}
        {serverError && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>{serverError}</p>
          </div>
        )}

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-5 relative z-10"
        >
          {/* Champ : Adresse Email */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1">
              Adresse email
            </Label>
            <div className="relative group">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <Input
                type="email"
                {...register("email")}
                placeholder="admin@Fajr.org"
                autoComplete="email"
                className="h-12 pl-10 rounded-xl border-border bg-muted/10 focus:bg-background transition-all font-bold text-main placeholder:font-medium"
              />
            </div>
            {errors.email && (
              <p className="text-destructive text-xs font-medium ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Champ : Mot de Passe */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] uppercase font-black tracking-widest text-main/60 ml-1">
                Mot de passe
              </Label>
              <Link
                href="#"
                className="text-[10px] text-primary font-bold hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="relative group">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              />
              <Input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-12 pl-10 rounded-xl border-border bg-muted/10 focus:bg-background transition-all font-bold text-main placeholder:font-medium"
              />
            </div>
            {errors.password && (
              <p className="text-destructive text-xs font-medium ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Bouton de Soumission */}
          <Button
            type="submit"
            disabled={isPending || isRedirecting}
            className="w-full h-14 rounded-2xl bg-primary text-white font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-50 disabled:shadow-none disabled:transform-none"
          >
            {isRedirecting ? (
              <>
                <Loader2 size={14} className="animate-spin mr-1.5" />
                Redirection...
              </>
            ) : isPending ? (
              <>
                <Loader2 size={14} className="animate-spin mr-1.5" />
                Connexion en cours...
              </>
            ) : (
              <>
                Se connecter
                <ArrowRight size={14} />
              </>
            )}
          </Button>
        </form>

        {/* Lien vers l'Inscription */}
        <p className="text-center text-sm text-muted-foreground font-medium relative z-10">
          Pas encore de compte ?{" "}
          <Link
            href="/admin/auth/signup"
            className="text-primary font-bold hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};
