import prisma from "@/libs/prisma";

interface Role {
  id: number;
  name: string;
}

export const createOrUpdateRole = async ({ id, name }: Role) => {
  return await prisma.role.upsert({
    where: { id },
    update: {},
    create: {
      id,
      name: name,
    },
  });
};
