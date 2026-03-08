import { cookies } from "next/headers";
import {
  Activity,
  Service,
  ContactMessage,
  AdminProfile,
} from "@/src/types/admin";
import {
  PaginationMeta,
  PaginatedResponse,
} from "@/src/services/admin.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7000";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const allCookies = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  return { Cookie: allCookies };
}

export async function getServerAdminProfile(): Promise<AdminProfile | null> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/auth/me`, {
      headers,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.profile;
  } catch (error) {
    console.error("Erreur serveur auth/me:", error);
    return null;
  }
}

export async function getServerActivities(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<Activity>> {
  const defaultMeta = { total: 0, page: 1, limit: 10, totalPages: 1 };
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${API_URL}/api/blog/allPosts?page=${page}&limit=${limit}`,
      {
        headers,
        next: { revalidate: 0 }, // always fetch fresh on admin dashboard
      },
    );
    if (!res.ok) return { data: [], meta: defaultMeta };
    const data = await res.json();
    return { data: data.data || [], meta: data.meta || defaultMeta };
  } catch (error) {
    return { data: [], meta: defaultMeta };
  }
}

export async function getServerServices(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<Service>> {
  const defaultMeta = { total: 0, page: 1, limit: 10, totalPages: 1 };
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${API_URL}/api/services/allServices?page=${page}&limit=${limit}`,
      {
        headers,
        next: { revalidate: 0 },
      },
    );
    if (!res.ok) return { data: [], meta: defaultMeta };
    const data = await res.json();
    return { data: data.data || [], meta: data.meta || defaultMeta };
  } catch (error) {
    return { data: [], meta: defaultMeta };
  }
}

export async function getServerContacts(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<ContactMessage>> {
  const defaultMeta = { total: 0, page: 1, limit: 10, totalPages: 1 };
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${API_URL}/api/contacts?page=${page}&limit=${limit}`,
      {
        headers,
        next: { revalidate: 0 },
      },
    );
    if (!res.ok) return { data: [], meta: defaultMeta };
    const data = await res.json();
    return { data: data.data || [], meta: data.meta || defaultMeta };
  } catch (error) {
    return { data: [], meta: defaultMeta };
  }
}
