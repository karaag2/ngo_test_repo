"use client";

/**
 * ─── OverviewPanel ───────────────────────────────────────
 *
 * Panneau principal du dashboard : statistiques globales,
 * activités récentes, et aperçu rapide des messages.
 * Utilise framer-motion pour les animations d'entrée.
 */

import { m } from "framer-motion";
import {
  FileText,
  Settings2,
  Mail,
  MailOpen,
  TrendingUp,
  Eye,
  Clock,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import type { Activity, ContactMessage, AdminProfile } from "@/src/types/admin";

// ─── Animations ───────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// ─── Composant carte stat ─────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  color,
  subtitle,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  subtitle?: string;
}) {
  return (
    <m.div
      variants={fadeUp}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-premium hover:border-primary/20"
    >
      {/* Glow décoratif en arrière-plan */}
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-2">
            {label}
          </p>
          <p className="text-3xl font-black text-main tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-x-1">
              <TrendingUp className="w-3 h-3" />
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
    </m.div>
  );
}

interface OverviewPanelProps {
  initialActivities: Activity[];
  initialContacts: ContactMessage[];
  adminProfile: AdminProfile | null;
}

// ─── Composant OverviewPanelClient ────────────────────
export default function OverviewPanelClient({
  initialActivities,
  initialContacts,
  adminProfile,
}: OverviewPanelProps) {
  const activities = initialActivities;
  const contacts = initialContacts;
  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <m.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ── Cartes statistiques ──────────────────────── */}
      <m.div
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="Activités"
          value={activities.length}
          icon={FileText}
          color="var(--primary)"
          subtitle="Publiées"
        />
        <StatCard
          label="Services"
          value={3}
          icon={Settings2}
          color="var(--growth-green)"
          subtitle="Actifs"
        />
        <StatCard
          label="Messages"
          value={contacts.length}
          icon={Mail}
          color="var(--edu-gold)"
        />
        <StatCard
          label="Non lus"
          value={unreadCount}
          icon={MailOpen}
          color="var(--destructive)"
          subtitle="À traiter"
        />
      </m.div>

      {/* ── Actions Super Admin ──────────────────────── */}
      {adminProfile?.role === "SUPER_ADMIN" && (
        <m.div variants={fadeUp} className="flex justify-end gap-x-4">
          <Link
            href="/admin/dashboard/create-admin"
            className="flex items-center gap-x-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-sm cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Créer un administrateur
          </Link>
        </m.div>
      )}

      {/* ── Activités récentes ────────────────────────── */}
      <m.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-main flex items-center gap-x-2">
            <Clock className="w-4 h-4 text-primary" />
            Activités récentes
          </h3>
          <span className="text-xs text-muted-foreground">
            {activities.length} au total
          </span>
        </div>

        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-10 h-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">
              Aucune activité publiée
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Commencez par créer votre première activité
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-x-4 px-6 py-4 hover:bg-accent/30 transition-colors duration-200"
              >
                {/* Indicateur catégorie */}
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-main truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {activity.description}
                  </p>
                </div>

                {/* Badge catégorie */}
                <span className="hidden sm:inline-flex shrink-0 items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                  {activity.category}
                </span>

                {/* Date */}
                <span className="hidden lg:flex items-center gap-x-1 text-xs text-muted-foreground shrink-0">
                  <Eye className="w-3 h-3" />
                  {new Date(activity.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </m.div>

      {/* ── Messages récents ─────────────────────────── */}
      <m.div
        variants={fadeUp}
        className="rounded-2xl border border-border bg-card overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-main flex items-center gap-x-2">
            <Mail className="w-4 h-4 text-primary" />
            Messages récents
          </h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-destructive/15 text-destructive">
              {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="divide-y divide-border">
          {contacts.slice(0, 3).map((contact) => (
            <div
              key={contact.id}
              className="flex items-start gap-x-4 px-6 py-4 hover:bg-accent/30 transition-colors duration-200"
            >
              {/* Avatar initiales */}
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">
                  {contact.firstName[0]}
                  {contact.lastName[0]}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-semibold text-main">
                    {contact.firstName} {contact.lastName}
                  </p>
                  {!contact.read && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {contact.message}
                </p>
              </div>

              <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                {new Date(contact.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
          ))}
        </div>
      </m.div>
    </m.div>
  );
}
