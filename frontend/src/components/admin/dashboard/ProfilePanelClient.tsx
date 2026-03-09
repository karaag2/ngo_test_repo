"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  Shield,
  ShieldCheck,
  Calendar,
  Mail,
  Crown,
  Edit2,
  KeyRound,
  X,
  Check,
  QrCode,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import type { AdminProfile } from "@/src/types/admin";
import {
  updateAdminProfile,
  changeAdminPasswordWithOTP,
} from "@/src/services/admin.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  ProfileInput,
  passwordChangeSchema,
  PasswordChangeInput,
} from "@/src/lib/profile.validators";

export default function ProfilePanelClient({
  initialProfile,
}: {
  initialProfile: AdminProfile | null;
}) {
  const admin = initialProfile;
  const router = useRouter();

  // Modals / Sections
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPwd, setIsChangingPwd] = useState(false);

  // Forms
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSubmittingProfile },
    reset: resetProfile,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: admin?.name || "", email: admin?.email || "" },
  });

  const {
    register: registerPwd,
    handleSubmit: handleSubmitPwd,
    formState: { errors: pwdErrors, isSubmitting: isSubmittingPwd },
    reset: resetPwd,
  } = useForm<PasswordChangeInput>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: { otp: "", newPassword: "" },
  });

  // Notifications
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 5000);
  };

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(""), 5000);
  };

  const handleUpdateProfile = async (data: ProfileInput) => {
    setError("");
    try {
      await updateAdminProfile(data);
      router.refresh();
      setIsEditing(false);
      showSuccess("Profil mis à jour avec succès");
    } catch (err: any) {
      showError(err.message || "Erreur lors de la mise à jour");
    }
  };

  const handleSetup2FA = async () => {
    router.push("/admin/auth/setup-2fa");
  };

  const handleChangePassword = async (data: PasswordChangeInput) => {
    setError("");
    const res = await changeAdminPasswordWithOTP(data.otp, data.newPassword);
    if (res.success) {
      showSuccess("Mot de passe modifié avec succès");
      setIsChangingPwd(false);
      resetPwd();
    } else {
      showError(res.message || "Erreur lors du changement de mot de passe");
    }
  };

  if (!admin) return null;

  return (
    <div className="space-y-5 max-w-2xl animate-in fade-in duration-500">
      {(error || success) && (
        <div
          className={`flex items-start gap-x-3 px-5 py-4 rounded-2xl border animate-in fade-in duration-300 ${error ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"}`}
        >
          {error ? (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <Check className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <div className="text-sm font-semibold">{error || success}</div>
        </div>
      )}

      {/* ── Carte profil ─────────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-main truncate">
                {admin.name}
              </h3>
              <div className="flex items-center gap-x-2 mt-1">
                <span className="inline-flex items-center gap-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                  <Crown className="w-3 h-3" />
                  {admin.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (!isEditing && admin) {
                resetProfile({ name: admin.name, email: admin.email });
              }
              setIsEditing(!isEditing);
              setIsChangingPwd(false);
            }}
            className="p-2.5 rounded-xl bg-accent hover:bg-accent/80 transition-colors text-muted-foreground hover:text-main"
            title="Modifier le profil"
          >
            {isEditing ? (
              <X className="w-5 h-5" />
            ) : (
              <Edit2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* ── Formulaire d'édition ─────────────────────── */}
        {isEditing && (
          <div className="overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <form
              onSubmit={handleSubmitProfile(handleUpdateProfile)}
              className="pt-4 pb-2 space-y-4 border-t border-border mt-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="p_name"
                    className="text-xs font-semibold text-muted-foreground uppercase"
                  >
                    Nom
                  </label>
                  <input
                    id="p_name"
                    type="text"
                    {...registerProfile("name")}
                    className={`w-full px-4 py-2.5 rounded-xl bg-background border ${profileErrors.name ? "border-destructive" : "border-border"} text-sm text-main focus:ring-2 focus:ring-primary/30 outline-none`}
                  />
                  {profileErrors.name && (
                    <p className="text-[10px] text-destructive font-medium">
                      {profileErrors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="p_email"
                    className="text-xs font-semibold text-muted-foreground uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="p_email"
                    type="email"
                    {...registerProfile("email")}
                    className={`w-full px-4 py-2.5 rounded-xl bg-background border ${profileErrors.email ? "border-destructive" : "border-border"} text-sm text-main focus:ring-2 focus:ring-primary/30 outline-none`}
                  />
                  {profileErrors.email && (
                    <p className="text-[10px] text-destructive font-medium">
                      {profileErrors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingProfile}
                  className="flex items-center gap-x-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmittingProfile ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Informations statiques ───────────────────── */}
        {!isEditing && (
          <div className="space-y-4">
            <div className="flex items-center gap-x-4 p-4 rounded-xl bg-accent/30 border border-border">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm text-main mt-0.5">{admin.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-x-4 p-4 rounded-xl bg-accent/30 border border-border">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Membre depuis
                </p>
                <p className="text-sm text-main mt-0.5">
                  {new Date(admin.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border">
              <div className="flex items-center gap-x-4">
                {admin.twoFactorEnabled ? (
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                ) : (
                  <Shield className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Authentification 2FA
                  </p>
                  <p className="text-sm mt-0.5">
                    {admin.twoFactorEnabled ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        Activée
                      </span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                        Désactivée
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {!admin.twoFactorEnabled && (
                <button
                  onClick={handleSetup2FA}
                  disabled={btnLoading}
                  className="px-4 py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors disabled:opacity-50"
                >
                  Activer
                </button>
              )}
            </div>

            {/* Changement de mot de passe */}
            {admin.twoFactorEnabled && (
              <div className="pt-4">
                <button
                  onClick={() => setIsChangingPwd(!isChangingPwd)}
                  className="flex items-center gap-x-2 px-5 py-2.5 rounded-xl bg-accent border border-border text-sm font-semibold hover:bg-accent/80 transition-colors text-main"
                >
                  <KeyRound className="w-4 h-4" />
                  Changer mon mot de passe
                </button>

                {isChangingPwd && (
                  <div className="overflow-hidden mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <form
                      onSubmit={handleSubmitPwd(handleChangePassword)}
                      className="p-5 rounded-2xl border border-border bg-card space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label
                          htmlFor="new_pwd"
                          className="text-xs font-semibold text-muted-foreground uppercase"
                        >
                          Nouveau mot de passe
                        </label>
                        <input
                          id="new_pwd"
                          type="password"
                          {...registerPwd("newPassword")}
                          placeholder="Min. 8 caractères, majuscule, minuscule, chiffre"
                          className={`w-full px-4 py-2.5 rounded-xl bg-background border ${pwdErrors.newPassword ? "border-destructive" : "border-border"} text-sm text-main focus:ring-2 focus:ring-primary/30 outline-none`}
                        />
                        {pwdErrors.newPassword && (
                          <p className="text-[10px] text-destructive font-medium">
                            {pwdErrors.newPassword.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="pwd_otp"
                          className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-x-1.5"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          Code 2FA actuel
                        </label>
                        <input
                          id="pwd_otp"
                          type="text"
                          maxLength={6}
                          {...registerPwd("otp")}
                          placeholder="123456"
                          className={`w-full px-4 py-2.5 rounded-xl bg-background border ${pwdErrors.otp ? "border-destructive" : "border-border"} text-sm text-main focus:ring-2 focus:ring-primary/30 tracking-widest font-mono outline-none`}
                        />
                        {pwdErrors.otp && (
                          <p className="text-[10px] text-destructive font-medium">
                            {pwdErrors.otp.message}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="submit"
                          disabled={isSubmittingPwd}
                          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                        >
                          {isSubmittingPwd
                            ? "Modification..."
                            : "Valider le changement"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {!admin.twoFactorEnabled && (
              <div className="text-xs text-muted-foreground py-2 px-4 rounded-xl bg-accent/50 flex gap-x-2 items-center">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Activez l'authentification 2FA pour pouvoir changer votre mot de
                passe depuis ce profil.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
