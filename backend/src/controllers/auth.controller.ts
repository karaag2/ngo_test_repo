import type { Request, Response } from "express";
import {
  loginSchema,
  registrationSchema,
  updateProfileSchema,
  changePasswordSchema,
  check2FASchema,
  confirmSetup2FASchema,
  type RequestWithUser,
} from "@/validators/auth.validator.js";
import AppError from "@/utils/appError.js";
import {
  registerUser,
  loginUser,
  set2faService,
  check2FAService,
  logOut,
  getAdminProfile,
  updateAdminProfile,
  changePasswordWithOTP,
  confirmSetup2FAService,
} from "@/services/auth.service.js";

export const loginController = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Identifiants invalides", 400);
  }
  const { email, password } = result.data;
  const { necessite2FA, adminSansMotDePasse, accessToken, refreshToken } =
    await loginUser({
      email,
      password,
    });
  if (necessite2FA) {
    return res
      .json({
        necessite2FA,
        message: "Connexion réussie",
        adminTemporaire: adminSansMotDePasse,
      })
      .status(200);
  }
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res
    .json({ message: "Connexion réussie", admin: adminSansMotDePasse })
    .status(200);
};

export const registerController = async (req: Request, res: Response) => {
  const result = registrationSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Données invalides", 400);
  }
  const { email, password, name } = result.data;
  await registerUser({ email, password, name });
  res.json({ message: "Succès" }).status(201);
};

export const set2faController = async (req: Request, res: Response) => {
  const { email } = (req as RequestWithUser).user;
  const { qrCode, manualKey } = await set2faService(email);
  res.json({ message: "Succès", qrCode, manualKey }).status(200);
};

export const confirmSetup2FAController = async (
  req: Request,
  res: Response,
) => {
  const parsed = confirmSetup2FASchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Le code 2FA doit contenir exactement 6 chiffres", 400);
  }

  const adminId = (req as RequestWithUser).user.id;
  await confirmSetup2FAService(adminId, parsed.data.code);
  res.json({ message: "2FA activé avec succès" }).status(200);
};

export const check2FAController = async (req: Request, res: Response) => {
  const parsed = check2FASchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Données 2FA invalides", 400);
  }

  const { code, tempAdminId } = parsed.data;
  const { codeValide, accessToken, refreshToken } = await check2FAService(
    tempAdminId,
    code,
  );
  if (!codeValide) {
    throw new AppError("Code invalide", 400);
  }
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: "Succès", codeValide }).status(200);
};

export const logOutController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;
  await logOut(adminId);

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Déconnecté avec succès" });
};

export const getProfileController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;
  const profile = await getAdminProfile(adminId);
  return res.status(200).json({ message: "Succès", profile });
};

export const updateProfileController = async (req: Request, res: Response) => {
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError("Données de profil invalides", 400);
  }

  const adminId = (req as RequestWithUser).user.id;
  const profile = await updateAdminProfile(adminId, parsed.data);
  return res.status(200).json({ message: "Profil mis à jour", profile });
};

export const changePasswordController = async (req: Request, res: Response) => {
  const parsed = changePasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(
      "Données invalides (OTP de 6 chiffres et mot de passe robuste requis)",
      400,
    );
  }

  const adminId = (req as RequestWithUser).user.id;
  await changePasswordWithOTP(
    adminId,
    parsed.data.otp,
    parsed.data.newPassword,
  );
  return res.status(200).json({ message: "Mot de passe modifié avec succès" });
};
