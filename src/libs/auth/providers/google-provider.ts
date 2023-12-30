import GoogleProvider from "next-auth/providers/google";

export const getGoogleProvider = () =>
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    async profile(profile) {
      return {
        id: profile.sub,
        name: profile.given_name ? profile.given_name : profile.name,
        email: profile.email,
        image: profile.picture,
        createdAt: new Date(),
      };
    },
  });
