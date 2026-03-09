"use client";

/**
 * Panneau de lecture des messages de contact reçus via
 * le formulaire public du site.
 */

import { useState } from "react";
import { Mail, MailOpen, Clock, Trash2, X, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  toggleContactRead,
  deleteContact,
  fetchAllContacts,
} from "@/src/services/admin.service";
import type { PaginatedResponse } from "@/src/services/admin.service";
import type { ContactMessage } from "@/src/types/admin";
import { Pagination } from "@/src/components/admin/dashboard/Pagination";
import { Loader2 } from "lucide-react";

export default function MessagesPanelClient({
  initialData,
}: {
  initialData: PaginatedResponse<ContactMessage>;
}) {
  const [contacts, setContacts] = useState<ContactMessage[]>(initialData.data);
  const [meta, setMeta] = useState(initialData.meta);
  const [page, setPage] = useState(initialData.meta.page);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const unreadCount = contacts.filter((c) => !c.read).length;

  const handleToggleRead = async (id: number) => {
    setLoading(true);
    const res = await toggleContactRead(id);
    if (res.success) {
      router.refresh();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, read: !selectedMessage.read });
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce message définitivement ?")) return;
    setLoading(true);
    const res = await deleteContact(id);
    if (res.success) {
      if (selectedMessage?.id === id) setSelectedMessage(null);
      fetchPage(page);
    }
    setLoading(false);
  };

  const fetchPage = async (newPage: number) => {
    setIsLoadingList(true);
    const result = await fetchAllContacts(newPage, meta.limit);
    setContacts(result.data);
    setMeta(result.meta);
    setPage(newPage);
    setIsLoadingList(false);
  };

  // ─── Temps relatif en français ──────────────────────
  const timeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `il y a ${minutes}min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    return `il y a ${days}j`;
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* ── En-tête + stats ──────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-main flex items-center gap-x-2">
            <Mail className="w-4 h-4 text-primary" />
            Boîte de réception
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {contacts.length} message{contacts.length > 1 ? "s" : ""} ·{" "}
            {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* ── Liste des messages ────────────────────── */}
        <div className="lg:col-span-1 space-y-2">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedMessage(contact)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                selectedMessage?.id === contact.id
                  ? "border-primary/30 bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:bg-accent/30"
              }`}
            >
              <div className="flex items-start gap-x-3">
                {/* Avatar initiales */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    contact.read ? "bg-accent" : "bg-primary/10"
                  }`}
                >
                  <span
                    className={`text-[11px] font-bold ${
                      contact.read ? "text-muted-foreground" : "text-primary"
                    }`}
                  >
                    {contact.firstName[0]}
                    {contact.lastName[0]}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-x-2">
                    <p
                      className={`text-sm truncate ${
                        contact.read
                          ? "font-medium text-muted-foreground"
                          : "font-bold text-main"
                      }`}
                    >
                      {contact.firstName} {contact.lastName}
                    </p>
                    {!contact.read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {contact.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1 flex items-center gap-x-1">
                    <Clock className="w-3 h-3" />
                    {timeAgo(contact.createdAt)}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-1" />
              </div>
            </button>
          ))}

          <div className="pt-2">
            {isLoadingList ? (
              <div className="flex justify-center p-4">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Pagination
                currentPage={page}
                totalPages={meta.totalPages}
                onPageChange={fetchPage}
              />
            )}
          </div>
        </div>

        {/* ── Détail du message ─────────────────────── */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div
              key={selectedMessage.id}
              className="rounded-2xl border border-border bg-card p-6 space-y-5 animate-in fade-in slide-in-from-right-2 duration-300"
            >
              {/* En-tête */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-x-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {selectedMessage.firstName[0]}
                      {selectedMessage.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-main">
                      {selectedMessage.firstName} {selectedMessage.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedMessage.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Statut + date */}
              <div className="flex items-center gap-x-3 text-xs text-muted-foreground">
                {selectedMessage.read ? (
                  <span className="flex items-center gap-x-1 px-2.5 py-1 rounded-full bg-accent">
                    <MailOpen className="w-3 h-3" />
                    Lu
                  </span>
                ) : (
                  <span className="flex items-center gap-x-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    <Mail className="w-3 h-3" />
                    Non lu
                  </span>
                )}
                <span className="flex items-center gap-x-1">
                  <Clock className="w-3 h-3" />
                  {new Date(selectedMessage.createdAt).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </span>
              </div>

              {/* Corps du message */}
              <div className="p-5 rounded-xl bg-accent/30 border border-border">
                <p className="text-sm leading-relaxed text-main">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => handleToggleRead(selectedMessage.id)}
                  disabled={loading}
                  className="flex items-center gap-x-2 px-3 md:px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer min-w-0"
                >
                  {selectedMessage.read ? (
                    <>
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden sm:inline">
                        Marquer comme
                      </span>{" "}
                      non lu
                    </>
                  ) : (
                    <>
                      <MailOpen className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden sm:inline">Marquer comme</span> lu
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  disabled={loading}
                  className="flex items-center gap-x-2 px-3 md:px-4 py-2 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/15 transition-colors disabled:opacity-50 cursor-pointer min-w-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Supprimer
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-border bg-card">
              <Mail className="w-12 h-12 text-muted-foreground/20 mb-4" />
              <p className="text-sm font-medium text-muted-foreground">
                Sélectionnez un message
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                Cliquez sur un message pour lire son contenu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
