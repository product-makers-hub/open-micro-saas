"use server";

import { getFeatureFlags } from "@/repositories/feature-flags";

export const getFeatureFlagsAction = async () => {
  const featureFlags = await getFeatureFlags();
  return featureFlags;
};
