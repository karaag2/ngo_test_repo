import type { Request, Response } from "express";
import { loginSchema, registrationSchema } from "@/validators/vallidators.js";
import AppError from "@/utils/appError.js";
import { registerUser, loginUser } from "@/services/auth.service.js";

export const loginController = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw new AppError("Invalid Credentials", 400);
  }
  const { email, password } = result.data;
  const { adminWithOutPassword, accessToken, refreshToken } = await loginUser({
    email,
    password,
  });
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
