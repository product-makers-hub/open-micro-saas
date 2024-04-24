import type { Metadata } from "next";

import { Pricing } from "../_components/pricing";

import { paymentsConfig } from "@/config/payments-config";
import { Typography } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: paymentsConfig.title,
  description: paymentsConfig.description,
};

export default function PricingPage() {
  return (
    <section className="py-16">
      <Typography component="h1" className="text-center">
        Pricing
      </Typography>
      <Pricing />
    </section>
  );
}
