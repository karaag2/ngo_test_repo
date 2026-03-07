import type { Request, Response } from "express";
import {
  loginSchema,
  registrationSchema,
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
  const { email } = req.body;
  const qrCode = await set2faService(email);
  res.json({ message: "Succès", qrCode }).status(200);
};
export const check2FAController = async (req: Request, res: Response) => {
  const { code, tempAdminId } = req.body;
  const { codeValide, accessToken, refreshToken } = await check2FAService(
    tempAdminId,
    code,
  );
  if (!codeValide) {
    throw new AppError("Code invalide", 400);
  }
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
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
    secure: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
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
  const adminId = (req as RequestWithUser).user.id;
  const { name, email } = req.body;
  if (!name || !email) {
    throw new AppError("Name and email are required", 400);
  }

  const profile = await updateAdminProfile(adminId, { name, email });
  return res.status(200).json({ message: "Profil mis à jour", profile });
};

export const changePasswordController = async (req: Request, res: Response) => {
  const adminId = (req as RequestWithUser).user.id;
  const { otp, newPassword } = req.body;

  if (!otp || !newPassword || newPassword.length < 8) {
    throw new AppError("Invalid input (OTP and new password req.)", 400);
  }

  await changePasswordWithOTP(adminId, otp, newPassword);
  return res.status(200).json({ message: "Mot de passe modifié avec succès" });
};
