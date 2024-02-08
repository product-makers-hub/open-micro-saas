import type { Metadata } from "next";

import { Pricing } from "../_components/pricing";

import { paymentsConfig } from "@/config/payments-config";

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
