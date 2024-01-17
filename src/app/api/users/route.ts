import { getServerSession } from "next-auth";

import { authOptions } from "@/libs/auth/auth-options";
import { ADMIN_ROLE_NAME } from "@/consts/roles-consts";
import { getManyUsers } from "@/repositories/user-repository";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role.name !== ADMIN_ROLE_NAME) {
    return Response.error();
  }

  const users = await getManyUsers();

  return Response.json({ users });
}
