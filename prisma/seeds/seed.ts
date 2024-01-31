import { PrismaClient } from "@prisma/client";

import {
  ADMIN_ROLE_ID,
  USER_ROLE_ID,
  ADMIN_ROLE_NAME,
  USER_ROLE_NAME,
} from "../../src/consts/roles-consts";
import { inactiveUser as inactiveUserData } from "../../tests/data/inactive-user";
import { adminUser as adminUserData } from "../../tests/data/admin-user";
import { normalUser as normalUserData } from "../../tests/data/normal-user";

const prisma = new PrismaClient();

export async function createAdminRoleAndUser() {
  const roleAdmin = await prisma.role.create({
    data: {
      id: ADMIN_ROLE_ID,
      name: ADMIN_ROLE_NAME,
    },
  });

  console.log({ roleAdmin });

  const userAdmin = await prisma.user.create({
    data: {
      email: adminUserData.email,
      name: adminUserData.name,
      role: {
        connect: {
          id: roleAdmin.id,
        },
      },
    },
  });

  console.log({ userAdmin });
}

export async function createNormalRoleAndUsers() {
  const roleUser = await prisma.role.create({
    data: {
      id: USER_ROLE_ID,
      name: USER_ROLE_NAME,
    },
  });

  console.log({ roleUser });

  const userNormal = await prisma.user.create({
    data: {
      email: normalUserData.email,
      name: normalUserData.name,
      isActive: true,
      role: {
        connect: {
          id: roleUser.id,
        },
      },
    },
  });

  console.log({ userNormal });
}

export async function createInactiveUser() {
  const roleUser = await prisma.role.upsert({
    where: { id: USER_ROLE_ID },
    update: {},
    create: {
      id: USER_ROLE_ID,
      name: USER_ROLE_NAME,
    },
  });

  console.log({ roleUser });

  const inactiveUser = await prisma.user.upsert({
    where: { email: inactiveUserData.email },
    update: {},
    create: {
      email: inactiveUserData.email,
      name: inactiveUserData.name,
      isActive: false,
      role: {
        connect: {
          id: USER_ROLE_ID,
        },
      },
    },
  });

  console.log({ inactiveUser });
}

async function main() {
  await createAdminRoleAndUser();
  await createNormalRoleAndUsers();
  await createInactiveUser();
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
