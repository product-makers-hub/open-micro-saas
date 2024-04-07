import { PrismaClient } from "@prisma/client";

import { UserRole } from "@prisma/client";
import { createOrUpdateUser } from "@/repositories/user-repository";
import { createFeatureFlag } from "@/repositories/feature-flags";
import { inactiveUser as inactiveUserData } from "../../tests/data/inactive-user";
import { adminUser as adminUserData } from "../../tests/data/admin-user";
import { normalUser as normalUserData } from "../../tests/data/normal-user";
import { featureFlags } from "../../tests/data/feature-flags";

const prisma = new PrismaClient();

export async function createAdminUser() {
  const userAdmin = await createOrUpdateUser({
    email: adminUserData.email,
    name: adminUserData.name,
    role: UserRole.ADMIN,
  });

  console.log({ userAdmin });
}

export async function createActiveUser() {
  const activeUser = await createOrUpdateUser({
    email: normalUserData.email,
    name: normalUserData.name,
    isActive: true,
    role: UserRole.USER,
  });

  console.log({ activeUser });
}

export async function createInactiveUser() {
  const inactiveUser = await createOrUpdateUser({
    email: inactiveUserData.email,
    name: inactiveUserData.name,
    isActive: false,
    role: UserRole.USER,
  });

  console.log({ inactiveUser });
}

export async function createFeatureFlags() {
  featureFlags.forEach(async (featureFlag) => {
    const featureFlagCreated = await createFeatureFlag(
      featureFlag.name,
      featureFlag.isEnabled,
    );

    console.log({ featureFlagCreated });
  });
}

async function main() {
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
