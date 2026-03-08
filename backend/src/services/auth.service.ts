import prisma from "@/lib/db.js";
import AppError from "@/utils/appError.js";
import hashPassword from "@/utils/hashPassword.js";
import bcrypt from "bcrypt";
import type {
  loginInput,
  registrationInput,
} from "@/validators/auth.validator.js";
import generateTokens from "@/utils/generateTokens.js";
import jwt from "jsonwebtoken";
import generateSecret, { check2FACode } from "@/utils/2FA.utils.js";
import generateQrCode from "@/utils/qrCodeGenerator.js";
const registerUser = async (data: registrationInput) => {
  const user = await prisma.admin.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    throw new AppError("L'utilisateur existe déjà", 400);
  }
  const hashedPassword = await hashPassword(data.password);
  const newAdmin = await prisma.admin.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });
};

const loginUser = async (data: loginInput) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!admin) {
    throw new AppError("Identifiants invalides", 400);
  }

  // Vérifier le mot de passe
  const isMatch = await bcrypt.compare(data.password, admin.password);
  if (!isMatch) {
    throw new AppError("Identifiants invalides", 400);
  }

  if (admin.twoFactorEnabled) {
    // 2FA activé : on retourne un état intermédiaire contenant uniquement l'ID
    return {
      necessite2FA: true,
      adminSansMotDePasse: admin.id,
      refreshToken: null,
      accessToken: null,
    };
  }

  const { accessToken, refreshToken } = generateTokens({
    payload: { id: admin.id, email: admin.email, role: admin.role },
  });

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({
    data: { adminId: admin.id, token: refreshToken, expiresAt },
  });

  const adminSansMotDePasse = {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  };

  return {
    necessite2FA: false,
    adminSansMotDePasse,
    accessToken,
    refreshToken,
  };
};

const logOut = async (adminId: string) => {
  await prisma.admin.update({
    where: {
      id: adminId,
    },
    data: {
      refreshTokens: {
        deleteMany: {
          adminId: adminId,
        },
      },
    },
  });
};

const set2faService = async (adminEmail: string) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email: adminEmail,
    },
  });
  if (!admin) {
    throw new AppError("Identifiants invalides", 400);
  }
  if (admin.twoFactorEnabled) {
    throw new AppError("La 2FA est déjà activée", 400);
  }
  const secret = await generateSecret(admin.email);
  if (secret.otpauth_url) {
    const qrCode = await generateQrCode(secret.otpauth_url);
    return { qrCode, manualKey: secret.base32 };
  }
  throw new AppError("Échec lors de la génération du QR code", 500);
};

export const confirmSetup2FAService = async (adminId: string, code: string) => {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) throw new AppError("Admin non trouvé", 404);
  if (admin.twoFactorEnabled)
    throw new AppError("La 2FA est déjà activée", 400);
  if (!admin.twoFactorSecret)
    throw new AppError("Configuration 2FA non initialisée", 400);

  const codeValide = check2FACode(admin.twoFactorSecret, code);
  if (!codeValide) throw new AppError("Code invalide", 400);

  await prisma.admin.update({
    where: { id: adminId },
    data: { twoFactorEnabled: true },
  });

  return true;
};

export const check2FAService = async (adminId: string, code: string) => {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) throw new AppError("Invalide", 404);
  const codeValide = check2FACode(admin.twoFactorSecret!, code);
  if (!codeValide) throw new AppError("Invalide", 404);
  const { accessToken, refreshToken } = generateTokens({
    payload: { id: admin.id, email: admin.email, role: admin.role },
  });
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours
  await prisma.refreshToken.create({
    data: {
      adminId: admin.id,
      token: refreshToken,
      expiresAt: expiresAt,
    },
  });
  return { codeValide, accessToken, refreshToken };
};

export const getAdminProfile = async (adminId: string) => {
  const admin = await prisma.admin.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      twoFactorEnabled: true,
      createdAt: true,
    },
  });
  if (!admin) throw new AppError("Admin non trouvé", 404);
  return admin;
};

export const updateAdminProfile = async (
  adminId: string,
  data: { name: string; email: string },
) => {
  // Vérifier si l'email n'est pas déjà pris
  const existing = await prisma.admin.findUnique({
    where: { email: data.email },
  });
  if (existing && existing.id !== adminId) {
    throw new AppError("Cet email est déjà utilisé", 400);
  }

  const updatedAdmin = await prisma.admin.update({
    where: { id: adminId },
    data: { name: data.name, email: data.email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      twoFactorEnabled: true,
      createdAt: true,
    },
  });
  return updatedAdmin;
};

export const changePasswordWithOTP = async (
  adminId: string,
  code: string,
  newPasswordStr: string,
) => {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) throw new AppError("Admin non trouvé", 404);

  // Vérifier que le 2FA est activé
  if (!admin.twoFactorEnabled || !admin.twoFactorSecret) {
    throw new AppError(
      "L'authentification 2FA doit être activée pour faire ça via OTP",
      400,
    );
  }

  // Vérifier le code 2FA
  const isCodeCorrect = check2FACode(admin.twoFactorSecret, code);
  if (!isCodeCorrect) {
    throw new AppError("Code 2FA invalide", 400);
  }

  const hashedPassword = await hashPassword(newPasswordStr);
  await prisma.admin.update({
    where: { id: adminId },
    data: { password: hashedPassword },
  });

  return true;
};

export { registerUser, loginUser, logOut, set2faService };
