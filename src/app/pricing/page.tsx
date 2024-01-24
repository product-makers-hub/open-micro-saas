import type { Metadata } from "next";

import { Pricing } from "@/components/landing-page/pricing";

import { pricePageContent } from "@/config";

export const metadata: Metadata = {
  title: pricePageContent.title,
  description: pricePageContent.description,
};

export default function PricingPage() {
  return (
    <main className="py-24">
      <Pricing />
    </main>
  );
}
