import AdminSidebar from "@/src/components/admin/dashboard/AdminSidebar";
import AdminHeader from "@/src/components/admin/dashboard/AdminHeader";
import { LazyMotion, domAnimation } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="flex h-screen bg-background overflow-hidden relative">
        {/* ── Sidebar (Fixe, scroll indépendant) ───────────────── */}
        <AdminSidebar />

        {/* ── Contenu principal (Scroll indépendant) ───────────── */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <AdminHeader />

          {/* Zone de contenu avec padding et scroll */}
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-24 md:pb-6 relative z-0">
            {children}
          </main>
        </div>
      </div>
    </LazyMotion>
  );
}
