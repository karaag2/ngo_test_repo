import prisma from "@/lib/db.js";
import AppError from "@/utils/appError.js";
import hashPassword from "@/utils/hashPassword.js";
import type {
  loginInput,
  registrationInput,
} from "@/validators/vallidators.js";
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
    throw new AppError("Invalid Credentials", 400);
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
    throw new AppError("Invalid Credentials", 400);
  }
  if (admin.twoFactorEnabled) {
    const tempAdmin = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    };
    // Ne pas générer encore JWT complet
    return {
      requires2FA: true,
      adminWithOutPassword: admin.id,
      refreshToken: null,
      accessToken: null,
    };
  }

  const { accessToken, refreshToken } = generateTokens({
    user: { id: admin.id, email: admin.email, role: admin.role },
  });

  const adminWithOutPassword = {
    id: admin.id,
    email: admin.email,
    name: admin.name,
  };

  return {
    requires2FA: false,
    adminWithOutPassword,
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
      // otp
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
    throw new AppError("Invalid Credentials", 400);
  }
  if (admin.twoFactorEnabled) {
    throw new AppError("2FA is already enabled", 400);
  }
  const secret = await generateSecret(admin.email);
  if (secret.otpauth_url) {
    const qrCode = await generateQrCode(secret.otpauth_url);
    return qrCode;
  }
  throw new AppError("Failed to generate QR code", 500);
};

export const check2FAService = async (adminId: string, code: string) => {
  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) throw new AppError("Invalid", 404);
  const isCodeCorrect = check2FACode(admin.twoFactorSecret!, code);
  if (!isCodeCorrect) throw new AppError("Invalid", 404);
  return isCodeCorrect;
};

export { registerUser, loginUser, logOut, set2faService };
