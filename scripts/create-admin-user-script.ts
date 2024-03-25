import { UserRole } from "@prisma/client";

import { createOrUpdateUser } from "@/repositories/user-repository";

const adminEmail = process.env.ADMIN_EMAIL;

async function makeAdminUser() {
  if (!adminEmail) {
    throw new Error(
      "Please provide an admin email. You can do this in the make-admin-user-script.ts file.",
    );
  }

  const userAdmin = await createOrUpdateUser({
    email: adminEmail,
    name: "admin",
    role: UserRole.ADMIN,
  });

  console.log({ userAdmin });
}

makeAdminUser();
