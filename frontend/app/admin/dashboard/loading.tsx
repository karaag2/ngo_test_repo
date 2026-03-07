import {
  FileText,
  Settings2,
  Mail,
  LayoutDashboard,
  Clock,
} from "lucide-react";

/**
 * ─── Dashboard Loading Skeleton ──────────────────────────
 *
 * Squelette de chargement affiché par Next.js via Suspense
 * pendant le rendu et la récupération des données des pages
 * du dashboard.
 */
export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ── En-tête (Titre simulé) ─────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-border/50 rounded-md animate-pulse" />
          <div className="h-4 w-32 bg-border/30 rounded-md animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-border/40 rounded-xl animate-pulse" />
      </div>

      {/* ── Cartes statistiques (Overview) ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-[130px] rounded-2xl bg-card border border-border p-6 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-3 w-20 bg-border/40 rounded-md animate-pulse" />
              <div className="h-8 w-16 bg-border/60 rounded-md animate-pulse" />
            </div>
            <div className="h-3 w-24 bg-border/30 rounded-md animate-pulse" />
          </div>
        ))}
      </div>

      {/* ── Zone Liste/Tableau ─────────────────────────── */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden mt-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="h-4 w-40 bg-border/50 rounded-md animate-pulse" />
          <div className="h-3 w-16 bg-border/30 rounded-md animate-pulse" />
        </div>
        <div className="divide-y divide-border">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-x-4 px-6 py-4">
              <div className="w-10 h-10 rounded-xl bg-border/30 shrink-0 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-border/50 rounded-md animate-pulse" />
                <div className="h-3 w-2/3 bg-border/30 rounded-md animate-pulse" />
              </div>
              <div className="h-6 w-16 bg-border/40 rounded-full animate-pulse hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
