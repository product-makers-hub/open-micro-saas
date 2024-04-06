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

export const getFeatureFlagByName = async (name: string) => {
  return prisma.featureFlags.findUnique({
    where: { name },
  });
};

export const updateFeatureFlag = async (id: string, isEnabled: boolean) => {
  return prisma.featureFlags.update({
    where: { id },
    data: { isEnabled },
  });
};
