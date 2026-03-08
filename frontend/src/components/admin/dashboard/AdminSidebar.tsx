"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import type { AdminTab } from "@/src/types/admin";
import {
  LayoutDashboard,
  FileText,
  Settings2,
  Mail,
  UserCircle,
  LogOut,
} from "lucide-react";
import { logoutAdmin } from "@/src/services/admin.service";
import { useRouter } from "next/navigation";

const navItems: {
  id: AdminTab;
  href: string;
  label: string;
  icon: React.ElementType;
}[] = [
  {
    id: "overview",
    href: "/admin/dashboard",
    label: "Tableau de bord",
    icon: LayoutDashboard,
  },
  {
    id: "activities",
    href: "/admin/dashboard/activities",
    label: "Activités",
    icon: FileText,
  },
  {
    id: "services",
    href: "/admin/dashboard/services",
    label: "Services",
    icon: Settings2,
  },
  {
    id: "messages",
    href: "/admin/dashboard/messages",
    label: "Messages",
    icon: Mail,
  },
  {
    id: "profile",
    href: "/admin/dashboard/profile",
    label: "Profil",
    icon: UserCircle,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await logoutAdmin();
    router.replace("/admin/auth/login");
  };

  return (
    <>
      {/* ── Sidebar Desktop ────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-[260px] h-full bg-card border-r border-border overflow-y-auto z-10">
        {/* Logo / Titre */}
        <div className="flex items-center gap-x-3 px-6 py-6 border-b border-border shrink-0">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center rotate-3">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-main">
              FJ Admin
            </h1>
            <p className="text-xs text-muted-foreground">Gestion du site</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Est actif si on est sur la route exacte (pour dashboard) ou un sous-chemin
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                href={item.href}
                key={item.id}
                className={cn(
                  "w-full flex items-center gap-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-primary/15 text-primary shadow-sm border border-primary/20"
                    : "text-muted-foreground hover:text-main hover:bg-accent/50",
                )}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
                {/* Badge messages non lus - Simulation */}
                {item.id === "messages" && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                    2
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bouton Déconnexion */}
        <div className="px-3 pb-6 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-x-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* ── Bottom Nav Mobile ──────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              href={item.href}
              key={item.id}
              className={cn(
                "flex flex-col items-center gap-y-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-main",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-y-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-[10px] font-medium">Quitter</span>
        </button>
      </nav>
    </>
  );
}
