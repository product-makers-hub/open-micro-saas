import GoogleProvider from "next-auth/providers/google";

import prisma from "@/libs/prisma";

import { USER_ROLE_ID } from "@/consts/roles-consts";

export const getGoogleProvider = () =>
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    async profile(profile) {
      const user = await prisma.user.findUnique({
        where: { email: profile.email },
        include: { role: true },
      });

      return {
        id: profile.sub,
        name: profile.given_name ? profile.given_name : profile.name,
        email: profile.email,
        image: profile.picture,
        createdAt: new Date(),
        roleId: user?.role?.id || USER_ROLE_ID,
        role: user?.role,
      };
    },
  });
