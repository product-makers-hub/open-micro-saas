"use server";

import { decodeToken } from "@/libs/jwt";
import { hashPassword } from "@/libs/password-lib";
import {
  getUserByUid,
  updateUserPasswordByEmail,
} from "@/repositories/user-repository";

export interface PrevState {
  message: string;
  status: string;
}

export const resetPassword = async (
  prevState: PrevState,
  formData: FormData,
) => {
  try {
    const token = formData.get("token");
    const password = formData.get("password");

    if (!token || !password) {
      return {
        message: "Token and password are required.",
        status: "error",
      };
    }

    const decodedToken = decodeToken(token.toString());

    if (!decodedToken) {
      return {
        message:
          "The reset password link has expired. Please request a new one.",
        status: "error",
      };
    }

    const user = await getUserByUid(decodedToken.uid);

    if (!user || !user.email) {
      return {
        message: "The user you are trying to update is using a social account.",
        status: "error",
      };
    }

    const hashedPassword = await hashPassword(password.toString());

    await updateUserPasswordByEmail(user.email, hashedPassword);

    return {
      message: "Password updated!",
      status: "success",
    };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return {
      message:
        "There was an error. Please try again. If the error persists, please contact support.",
      status: "error",
    };
  }
};
