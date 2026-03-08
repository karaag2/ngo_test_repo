/**
 * ─── Services API Admin Dashboard ─────────────────────────
 */

import type {
  Activity,
  ActivityFormData,
  ContactMessage,
  Service,
  ServiceFormData,
  ContactFormData,
} from "@/src/types/admin";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

// ─── Types de Pagination ─────────────────────────────
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ─── Activités (Blog Posts) ──────────────────────────

export const fetchAllActivities = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<Activity>> => {
  try {
    const res = await fetch(
      `${API_URL}/api/blog/allPosts?page=${page}&limit=${limit}&adminView=true`,
      { credentials: "include" },
    );
    if (!res.ok) throw new Error("Erreur lors du chargement des activités");
    const json = await res.json();
    return {
      data: json.data ?? [],
      meta: json.meta ?? { total: 0, page: 1, limit: 10, totalPages: 1 },
    };
  } catch {
    return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 1 } };
  }
};

export const uploadImage = async (
  file: File,
): Promise<{ success: boolean; url?: string; message?: string }> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_URL}/api/upload/image`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok) {
      return { success: false, message: json.message || "Erreur upload" };
    }
    return { success: true, url: json.url };
  } catch {
    return {
      success: false,
      message: "Impossible de joindre le serveur pour l'upload",
    };
  }
};

export const createActivity = async (
  data: ActivityFormData,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/blog/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      return { success: false, message: json.message || "Erreur de création" };
    return { success: true };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

export const updateActivity = async (
  postId: number,
  data: ActivityFormData,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/blog/post/${postId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      return {
        success: false,
        message: json.message || "Erreur de mise à jour",
      };
    return { success: true };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

export const deleteActivity = async (
  postId: number,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/blog/post/${postId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) return { success: false, message: "Erreur de suppression" };
    return { success: true };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

// ─── Auth / Profile ──────────────────────────────────

export const logoutAdmin = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {}
};

export const fetchAdminProfile = async () => {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json.profile;
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Erreur récupération profil";
    throw new Error(errorMsg);
  }
};

export const updateAdminProfile = async (data: {
  name: string;
  email: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/me`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json.profile;
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Erreur mise à jour profil";
    throw new Error(errorMsg);
  }
};

export const changeAdminPasswordWithOTP = async (
  otp: string,
  newPassword: string,
) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ otp, newPassword }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Erreur");
    return { success: true, message: json.message };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : "Impossible de changer le mot de passe";
    return {
      success: false,
      message: errorMsg,
    };
  }
};

export const getQrCode2FA = async () => {
  try {
    const res = await fetch(`${API_URL}/api/auth/setup-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return { qrCode: json.qrCode, manualKey: json.manualKey };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Erreur génération 2FA";
    throw new Error(errorMsg);
  }
};

export const confirm2FASetup = async (code: string) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/confirm-setup-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ code }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || "Code invalide");
    return { success: true, message: json.message };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Erreur confirmation 2FA";
    return { success: false, message: errorMsg };
  }
};

// ─── Inscription Admin (SUPER_ADMIN uniquement) ──────

export const registerAdmin = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      return { success: false, message: json.message || "Erreur de création" };
    return { success: true, message: json.message };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

// ─── Services ────────────────────────────────────────

export const fetchAllServices = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<Service>> => {
  try {
    const res = await fetch(
      `${API_URL}/api/services/allServices?page=${page}&limit=${limit}`,
      { credentials: "include" },
    );
    const data = await res.json();
    if (!res.ok) throw new Error("Erreur lors du chargement des services");
    return {
      data: data.data ?? [],
      meta: data.meta ?? { total: 0, page: 1, limit: 10, totalPages: 1 },
    };
  } catch {
    return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 1 } };
  }
};

export const createService = async (
  data: ServiceFormData,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/services/service`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      return { success: false, message: json.message || "Erreur de création" };
    return { success: true };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

export const updateService = async (
  serviceId: number,
  data: ServiceFormData,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/services/service/${serviceId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      return {
        success: false,
        message: json.message || "Erreur de mise à jour",
      };
    return { success: true };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

export const deleteService = async (
  serviceId: number,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/services/service/${serviceId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) return { success: false, message: "Erreur de suppression" };
    return { success: true };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

// ─── Contacts / Messages ─────────────────────────────

export const fetchAllContacts = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<ContactMessage>> => {
  try {
    const res = await fetch(
      `${API_URL}/api/contacts?page=${page}&limit=${limit}`,
      { credentials: "include" },
    );
    const data = await res.json();
    if (!res.ok) throw new Error("Erreur lors du chargement des messages");
    return {
      data: data.data ?? [],
      meta: data.meta ?? { total: 0, page: 1, limit: 10, totalPages: 1 },
    };
  } catch {
    return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 1 } };
  }
};

export const toggleContactRead = async (
  id: number,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/contacts/${id}/read`, {
      method: "PATCH",
      credentials: "include",
    });
    const json = await res.json();
    if (!res.ok)
      return {
        success: false,
        message: json.message || "Erreur de mise à jour",
      };
    return { success: true };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

export const deleteContact = async (
  id: number,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/contacts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) return { success: false, message: "Erreur de suppression" };
    return { success: true };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};

export const submitPublicContact = async (
  data: ContactFormData,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch(`${API_URL}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok)
      return { success: false, message: json.message || "Erreur d'envoi" };
    return { success: true, message: json.message };
  } catch {
    return { success: false, message: "Impossible de joindre le serveur" };
  }
};
