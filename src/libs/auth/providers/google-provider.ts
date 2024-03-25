import GoogleProvider from "next-auth/providers/google";

export const getGoogleProvider = () =>
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  });
