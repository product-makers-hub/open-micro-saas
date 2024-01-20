"use server";

import { decodeToken } from "@/libs/jwt";
import { hashPassword } from "@/libs/password-lib";
import {
  getUserByUid,
  updateUserPasswordByEmail,
} from "@/repositories/user-repository";

export const resetPassword = async (formData: FormData) => {
  try {
    const token = formData.get("token");
    const password = formData.get("password");

    if (!token || !password) {
      throw new Error("Token and password are required");
    }

    const decodedToken = decodeToken(token.toString());

    if (!decodedToken) {
      throw new Error("Invalid token");
    }

    const user = await getUserByUid(decodedToken.uid);

    if (!user || !user.email) {
      throw new Error("User not found");
    }

    const hashedPassword = await hashPassword(password.toString());

    await updateUserPasswordByEmail(user.email, hashedPassword);
    console.log("success!");
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
