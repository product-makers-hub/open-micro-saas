import prisma from "@/libs/prisma";

import { FeatureFlags } from "@prisma/client";

export const getFeatureFlags = async (): Promise<FeatureFlags[]> => {
  return prisma.featureFlags.findMany();
};

export const createFeatureFlag = async (name: string, isEnabled?: boolean) => {
  return prisma.featureFlags.create({
    data: {
      name,
      isEnabled: isEnabled || true,
    },
  });
};

// export const getFeatureFlag = async (name: string) => {
//   return prisma.featureFlags.findUnique({
//     where: { name, id: undefined },
//   });
// };
