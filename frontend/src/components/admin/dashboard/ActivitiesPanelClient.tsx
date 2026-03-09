"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  FileText,
  X,
  Send,
  AlertCircle,
  Search,
  Image as ImageIcon,
  Loader2,
  Edit,
} from "lucide-react";
import type { Activity } from "@/src/types/admin";
import {
  createActivity,
  updateActivity,
  deleteActivity,
  fetchAllActivities,
  uploadImage,
} from "@/src/services/admin.service";
import type { PaginatedResponse } from "@/src/services/admin.service";
import { Pagination } from "@/src/components/admin/dashboard/Pagination";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activitySchema, ActivityInput } from "@/src/lib/admin.validators";
import dynamic from "next/dynamic";
import DOMPurify from "isomorphic-dompurify";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function ActivitiesPanelClient({
  initialData,
}: {
  initialData: PaginatedResponse<Activity>;
}) {
  const [activities, setActivities] = useState<Activity[]>(initialData.data);
  const [meta, setMeta] = useState(initialData.meta);
  const [page, setPage] = useState(initialData.meta.page);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [serverError, setServerError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ActivityInput>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      published: true,
    },
  });

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setServerError("");
    const res = await uploadImage(file);
    if (res.success && res.url) {
      setValue("imageUrl", res.url, { shouldValidate: true });
    } else {
      setServerError(res.message || "Erreur lors de l'upload de l'image");
    }
    setIsUploadingImage(false);
  };

  const onSubmit = async (data: ActivityInput) => {
    setServerError("");

    let result;
    if (editingId) {
      result = await updateActivity(editingId, data);
    } else {
      result = await createActivity(data);
    }

    if (result.success) {
      setShowForm(false);
      setEditingId(null);
      reset({
        title: "",
        description: "",
        content: "",
        category: "",
        imageUrl: "",
        published: true,
      });

      const fileInput = document.getElementById(
        "imageUpload",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      router.refresh();
      // Actualisation de la page
      fetchPage(page);
    } else {
      setServerError(result.message || "Erreur lors de la création");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette activité ?")) return;
    const result = await deleteActivity(id);
    if (result.success) {
      setEditingId(null);
      fetchPage(page);
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingId(activity.id);
    reset({
      title: activity.title,
      description: activity.description,
      content: activity.content || "",
      category: activity.category,
      imageUrl: activity.imageUrl,
      published: activity.published,
    });
    setServerError("");
    setShowForm(true);
  };

  const fetchPage = async (newPage: number) => {
    setIsLoading(true);
    const result = await fetchAllActivities(newPage, meta.limit);
    setActivities(result.data);
    setMeta(result.meta);
    setPage(newPage);
    setIsLoading(false);
  };

  //  Filtrage 
  const filtered =
    activities?.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/*  Barre d'outils  */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Recherche */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une activité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-main placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200"
          />
        </div>

        {/* Bouton créer */}
        <button
          onClick={() => {
            if (showForm) {
              setEditingId(null);
              reset({
                title: "",
                description: "",
                content: "",
                category: "",
                imageUrl: "",
                published: true,
              });
              const fileInput = document.getElementById(
                "imageUpload",
              ) as HTMLInputElement;
              if (fileInput) fileInput.value = "";
            }
            setShowForm(!showForm);
          }}
          className="flex items-center gap-x-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200 cursor-pointer shadow-sm"
        >
          {showForm ? (
            <>
              <X className="w-4 h-4" />
              Annuler
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Nouvelle activité
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-primary/20 bg-card p-4 md:p-6 space-y-4"
          >
            <h3 className="text-sm font-bold text-main flex items-center gap-x-2">
              <Plus className="w-4 h-4 text-primary" />
              {editingId ? "Modifier l'activité" : "Créer une activité"}
            </h3>

            {serverError && (
              <div className="flex items-center gap-x-2 px-4 py-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="title"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Titre *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Ex: Distribution de kits scolaires"
                  className={`w-full px-4 py-2.5 rounded-xl bg-background border ${errors.title ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                />
                {errors.title && (
                  <p className="text-[10px] text-destructive font-medium">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="category"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Catégorie *
                </label>
                <input
                  id="category"
                  type="text"
                  {...register("category")}
                  placeholder="Ex: Éducation, Santé, Formation"
                  className={`w-full px-4 py-2.5 rounded-xl bg-background border ${errors.category ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all`}
                />
                {errors.category && (
                  <p className="text-[10px] text-destructive font-medium">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Description courte *
              </label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Description courte de l'activité..."
                rows={3}
                className={`w-full px-4 py-2.5 rounded-xl bg-background border ${errors.description ? "border-destructive" : "border-border"} text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none`}
              />
              {errors.description && (
                <p className="text-[10px] text-destructive font-medium">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5 flex flex-col">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Contenu détaillé (HTML)
              </label>
              <div className="bg-background rounded-xl border border-border overflow-hidden [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[160px] focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/40 transition-all">
                <ReactQuill
                  theme="snow"
                  value={watch("content") || ""}
                  onChange={(val) =>
                    setValue("content", val, { shouldValidate: true })
                  }
                  placeholder="Rédigez le contenu complet de l'article ici..."
                />
              </div>
              {errors.content && (
                <p className="text-[10px] text-destructive font-medium">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="imageUpload"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-x-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Image de l&apos;activité *
              </label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploadingImage}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer disabled:opacity-50"
                  />
                </div>
                {watch("imageUrl") ? (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border shadow-sm group">
                    <img
                      src={watch("imageUrl")}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-dashed border-border bg-accent/30 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <input type="hidden" {...register("imageUrl")} />
              {errors.imageUrl && (
                <p className="text-[10px] text-destructive font-medium">
                  {errors.imageUrl.message}
                </p>
              )}
              {isUploadingImage && (
                <p className="text-xs text-primary font-medium animate-pulse mt-1">
                  Upload en cours...
                </p>
              )}
            </div>

            {/* Toggle Publication */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-main">
                  Publier l&apos;article
                </p>
                <p className="text-xs text-muted-foreground">
                  L&apos;article sera visible par tous les visiteurs s&apos;il
                  est publié.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("published")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
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
                {isSubmitting
                  ? "Enregistrement..."
                  : editingId
                    ? "Enregistrer"
                    : "Publier"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Liste des activités ───────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-border bg-card animate-in fade-in duration-500">
          <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-sm font-medium text-muted-foreground">
            {searchQuery
              ? "Aucun résultat trouvé"
              : "Aucune activité pour le moment"}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            {searchQuery
              ? "Essayez un autre terme de recherche"
              : "Créez votre première activité avec le bouton ci-dessus"}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card overflow-hidden animate-in fade-in duration-500">
          {/* En-tête du tableau */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] uppercase tracking-[0.15em] font-semibold text-muted-foreground border-b border-border bg-accent/30">
            <div className="col-span-5">Titre</div>
            <div className="col-span-2">Catégorie</div>
            <div className="col-span-2">Statut</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Lignes */}
          <div className="divide-y divide-border">
            {filtered.map((activity) => (
              <div
                key={activity.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-start md:items-center px-4 md:px-6 py-3 md:py-4 hover:bg-accent/20 transition-colors duration-200"
              >
                {/* Titre + description */}
                <div className="md:col-span-5 min-w-0">
                  <p className="text-sm font-semibold text-main truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {DOMPurify.sanitize(activity.description).replace(
                      /<[^>]+>/g,
                      "",
                    )}
                  </p>
                </div>

                {/* Catégorie */}
                <div className="md:col-span-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                    {activity.category}
                  </span>
                </div>

                {/* Statut */}
                <div className="md:col-span-2">
                  <span
                    className={`inline-flex items-center gap-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      activity.published
                        ? "bg-green-500/15 text-green-600 dark:text-green-400"
                        : "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {activity.published ? "Publié" : "Brouillon"}
                  </span>
                </div>

                {/* Date */}
                <div className="md:col-span-2 text-xs text-muted-foreground">
                  {new Date(activity.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex justify-start md:justify-end gap-x-1 md:gap-x-2">
                  <button
                    onClick={() => handleEdit(activity)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 cursor-pointer"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 cursor-pointer"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border bg-card">
            {isLoading ? (
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
      )}
    </div>
  );
}
