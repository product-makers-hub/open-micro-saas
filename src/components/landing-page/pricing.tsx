"use client";

import { paymentsConfig } from "@/config";

import { createCheckoutSession } from "@/app/pricing/actions";
import { formatAmountForDisplay } from "@/libs/stripe/stripe-helpers";

export const Pricing = () => {
  const handleCheckout = async ({
    priceId,
    planName,
    amount,
  }: {
    priceId: string;
    planName: string;
    amount: number;
  }) => {
    const formData = new FormData();
    formData.append("priceId", priceId);
    formData.append("uiMode", "hosted");
    formData.append("planName", planName);
    formData.append("amount", amount.toString());

    const { url } = await createCheckoutSession(formData);

    window.location.assign(url as string);
  };

  return (
    <>
      <h1 className="text-4xl text-center">{paymentsConfig.title}</h1>
      <p className="text-lg text-center py-4">{paymentsConfig.description}</p>
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex justify-center py-4">
          <div className="form-control w-64 flex justify-between">
            <label className="cursor-pointer label">
              <span className="label-text">Month</span>
              <input type="checkbox" className="toggle toggle-primary" />

              <span className="label-text">Anual (save %)</span>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          {paymentsConfig.pricingPlans.map((plan) => (
            <div key={plan.id} className="w-full md:w-1/3 px-4 mb-6">
              <div className="card bordered shadow-2xl">
                <div className="card-body">
                  <h2 className="text-center text-4xl text-primary">
                    {plan.name}
                  </h2>
                  <p className="text-xl">
                    {formatAmountForDisplay(
                      plan.price,
                      paymentsConfig.defaultCurrency,
                    )}
                  </p>
                  <ul className="menu py-4">
                    {plan.features.map((feature, index) => (
                      <li className="" key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      handleCheckout({
                        planName: plan.name,
                        priceId: plan.priceId,
                        amount: plan.price,
                      })
                    }
                    className="btn btn-primary"
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};