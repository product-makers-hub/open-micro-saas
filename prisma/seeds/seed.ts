import { PrismaClient } from "@prisma/client";

import {
  ADMIN_ROLE_ID,
  USER_ROLE_ID,
  ADMIN_ROLE_NAME,
  USER_ROLE_NAME,
} from "@/consts/roles-consts";
import { createOrUpdateRole } from "@/repositories/role-repository";
import { createOrUpdateUser } from "@/repositories/user-repository";
import { inactiveUser as inactiveUserData } from "../../tests/data/inactive-user";
import { adminUser as adminUserData } from "../../tests/data/admin-user";
import { normalUser as normalUserData } from "../../tests/data/normal-user";

const prisma = new PrismaClient();

export async function createRoles() {
  const roleAdmin = await createOrUpdateRole({
    id: ADMIN_ROLE_ID,
    name: ADMIN_ROLE_NAME,
  });

  console.log({ roleAdmin });

  const roleUser = await createOrUpdateRole({
    id: USER_ROLE_ID,
    name: USER_ROLE_NAME,
  });

  console.log({ roleUser });
}

export async function createAdminUser() {
  const userAdmin = await createOrUpdateUser({
    email: adminUserData.email,
    name: adminUserData.name,
    role: {
      id: ADMIN_ROLE_ID,
    },
  });

  console.log({ userAdmin });
}

export async function createActiveUser() {
  const activeUser = await createOrUpdateUser({
    email: normalUserData.email,
    name: normalUserData.name,
    isActive: true,
    role: {
      id: USER_ROLE_ID,
    },
  });

  console.log({ activeUser });
}

export async function createInactiveUser() {
  const inactiveUser = await createOrUpdateUser({
    email: inactiveUserData.email,
    name: inactiveUserData.name,
    isActive: false,
    role: {
      id: USER_ROLE_ID,
    },
  });

  console.log({ inactiveUser });
}

async function main() {
  await createRoles();
  await createAdminUser();
  await createActiveUser();
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
