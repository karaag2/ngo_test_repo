"use client";


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
    <header className="sticky top-0 z-40 flex items-center justify-between w-full bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-6 py-3 md:py-4 gap-x-3">
      {/* Titre de la section */}
      <div className="min-w-0 flex-1">
        <h2 className="text-base md:text-xl font-bold text-main tracking-tight truncate">
          {currentTitle}
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
          Panneau d&apos;administration · FJ
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-x-2 md:gap-x-3 shrink-0">
        <ThemeToggle />
        <Link
          href="/"
          className="flex items-center gap-x-2 px-3 md:px-4 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-main hover:bg-accent/50 border border-border transition-all duration-200 cursor-pointer"
          title="Voir le site"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Voir le site</span>
        </Link>
      </div>
    </header>
  );
}
