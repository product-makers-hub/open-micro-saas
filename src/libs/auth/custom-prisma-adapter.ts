import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

import { USER_ROLE_ID } from "@/consts/roles-consts";

/**
 * This function is used to create a custom adapter for PrismaClient
 * since the default adapter does not support the creation of users with
 * relations like Role.
 *
 * See the original adapter here:
 * https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-prisma/src/index.ts
 *
 * @param prisma
 * @returns Adapter for PrismaClient
 */
export const CustomPrismaAdapter = (prisma: PrismaClient) => {
  const adapter = PrismaAdapter(prisma);

  adapter.createUser = async ({ ...data }) => {
    console.log("createUser", data);
    const userExist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExist) {
      return {
        ...userExist,
        email: userExist.email as string,
      };
    }

    const createdUser = await prisma.user.create({
      data: {
        ...data,
        email: data.email,
        name: data.name || data?.email?.split("@")[0],
        emailVerified: data.emailVerified,
        image:
          data.image ||
          `https://www.gravatar.com/avatar/${Math.random()
            .toString(36)
            .substring(7)}?d=identicon&r=PG`,
        role: {
          connect: {
            id: USER_ROLE_ID,
          },
        },
      },
    });

    return {
      ...createdUser,
      email: createdUser.email as string,
    };
  };

  return adapter;
};
