import { Verify2FAForm } from "@/src/components/admin/auth/Verify2FAForm";
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
