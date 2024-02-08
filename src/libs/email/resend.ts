import { Resend } from "resend";

import { mailConfig } from "@/config/mail-config";

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) => {
  try {
    await resend.emails.send({
      from: mailConfig.fromAdmin,
      to,
      subject,
      html,
      text,
    });
  } catch (error) {
    console.log(error);
  }
};
