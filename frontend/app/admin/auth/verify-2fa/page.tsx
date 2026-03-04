/**
 * ─── Page de Vérification 2FA ────────────────────────────────
 *
 * Route : /admin/auth/verify-2fa?tempAdminId=...
 * Affiche le formulaire de saisie du code 2FA lors de la connexion.
 *
 * Le composant Verify2FAForm utilise `useSearchParams()`, donc il
 * est encapsulé dans un `<Suspense>` pour le rendu SSR de Next.js.
 */

import { Verify2FAForm } from "@/src/components/Verify2FAForm";
import { Suspense } from "react";

const Verify2FAPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center py-6">
      <Suspense
        fallback={
          <div className="text-center p-8 text-muted-foreground text-sm font-medium italic">
            Chargement du formulaire de sécurité...
          </div>
        }
      >
        <Verify2FAForm />
      </Suspense>
    </div>
  );
};

export default Verify2FAPage;
