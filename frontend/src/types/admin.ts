/**
 * ─── Types Admin Dashboard ─────────────────────────────
 *
 * Types TypeScript pour le tableau de bord administrateur.
 * Reflète les modèles Prisma du backend : Activity, Service, Contact, Admin.
 */

// ─── Activité (Blog Post) ─────────────────────────────
export interface Activity {
  id: number;
  title: string;
  description: string;
  content: string | null;
  imageUrl: string;
  category: string;
  slug: string;
  published: boolean;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityFormData {
  title: string;
  description: string;
  category: string;
  slug?: string;
  imageUrl: string;
}

// ─── Service ──────────────────────────────────────────
export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  color: string | null;
  order: number;
  createdById: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceFormData {
  title: string;
  description: string;
  icon?: string;
  color?: string;
  order?: number;
}

// ─── Message de Contact ───────────────────────────────
export interface ContactMessage {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// ─── Profil Admin ─────────────────────────────────────
export interface AdminProfile {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN";
  twoFactorEnabled: boolean;
  createdAt: string;
}

// ─── Statistiques Dashboard ───────────────────────────
export interface DashboardStats {
  totalActivities: number;
  totalServices: number;
  totalContacts: number;
  unreadContacts: number;
  totalAdmins: number;
}

// ─── Navigation Sidebar ───────────────────────────────
export type AdminTab =
  | "overview"
  | "activities"
  | "services"
  | "messages"
  | "profile";
