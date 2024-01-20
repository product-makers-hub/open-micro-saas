import prisma from "@/libs/prisma";

interface User {
  email: string;
  name: string;
  password: string;
  isActive?: boolean;
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
    where: { publicId: uid },
  });
};

export const createOrUpdateUser = async ({
  email,
  name,
  password,
  role,
  isActive = true,
}: User) => {
  return await prisma.user.upsert({
    where: { email: email },
    update: {},
    create: {
      email,
      name,
      password,
      isActive,
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

export const updateUserPasswordByEmail = async (
  email: string,
  password: string,
) => {
  return await prisma.user.update({
    where: { email },
    data: {
      password,
    },
  });
};
