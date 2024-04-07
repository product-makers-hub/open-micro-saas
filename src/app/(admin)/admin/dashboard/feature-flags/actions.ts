"use server";

import { revalidatePath } from "next/cache";

import {
  getFeatureFlags,
  createFeatureFlag,
  getFeatureFlagByName,
  updateFeatureFlag,
  deleteFeatureFlag,
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

interface ToggleFeatureFlagResult {
  success: boolean;
  errorMessage?: {
    isEnabled?: string[] | undefined;
  };
}

export const toggleFeatureFlagAction = async (
  name: string,
  isEnabled: boolean,
): Promise<ToggleFeatureFlagResult> => {
  try {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
      return { success: false };
    }

    if (!name) {
      return {
        success: false,
        errorMessage: { isEnabled: ["Name is required"] },
      };
    }

    const featureFlag = await getFeatureFlagByName(name);

    if (!featureFlag) {
      return {
        success: false,
        errorMessage: { isEnabled: ["Feature flag not found"] },
      };
    }

    await updateFeatureFlag(featureFlag.id, !isEnabled);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorMessage: { isEnabled: ["Could not update feature flag"] },
    };
  }
};

export const deleteFeatureFlagAction = async (name: string) => {
  try {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
      return { success: false };
    }

    await deleteFeatureFlag(name);
    revalidatePath("/admin/dashboard/feature-flags");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
