import type { Metadata } from "next";

import { Pricing } from "@/components/landing-page/pricing";

import { paymentsConfig } from "@/config";

export const metadata: Metadata = {
  title: paymentsConfig.title,
  description: paymentsConfig.description,
};

export default function PricingPage() {
  return (
    <main className="py-24">
      <Pricing />
    </main>
  );
}
