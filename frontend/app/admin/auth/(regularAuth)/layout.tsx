import type { Metadata } from "next";
// import { Lexend } from "next/font/google";
import AdminHeader from "@/src/components/headerUIComponents/AdminHeader";
import { PersonStanding, Shield } from "lucide-react";
import Image from "next/image";

// const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fajr | L'Éducation pour tous au Sahel",
  description:
    "Fajr est une ONG dédiée à la transformation de l'avenir des enfants par l'éducation au Niger et dans le Sahel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminHeader />
      <main className="min-h-full inset-0 bg-background/60">
        <div className="px-4 md:px-10 lg:px-40 container mx-auto flex max-lg:flex-col gap-y-8 lg:gap-x-8 items-center">
          <div className="flex flex-col gap-y-8 w-full py-12">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[9px] md:text-xs w-fit border border-primary/10 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                <span className="tracking-[0.15em]">Portail Admin</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Bienvenue sur le portail Admin
              </h1>
              <p>
                Bienvenue dans l'espace d'administration du portail Fajr. Vous
                disposez ici de tous les outils nécessaires à la gestion et à la
                mise à jour du contenu de votre site web.
              </p>
            </div>

            <div className="flex flex-col gap-y-4 ">
              <div className="flex items-start gap-x-4 ">
                <div className="bg-primary/10 text-primary rounded-full p-2 ">
                  <Shield />
                </div>
                <div>
                  <h1>Sécurité d'entreprise</h1>
                  <p>
                    {" "}
                    Chiffrement aux normes industrielles et contrôle d'accès
                    basé sur les rôles.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-x-4 ">
                <div className="bg-primary/10 text-primary rounded-full p-2 ">
                  <PersonStanding />
                </div>
                <div>
                  <h1>Axé communautée</h1>
                  <p>
                    Conçu pour une gestion collaborative et un impact concret
                    sur le terrain.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-end px-6 py-6 relative  w-full min-h-50 md:h-96 rounded-4xl overflow-clip text-main bg-black">
              <Image
                src="/Empty classroom with worn furniture.webp"
                alt="Logo"
                sizes="100%"
                fill
                className="absolute top-0 left-0 object-cover z-10"
              />
              <p
                className="text-xs sm:text-lg text-blue-500/50 z-20"
                style={{ WebkitTextStroke: "0.5px white" }}
              >
                Avec le portail admin FJ, gagnez un temps précieux sur la
                gestion de votre vitrine en ligne.
              </p>
            </div>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </main>
    </>
  );
}
