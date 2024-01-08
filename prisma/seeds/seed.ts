import prisma from "../../src/libs/prisma";
import { ADMIN_ROLE_ID, USER_ROLE_ID } from "../../src/consts/roles-consts";
import { hashPassword } from "../../src/libs/password-lib";

export async function createAdminRoleAndUser() {
  const roleAdmin = await prisma.role.upsert({
    where: { id: ADMIN_ROLE_ID },
    update: {},
    create: {
      id: ADMIN_ROLE_ID,
      name: "ADMIN",
    },
  });

  console.log({ roleAdmin });

  const userAdmin = await prisma.user.upsert({
    where: { email: "admin@open-saas.com" },
    update: {},
    create: {
      email: "admin@open-saas.com",
      name: "Admin",
      password: await hashPassword("admin"),
      role: {
        connect: {
          id: roleAdmin.id,
        },
      },
    },
  });

  console.log({ userAdmin });
}

export async function createNormalRoleAndUser() {
  const roleUser = await prisma.role.upsert({
    where: { id: USER_ROLE_ID },
    update: {},
    create: {
      id: USER_ROLE_ID,
      name: "USER",
    },
  });

  console.log({ roleUser });

  const userNormal = await prisma.user.upsert({
    where: { email: "user@open-saas.com" },
    update: {},
    create: {
      email: "user@open-saas.com",
      name: "Jimmy Doe",
      password: await hashPassword("user"),
      role: {
        connect: {
          id: roleUser.id,
        },
      },
    },
  });

  console.log({ userNormal });
}

async function main() {
  await createAdminRoleAndUser();
  await createNormalRoleAndUser();
}

if (require.main === module) {
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
