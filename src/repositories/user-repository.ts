import prisma from "@/libs/prisma";

import { UserRole } from "@/consts/roles-consts";

interface User {
  email: string;
  name: string;
  isActive?: boolean;
  emailVerified?: Date | null;
  image?: string;
  role: {
    id: number;
  };
}

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });
};

export const getUserByUid = async (uid: string) => {
  return await prisma.user.findUnique({
    where: { id: uid },
  });
};

export const createOrUpdateUser = async ({
  email,
  name,
  role,
  isActive = false,
  emailVerified,
  image,
}: User) => {
  return await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email,
      name,
      isActive,
      emailVerified,
      image,
      role: {
        connect: {
          id: role.id,
        },
      },
    },
  });
};

export const getManyUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      isActive: true,
      role: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const toggleUserAccessByEmail = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  return prisma.user.update({
    where: { email },
    data: { isActive: !user.isActive },
  });
};

export const updateUserRoleByEmail = async (email: string, role: UserRole) => {
  try {
    return await prisma.user.update({
      where: { email },
      data: {
        role: {
          connect: {
            name: role,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user role");
  }
};

export const updateStripeCustomerIdByEmail = async (
  email: string,
  stripeCustomerId: string,
) => {
  return await prisma.user.update({
    where: { email },
    data: {
      stripeCustomerId,
    },
  });
};

export const activeUserByStripeCustomerId = async (
  stripeCustomerId: string,
) => {
  return await prisma.user.update({
    where: {
      stripeCustomerId: stripeCustomerId,
    },
    data: {
      isActive: true,
    },
  });
};

export const desactiveUserByStripeCustomerId = async (
  stripeCustomerId: string,
) => {
  return await prisma.user.update({
    where: {
      stripeCustomerId: stripeCustomerId,
    },
    data: {
      isActive: false,
    },
  });
};
