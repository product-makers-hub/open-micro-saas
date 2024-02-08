export const paymentsConfig = {
  title: "Choose the plan that suits you best",
  description: "Start with a 14-day free trial. No credit card needed.",
  defaultCurrency: "USD",
  pricingPlans: [
    {
      id: 1,
      name: "Basic",
      price: 9.99,
      priceId: "your_price_id",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      cta: "Start Basic",
    },
    {
      id: 2,
      name: "Pro",
      price: 29.99,
      priceId: "your_price_id",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
      cta: "Start Pro",
    },
    {
      id: 3,
      name: "Teams",
      price: 59.99,
      priceId: "your_price_id",
      features: ["All Pro features", "Additional Feature 6", "24/7 Support"],
      cta: "Start Teams",
    },
  ],
};
