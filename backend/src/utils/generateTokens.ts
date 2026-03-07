import type { UserPayload } from "@/validators/auth.validator.js";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { env } from "@/config/env.js";
const generateTokens = (payload: UserPayload) => {
  const accessSecret = env.JWT_ACCESS_SECRET;
  const refreshSecret = env.JWT_REFRESH_SECRET;

  const accessExp = (env.JWT_ACCESS_EXPIRATION as StringValue) || "15m";
  const refreshExp = (env.JWT_REFRESH_EXPIRATION as StringValue) || "7d";

  const accessToken = jwt.sign({ payload: payload.payload }, accessSecret, {
    expiresIn: accessExp,
  });

  const refreshToken = jwt.sign({ payload: payload.payload }, refreshSecret, {
    expiresIn: refreshExp,
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
