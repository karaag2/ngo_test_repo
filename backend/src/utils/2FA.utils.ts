import speakeasy from "speakeasy";
import QRCode from "qrcode";
import prisma from "@/lib/db.js";
import AppError from "./appError.js";
import type { Admin } from "@/generated/prisma/client.js";

const generateSecret = async (adminEmail: string) => {
  const secret = speakeasy.generateSecret({
    length: 20,
    name: `MonONG (${adminEmail})`, // nom affiché dans Google Authenticator
  });

  // Stocke le secret en DB temporairement (ou définitivement mais sans activer 2FA)
  await prisma.admin.update({
    where: { email: adminEmail },
    data: { twoFactorSecret: secret.base32 },
  });
  return secret;
};

export default generateSecret;
export const check2FACode = (twoFactorSecret: string, codeFromUser: string) => {
  const verified = speakeasy.totp.verify({
    secret: twoFactorSecret!,
    encoding: "base32",
    token: codeFromUser,
  });

  if (!verified) throw new AppError("Code 2FA invalide", 401);
  return true;
};
