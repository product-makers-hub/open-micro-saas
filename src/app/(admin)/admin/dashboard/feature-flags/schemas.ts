import { z } from "zod";

function isValidFeatureFlagName(name: string) {
  const regex = /^[A-Z0-9_]+$/;
  return regex.test(name);
}

export const featureFlagSchema = z.object({
  name: z
    .string()
    .min(1)
    .transform((val) => val.toUpperCase())
    .superRefine((val, ctx) => {
      if (!isValidFeatureFlagName(val)) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Invalid feature flag name. Examples of valid names: MY_FEATURE_FLAG, MY_FEATURE_FLAG_2.",
        });
      }
    }),
  isEnabled: z.boolean(),
});
