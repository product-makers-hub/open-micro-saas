import { Typography } from "@/components/ui/typography";

import { FeatureFlagsTable } from "./_components/feature-flags-table";
import { CreateFeatureFlagDialog } from "./_components/create-feature-flag-dialog";

export default function AdminDashboardFeatureFlagsPage() {
  return (
    <>
      <Typography component="h2">Feature Flags</Typography>
      <Typography component="p">
        Manage feature flags for your application.
      </Typography>

      <div className="flex justify-end py-4">
        <CreateFeatureFlagDialog />
      </div>

      <section className="py-8">
        <FeatureFlagsTable />
      </section>
    </>
  );
}
