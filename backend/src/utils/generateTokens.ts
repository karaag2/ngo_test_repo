import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
const generateTokens = (payload: string) => {
  const accessSecret = process.env.JWT_ACCESS_SECRET || "";

  const refreshSecret = process.env.JWT_REFRESH_SECRET || "";

  const accessExp = (process.env.JWT_ACCESS_EXPIRATION as StringValue) || "15m";

  const refreshExp =
    (process.env.JWT_REFRESH_EXPIRATION as StringValue) || "7d";

  const accessToken = jwt.sign({ payload: payload }, accessSecret, {
    expiresIn: accessExp,
  });

  const refreshToken = jwt.sign({ payload: payload }, refreshSecret, {
    expiresIn: refreshExp,
  });

  return { accessToken, refreshToken };
};

export default generateTokens;
