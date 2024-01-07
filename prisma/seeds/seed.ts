import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { ADMIN_ROLE_ID, USER_ROLE_ID } from "../../src/consts/roles-consts";

async function main() {
  const roleAdmin = await prisma.role.upsert({
    where: { id: ADMIN_ROLE_ID },
    update: {},
    create: {
      id: ADMIN_ROLE_ID,
      name: "ADMIN",
    },
  });

  const roleUser = await prisma.role.upsert({
    where: { id: USER_ROLE_ID },
    update: {},
    create: {
      id: USER_ROLE_ID,
      name: "USER",
    },
  });

  console.log({ roleAdmin, roleUser });

  const userAdmin = await prisma.user.upsert({
    where: { email: "admin@open-saas.com" },
    update: {},
    create: {
      email: "admin@open-saas.com",
      name: "Admin",
      password: "admin",
      role: {
        connect: {
          id: roleAdmin.id,
        },
      },
    },
  });

  const userNormal = await prisma.user.upsert({
    where: { email: "user@open-saas.com" },
    update: {},
    create: {
      email: "user@open-saas.com",
      name: "Jimmy Doe",
      password: "user",
      role: {
        connect: {
          id: roleUser.id,
        },
      },
    },
  });

  console.log({ userAdmin, userNormal });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
