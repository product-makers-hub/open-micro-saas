"use server";

import { revalidatePath } from "next/cache";

import {
  getFeatureFlags,
  createFeatureFlag,
} from "@/repositories/feature-flags";
import { getIsAdmin } from "@/libs/auth/auth-utils";
import { featureFlagSchema } from "./schemas";

export const getFeatureFlagsAction = async () => {
  const featureFlags = await getFeatureFlags();
  return featureFlags;
};

interface CreateFeatureFlagResult {
  success: boolean;
  errorMessage?: {
    name?: string[] | undefined;
    isEnabled?: string[] | undefined;
  };
}

export const createFeatureFlagAction = async (
  name: string,
  isEnabled?: boolean,
): Promise<CreateFeatureFlagResult> => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    return { success: false };
  }

  const validatedFields = featureFlagSchema.safeParse({
    name,
    isEnabled,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errorMessage: validatedFields.error.flatten().fieldErrors,
    };
  }

  await createFeatureFlag(name, isEnabled);
  revalidatePath("/admin/dashboard/feature-flags");
  return { success: true };
};
