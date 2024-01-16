"use server";

import prisma from "@/libs/prisma";

interface PrevState {
  message: string;
}

export const requestResetPassword = (
  prevState: PrevState,
  formData: FormData,
) => {
  const email = formData.get("email");

  if (!email) {
    throw new Error("Email is required");
  }

  const defaultResponse = {
    message:
      "If your email address is registered, you will receive an email with instructions on how to reset your password in a few minutes.",
  };

  const user = prisma.user.findUnique({
    where: {
      email: email.toString(),
    },
  });

  if (!user) {
    return defaultResponse;
  }

  // TODO: Send email with reset password link

  return defaultResponse;
};
