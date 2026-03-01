import prisma from "@/lib/db.js";
import AppError from "@/utils/appError.js";
import hashPassword from "@/utils/hashPassword.js";
import type {
  loginInput,
  registrationInput,
} from "@/validators/vallidators.js";
import generateTokens from "@/utils/generateTokens.js";
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
  const {accessToken, refreshToken} = generateTokens(admin.id);

  const adminWithOutPassword = {id: admin.id, email: admin.email, name: admin.name};

  return {adminWithOutPassword, accessToken, refreshToken};
};

export { registerUser, loginUser };
