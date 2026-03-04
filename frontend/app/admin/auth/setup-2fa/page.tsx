/**
 * ─── Page de Configuration 2FA ───────────────────────────────
 *
 * Route : /admin/auth/setup-2fa
 * Guide l'administrateur dans l'activation de l'authentification
 * à deux facteurs via QR Code et code de vérification.
 */

import { Setup2FAForm } from "@/src/components/Setup2FAForm";

const Setup2FAPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Setup2FAForm />
    </div>
  );
};

export default Setup2FAPage;
