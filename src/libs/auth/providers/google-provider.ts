import GoogleProvider from "next-auth/providers/google";

import { getUserByEmail } from "@/repositories/user-repository";

export const getGoogleProvider = () =>
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    async profile(profile) {
      const user = await getUserByEmail(profile.email);

      return {
        id: profile.sub,
        name: profile.given_name ? profile.given_name : profile.name,
        email: profile.email,
        image: profile.picture,
        createdAt: new Date(),
        isActive: user?.isActive || true,
      };
    },
  });
