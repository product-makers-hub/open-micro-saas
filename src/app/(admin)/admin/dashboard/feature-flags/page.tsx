import { Typography } from "@/components/ui/typography";

import { FeatureFlagsTable } from "./_components/feature-flags-table";

export default function AdminDashboardFeatureFlagsPage() {
  return (
    <>
      <Typography component="h2">Feature Flags</Typography>
      <Typography component="p">
        Manage feature flags for your application.
      </Typography>

      <section className="py-8">
        <FeatureFlagsTable />
      </section>
    </>
  );
}
