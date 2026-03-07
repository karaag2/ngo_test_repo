import type { UserPayload } from "@/validators/auth.validator.js";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
const generateTokens = (payload: UserPayload) => {
  const accessSecret = process.env.JWT_ACCESS_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new Error("Clés secrètes JWT manquantes dans l'environnement");
  }

  const accessExp = (process.env.JWT_ACCESS_EXPIRATION as StringValue) || "15m";

  const refreshExp =
    (process.env.JWT_REFRESH_EXPIRATION as StringValue) || "7d";

  const accessToken = jwt.sign({ payload: payload.payload }, accessSecret, {
    expiresIn: accessExp,
  });

  const refreshToken = jwt.sign({ payload: payload.payload }, refreshSecret, {
    expiresIn: refreshExp,
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
