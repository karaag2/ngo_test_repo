import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { contactSchema } from "../validators/contact.validator.js";
import {
  loginSchema,
  registrationSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/auth.validator.js";
import { BlogSchema } from "../validators/blog.validators.js";
import { serviceSchema } from "../validators/service.validators.js";

const registry = new OpenAPIRegistry();

// Security Scheme pour JWT
const bearerAuth = registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

// --- SCHEMAS ---
const ContactRequest = registry.register(
  "ContactRequest",
  contactSchema.openapi({ title: "Contact Submission" }),
);
const LoginRequest = registry.register(
  "LoginRequest",
  loginSchema.openapi({ title: "User Login" }),
);
const RegisterRequest = registry.register(
  "RegisterRequest",
  registrationSchema.openapi({ title: "User Registration" }),
);
const BlogRequest = registry.register(
  "BlogRequest",
  BlogSchema.openapi({ title: "Blog Post" }),
);
const ServiceRequest = registry.register(
  "ServiceRequest",
  serviceSchema.openapi({ title: "Service Definition" }),
);

// --- ROUTES: CONTACTS ---
registry.registerPath({
  method: "post",
  path: "/api/contacts",
  tags: ["Contacts"],
  summary: "Envoyer un nouveau message de contact",
  request: {
    body: { content: { "application/json": { schema: ContactRequest } } },
  },
  responses: {
    201: { description: "Message envoyé avec succès" },
    400: { description: "Erreur de validation" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/contacts",
  tags: ["Contacts"],
  summary: "Obtenir la liste des contacts",
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: { description: "Opération réussie" },
    401: { description: "Non autorisé" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/contacts/{id}/read",
  tags: ["Contacts"],
  summary: "Marquer un message comme (non) lu",
  security: [{ [bearerAuth.name]: [] }],
  request: { params: z.object({ id: z.string() }) },
  responses: { 200: { description: "Statut mis à jour" } },
});

registry.registerPath({
  method: "delete",
  path: "/api/contacts/{id}",
  tags: ["Contacts"],
  summary: "Supprimer un message de contact",
  security: [{ [bearerAuth.name]: [] }],
  request: { params: z.object({ id: z.string() }) },
  responses: { 200: { description: "Message supprimé" } },
});

// --- ROUTES: AUTH ---
registry.registerPath({
  method: "post",
  path: "/api/auth/login",
  tags: ["Auth"],
  summary: "Se connecter à un compte",
  request: {
    body: { content: { "application/json": { schema: LoginRequest } } },
  },
  responses: {
    200: { description: "Connexion réussie" },
    401: { description: "Identifiants invalides" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/register",
  tags: ["Auth"],
  summary: "Créer un nouveau compte",
  request: {
    body: { content: { "application/json": { schema: RegisterRequest } } },
  },
  responses: {
    201: { description: "Inscription réussie" },
    400: { description: "Email déjà utilisé" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/check-2fa",
  tags: ["Auth"],
  summary: "Vérifier le code 2FA",
  responses: {
    200: { description: "2FA Valide" },
    400: { description: "Code Invalide" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/setup-2fa",
  tags: ["Auth"],
  summary: "Configurer l'A2F",
  security: [{ [bearerAuth.name]: [] }],
  responses: { 200: { description: "A2F configuré avec succès" } },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/confirm-setup-2fa",
  tags: ["Auth"],
  summary: "Confirmer la configuration de l'A2F",
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({ code: z.string().length(6) }),
        },
      },
    },
  },
  responses: {
    200: { description: "A2F activé avec succès" },
    400: { description: "Code invalide" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/logout",
  tags: ["Auth"],
  summary: "Se déconnecter",
  security: [{ [bearerAuth.name]: [] }],
  responses: { 200: { description: "Déconnexion réussie" } },
});

registry.registerPath({
  method: "get",
  path: "/api/auth/me",
  tags: ["Auth"],
  summary: "Obtenir le profil",
  security: [{ [bearerAuth.name]: [] }],
  responses: { 200: { description: "Profil récupéré" } },
});

registry.registerPath({
  method: "patch",
  path: "/api/auth/me",
  tags: ["Auth"],
  summary: "Mettre à jour le profil",
  security: [{ [bearerAuth.name]: [] }],
  responses: { 200: { description: "Profil mis à jour" } },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/change-password",
  tags: ["Auth"],
  summary: "Changer le mot de passe",
  security: [{ [bearerAuth.name]: [] }],
  responses: { 200: { description: "Mot de passe mis à jour" } },
});

// --- ROUTES: BLOG ---
registry.registerPath({
  method: "get",
  path: "/api/blog/allPosts",
  tags: ["Blog"],
  summary: "Obtenir la liste des articles",
  responses: { 200: { description: "Opération réussie" } },
});

registry.registerPath({
  method: "get",
  path: "/api/blog/post/{PostId}",
  tags: ["Blog"],
  summary: "Obtenir un article",
  security: [{ [bearerAuth.name]: [] }],
  request: { params: z.object({ PostId: z.string() }) },
  responses: { 200: { description: "Opération réussie" } },
});

registry.registerPath({
  method: "get",
  path: "/api/blog/slug/{slug}",
  tags: ["Blog"],
  summary: "Obtenir un article par son slug",
  request: { params: z.object({ slug: z.string() }) },
  responses: { 200: { description: "Opération réussie" } },
});

registry.registerPath({
  method: "post",
  path: "/api/blog/post",
  tags: ["Blog"],
  summary: "Créer un nouvel article de blog",
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: { content: { "application/json": { schema: BlogRequest } } },
  },
  responses: {
    201: { description: "Article créé" },
    400: { description: "Validation Error" },
    401: { description: "Non autorisé" },
  },
});

registry.registerPath({
  method: "patch",
  path: "/api/blog/post/{PostId}",
  tags: ["Blog"],
  summary: "Mettre à jour un article",
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ PostId: z.string() }),
    body: { content: { "application/json": { schema: BlogRequest } } },
  },
  responses: { 200: { description: "Article mis à jour" } },
});

registry.registerPath({
  method: "delete",
  path: "/api/blog/post/{PostId}",
  tags: ["Blog"],
  summary: "Supprimer un article",
  security: [{ [bearerAuth.name]: [] }],
  request: { params: z.object({ PostId: z.string() }) },
  responses: { 200: { description: "Article supprimé" } },
});

// --- ROUTES: SERVICES ---
registry.registerPath({
  method: "get",
  path: "/api/services/allServices",
  tags: ["Services"],
  summary: "Lister les services de l'ONG",
  responses: { 200: { description: "Liste des services récupérée" } },
});

registry.registerPath({
  method: "get",
  path: "/api/services/service/{ServiceId}",
  tags: ["Services"],
  summary: "Obtenir un service",
  security: [{ [bearerAuth.name]: [] }],
  request: { params: z.object({ ServiceId: z.string() }) },
  responses: { 200: { description: "Service récupéré" } },
});

registry.registerPath({
  method: "post",
  path: "/api/services/service",
  tags: ["Services"],
  summary: "Créer un nouveau service",
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: { content: { "application/json": { schema: ServiceRequest } } },
  },
  responses: { 201: { description: "Service créé" } },
});

registry.registerPath({
  method: "patch",
  path: "/api/services/service/{ServiceId}",
  tags: ["Services"],
  summary: "Mettre à jour un service",
  security: [{ [bearerAuth.name]: [] }],
  request: { params: z.object({ ServiceId: z.string() }) },
  responses: { 200: { description: "Service mis à jour" } },
});

registry.registerPath({
  method: "delete",
  path: "/api/services/service/{ServiceId}",
  tags: ["Services"],
  summary: "Supprimer un service",
  security: [{ [bearerAuth.name]: [] }],
  request: { params: z.object({ ServiceId: z.string() }) },
  responses: { 200: { description: "Service supprimé" } },
});

export const generateOpenApiConfig = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "API ONG - Enterprise Edition",
      description:
        "Documentation interactive complète de l'API de l'ONG avec schemas validés par Zod.",
    },
    servers: [{ url: "http://localhost:7000", description: "Serveur local" }],
  });
};
