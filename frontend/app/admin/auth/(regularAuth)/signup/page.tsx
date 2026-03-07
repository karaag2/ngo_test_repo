/**
 * ─── Page d'Inscription ──────────────────────────────────────
 *
 * Route : /admin/auth/signup
 * Affiche le formulaire de création de compte administrateur.
 */

import { SignUpForm } from "@/src/components/admin/auth/AuthForm";

const SignupPage = () => {
  return <SignUpForm />;
};

export default SignupPage;
