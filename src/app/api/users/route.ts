import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth";

import { authOptions } from "@/libs/auth/auth-options";
import { ADMIN_ROLE_NAME } from "@/consts/roles-consts";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role.name !== ADMIN_ROLE_NAME) {
    return Response.error();
  }

  const users = await prisma.user.findMany({
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
  });

  return Response.json({ users });
}
