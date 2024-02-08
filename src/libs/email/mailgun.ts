import formData from "form-data";
import Mailgun from "mailgun.js";

import { mailConfig } from "@/config/mail-config";

const mailgunApiKey = process.env.MAILGUN_API_KEY;
const isTest = process.env.NODE_ENV === "test";

if (!mailgunApiKey) {
  console.error("MAILGUN_API_KEY is not defined");
}

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
  if (isTest) {
    console.log("Email sent", { to, subject, html, text });
    return;
  }

  try {
    const mailgun = new Mailgun(formData);

    const mg = mailgun.client({
      username: "api",
      key: mailgunApiKey || "",
    });

    await mg.messages.create(mailConfig.domain, {
      from: mailConfig.fromAdmin,
      to: [to],
      subject,
      text,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};
