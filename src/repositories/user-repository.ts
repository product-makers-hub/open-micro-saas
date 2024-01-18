import prisma from "@/libs/prisma";

interface User {
  email: string;
  name: string;
  password: string;
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

export const createOrUpdateUser = async ({
  email,
  name,
  password,
  role,
}: User) => {
  return await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email,
      name,
      password,
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
