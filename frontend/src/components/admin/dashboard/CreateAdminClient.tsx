"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import {
  ArrowLeft,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerAdmin } from "@/src/services/admin.service";
import { Button } from "@/src/components/ui/button";

const createAdminSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Mot de passe de 8 caractères minimum")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Le mot de passe doit contenir une majuscule, minuscule et un chiffre",
    ),
});

type CreateAdminInput = z.infer<typeof createAdminSchema>;

export default function CreateAdminClient() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAdminInput>({
    resolver: zodResolver(createAdminSchema),
  });

  const onSubmit = async (data: CreateAdminInput) => {
    setErrorMsg("");
    setSuccessMsg("");

    const res = await registerAdmin(data);
    if (res.success) {
      setSuccessMsg("L'administrateur a été créé avec succès.");
      reset();
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2000);
    } else {
      setErrorMsg(res.message || "Erreur lors de la création");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-y-10 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* En-tête */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[9px] w-fit border border-primary/10 backdrop-blur-md">
          <UserPlus size={12} />
          <span className="tracking-widest uppercase">ÉQUIPE</span>
        </div>
        <h1 className="text-3xl md:text-3xl font-black text-main tracking-tight">
          Nouveau compte Administrateur
        </h1>
        <p className="text-muted-foreground text-sm font-medium leading-relaxed">
          Ajoutez un membre à l'équipe. Celui-ci pourra gérer le contenu du site
          mais ne pourra pas créer d'autres administrateurs.
        </p>
      </div>

      <div className="flex flex-col gap-y-6">
        {errorMsg && (
          <div className="bg-destructive/10 text-destructive border-l-4 border-destructive p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm font-medium">{errorMsg}</p>
          </div>
        )}
        {successMsg && (
          <div className="bg-growth/10 text-growth border-l-4 border-growth p-4 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm font-medium">{successMsg}</p>
          </div>
        )}

        <div className="bg-card border border-border/40 rounded-[2rem] p-6 md:p-8 flex flex-col gap-y-6 shadow-premium relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

          <form
            className="relative z-10 space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Nom complet
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.name ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                placeholder="Prénom et Nom"
              />
              {errors.name && (
                <p className="text-[10px] text-destructive font-medium mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Adresse Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.email ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-[10px] text-destructive font-medium mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                Mot de passe temporaire
              </label>
              <input
                type="password"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-xl bg-background border ${errors.password ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                placeholder="Min. 8 car. (maj, min, chiffre)"
              />
              {errors.password && (
                <p className="text-[10px] text-destructive font-medium mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting || !!successMsg}
                className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-6 font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Création...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Créer le compte
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex max-md:flex-col items-center justify-between pt-8 border-t border-border mt-4 px-2">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-main transition-colors font-bold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}
