import EmailProvider from "next-auth/providers/email";

import { mailConfig } from "@/config";

export const getEmailProvider = () =>
  EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: mailConfig.fromAdmin,
  });
