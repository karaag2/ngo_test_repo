"use client";

import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Briefcase,
  Heart,
  Settings2,
  GripVertical,
  Plus,
  Trash2,
  X,
  Send,
  AlertCircle,
  Search,
  Pencil,
  Loader2,
} from "lucide-react";
import type { Service } from "@/src/types/admin";
import {
  createService,
  updateService,
  deleteService,
  fetchAllServices,
} from "@/src/services/admin.service";
import type { PaginatedResponse } from "@/src/services/admin.service";
import { Pagination } from "@/src/components/admin/dashboard/Pagination";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, ServiceInput } from "@/src/lib/admin.validators";

// Map d'icônes limitées pour les services
const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Briefcase,
  Heart,
  Settings2,
};
const iconOptions = Object.keys(iconMap);

export default function ServicesPanelClient({
  initialData,
}: {
  initialData: PaginatedResponse<Service>;
}) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(initialData.data);
  const [meta, setMeta] = useState(initialData.meta);
  const [page, setPage] = useState(initialData.meta.page);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [serverError, setServerError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceInput>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "Settings2",
      order: 0,
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    reset();
    setServerError("");
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setValue("title", service.title);
    setValue("description", service.description);
    setValue("icon", service.icon || "Settings2");
    setValue("order", service.order || 0);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: ServiceInput) => {
    setServerError("");

    let result;
    if (editingId) {
      result = await updateService(editingId, data);
    } else {
      result = await createService(data);
    }

    if (result.success) {
      resetForm();
      router.refresh();
    } else {
      setServerError(result.message || "Erreur lors de l'opération");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Es-tu sûr de vouloir supprimer ce service ?")) return;

    const result = await deleteService(id);
    if (result.success) {
      fetchPage(page);
    } else {
      alert(result.message || "Erreur lors de la suppression");
    }
  };

  const fetchPage = async (newPage: number) => {
    setIsLoadingList(true);
    const result = await fetchAllServices(newPage, meta.limit);
    setServices(result.data);
    setMeta(result.meta);
    setPage(newPage);
    setIsLoadingList(false);
  };

  // ─── Filtrage ──────────────────────────────────────
  const filtered = services?.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* ── En-tête ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-main flex items-center gap-x-2">
            <Settings2 className="w-4 h-4 text-primary" />
            Services de l&apos;ONG
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {services?.length ?? 0} service
            {(services?.length ?? 0) > 1 ? "s" : ""} actif
            {(services?.length ?? 0) > 1 ? "s" : ""}
          </p>
        </div>

        {/* Recherche et Bouton Créer */}
        <div className="flex items-center gap-x-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-xs text-main placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>

          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                resetForm();
                setShowForm(true);
              }
            }}
            className="flex items-center gap-x-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            {showForm ? (
              <>
                <X className="w-3.5 h-3.5" /> Annuler
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Ajouter
              </>
            )}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit as any)}
            className="rounded-2xl border border-primary/20 bg-card p-4 md:p-6 space-y-4 shadow-sm mb-2"
          >
            <h3 className="text-sm font-bold text-main flex items-center gap-x-2">
              {editingId ? (
                <>
                  <Pencil className="w-4 h-4 text-primary" />
                  Modifier le service
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-primary" />
                  Nouveau service
                </>
              )}
            </h3>

            {serverError && (
              <div className="flex items-center gap-x-2 px-4 py-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 flex-1">
                <label
                  htmlFor="title"
                  className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Titre du service *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Ex: Formation des jeunes"
                  className={`w-full px-4 py-2.5 rounded-xl bg-background border ${errors.title ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                />
                {errors.title && (
                  <p className="text-[10px] text-destructive font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="icon"
                    className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    Icône
                  </label>
                  <div className="relative">
                    <select
                      id="icon"
                      {...register("icon")}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-main appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    >
                      {iconOptions.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="order"
                    className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
                  >
                    Ordre d'affichage
                  </label>
                  <input
                    id="order"
                    type="number"
                    min={0}
                    {...register("order", { valueAsNumber: true })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-background border ${errors.order ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                  />
                  {errors.order && (
                    <p className="text-[10px] text-destructive font-medium">
                      {errors.order.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Description *
              </label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Détails du service..."
                rows={3}
                className={`w-full px-4 py-2.5 rounded-xl bg-background border ${errors.description ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none`}
              />
              {errors.description && (
                <p className="text-[10px] text-destructive font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-x-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {!filtered || filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground bg-card border border-border rounded-2xl">
            Aucun service trouvé.
          </div>
        ) : (
          filtered.map((service) => {
            const Icon = iconMap[service.icon || "Settings2"] || Settings2;
            return (
              <div
                key={service.id}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-border bg-card hover:shadow-premium hover:border-primary/15 transition-all duration-300 relative"
              >
                {/* Icône */}
                <div className="flex items-center gap-x-4">
                  <GripVertical className="hidden sm:block w-4 h-4 text-muted-foreground/30 shrink-0 cursor-grab" />
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>

                {/* Contenu */}
                <div className="flex-1 min-w-0 pr-12 sm:pr-0">
                  <p className="text-sm font-bold text-main">{service.title}</p>
                  <p className="text-[13px] text-muted-foreground mt-1 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* Ordre & Actions */}
                <div className="absolute sm:relative right-4 top-4 sm:right-auto sm:top-auto flex items-center gap-x-3 shrink-0">
                  <span className="hidden sm:flex items-center justify-center min-w-8 h-8 px-2 rounded-lg bg-accent/50 text-[11px] font-bold text-muted-foreground">
                    Ordre: {service.order}
                  </span>

                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer"
                    title="Modifier"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}

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
    </div>
  );
}
