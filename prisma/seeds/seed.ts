import prisma from "../../src/libs/prisma";
import {
  ADMIN_ROLE_ID,
  USER_ROLE_ID,
  ADMIN_ROLE_NAME,
  USER_ROLE_NAME,
} from "../../src/consts/roles-consts";
import { hashPassword } from "../../src/libs/password-lib";
import { createOrUpdateUser } from "../../src/repositories/user-repository";
import { createOrUpdateRole } from "@/repositories/role-repository";

export async function createAdminRoleAndUser() {
  const roleAdmin = await createOrUpdateRole({
    id: ADMIN_ROLE_ID,
    name: ADMIN_ROLE_NAME,
  });

  console.log({ roleAdmin });

  const userAdmin = await createOrUpdateUser({
    email: "admin@open-saas.com",
    name: "Admin",
    password: await hashPassword("admin"),
    role: {
      id: roleAdmin.id,
    },
  });

  console.log({ userAdmin: { ...userAdmin, password: undefined } });
}

export async function createNormalRoleAndUser() {
  const roleUser = await createOrUpdateRole({
    id: USER_ROLE_ID,
    name: USER_ROLE_NAME,
  });

  console.log({ roleUser });

  const userNormal = await createOrUpdateUser({
    email: "user@open-saas.com",
    name: "Jimmy Doe",
    password: await hashPassword("user"),
    role: {
      id: roleUser.id,
    },
  });

  console.log({ userNormal: { ...userNormal, password: undefined } });
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
