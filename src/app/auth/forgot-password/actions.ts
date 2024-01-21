"use server";

import { getUserByEmail } from "@/repositories/user-repository";
import { encodeToken } from "@/libs/jwt";
import { sendEmail } from "@/libs/mailgun";

interface PrevState {
  message: string;
}

export const requestResetPassword = async (
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

  const user = await getUserByEmail(email.toString());

  if (!user || !user.email || !user.password) {
    return defaultResponse;
  }

  const token = encodeToken({
    uid: user.publicId,
  });

  const link = `${process.env.NEXTAUTH_URL}auth/reset-password/${token}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Click <a href="${link}">here</a> to reset your password.</p>
    `,
  });

  return defaultResponse;
};
