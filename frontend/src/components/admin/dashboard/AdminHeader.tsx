"use client";

/**
 * ─── AdminHeader ─────────────────────────────────────────
 *
 * Barre supérieure du dashboard admin.
 * Affiche le titre de la section active, le toggle thème,
 * et un bouton de retour vers le site public.
 */

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/src/components/Layouts/theme-toggle";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const routeTitles: Record<string, string> = {
  "/admin/dashboard": "Tableau de bord",
  "/admin/dashboard/activities": "Gestion des activités",
  "/admin/dashboard/services": "Gestion des services",
  "/admin/dashboard/messages": "Messages de contact",
  "/admin/dashboard/profile": "Mon profil",
};

export default function AdminHeader() {
  const pathname = usePathname();

  // Trouve le titre correspondant, fallback au tableau de bord
  let currentTitle = routeTitles["/admin/dashboard"];
  for (const [route, title] of Object.entries(routeTitles)) {
    if (
      pathname === route ||
      (route !== "/admin/dashboard" && pathname.startsWith(route))
    ) {
      currentTitle = title;
    }
  }

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between w-full bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
      {/* Titre de la section */}
      <div>
        <h2 className="text-xl font-bold text-main tracking-tight">
          {currentTitle}
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Panneau d&apos;administration · FJ
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-x-3">
        <ThemeToggle />
        <Link
          href="/"
          className="flex items-center gap-x-2 px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-main hover:bg-accent/50 border border-border transition-all duration-200 cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Voir le site
        </Link>
      </div>
    </header>
  );
}
