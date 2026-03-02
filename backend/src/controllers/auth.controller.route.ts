import type { Request, Response } from "express";
import {
  loginSchema,
  registrationSchema,
} from "@/validators/vallidators.js";
import AppError from "@/utils/appError.js";
import {
  registerUser,
  loginUser,
  set2faService,
  check2FAService,
} from "@/services/auth.service.js";

export const loginController = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Invalid Credentials", 400);
  }
  const { email, password } = result.data;
  const { requires2FA,adminWithOutPassword, accessToken, refreshToken } = await loginUser({
    email,
    password,
  });
  if (requires2FA) {
    return res.json({ message: "success", tempAdmin: adminWithOutPassword }).status(200);
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
  res.json({ message: "success", admin: adminWithOutPassword }).status(200);
};

export const registerController = async (req: Request, res: Response) => {
  const result = registrationSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Invalid Credentials", 400);
  }
  const { email, password, name } = result.data;
  await registerUser({ email, password, name });
  res.json({ message: "success" }).status(201);
};

export const set2faController = async (req: Request, res: Response) => {
  const { email } = req.body;
  const qrCode = await set2faService(email);
  res.json({ message: "success", qrCode }).status(200);
};
export const check2FAController = async (req: Request, res: Response) => {
  const { code,tempAdminId } = req.body;
  const isCodeCorrect = await check2FAService(tempAdminId, code);
  res.json({ message: "success", isCodeCorrect }).status(200);  
};
