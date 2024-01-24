"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";

import { paymentsConfig } from "@/config";
import { formatAmountForStripe } from "@/libs/stripe/stripe-helpers";
import { stripe } from "@/libs/stripe/stripe";

interface ReturnData {
  client_secret: string | null;
  url: string | null;
}

export async function createCheckoutSession(
  data: FormData,
): Promise<ReturnData> {
  const ui_mode = data.get(
    "uiMode",
  ) as Stripe.Checkout.SessionCreateParams.UiMode;

  const origin: string = headers().get("origin") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: paymentsConfig.defaultCurrency,
            product_data: {
              name: data.get("planName") as string,
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("amount") as string),
              paymentsConfig.defaultCurrency,
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/dashboard/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/dashboard`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/donate-with-embedded-checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("amount") as string),
        paymentsConfig.defaultCurrency,
      ),
      automatic_payment_methods: { enabled: true },
      currency: paymentsConfig.defaultCurrency,
    });

  return { client_secret: paymentIntent.client_secret as string };
}
