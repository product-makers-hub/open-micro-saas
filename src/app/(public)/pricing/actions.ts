"use server";

import type { Stripe } from "stripe";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";

import { paymentsConfig } from "@/config/payments-config";
import { formatAmountForStripe } from "@/libs/stripe/stripe-helpers";
import { stripe } from "@/libs/stripe/stripe";
import { authOptions } from "@/libs/auth/auth-options";

interface ReturnData {
  client_secret: string | null;
  url: string | null;
}

export async function createCheckoutSession(
  data: FormData,
): Promise<ReturnData> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("No session found");
  }

  if (!session.user.stripeCustomerId) {
    throw new Error("No stripeCustomerId found");
  }

  const ui_mode = data.get(
    "uiMode",
  ) as Stripe.Checkout.SessionCreateParams.UiMode;

  const origin: string = headers().get("origin") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: session.user.stripeCustomerId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: paymentsConfig.defaultCurrency,
            product_data: {
              name: data.get("planName") as string,
            },
            recurring: {
              interval: "month",
            },
            unit_amount: formatAmountForStripe(
              Number(data.get("amount") as string),
              paymentsConfig.defaultCurrency,
            ),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/dashboard`,
      }),
      ...(ui_mode === "embedded" && {
        return_url: `${origin}/dashboard/result?session_id={CHECKOUT_SESSION_ID}`,
      }),
      ui_mode,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPortalSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("No session found");
  }

  if (!session.user.stripeCustomerId) {
    throw new Error("No stripeCustomerId found");
  }

  const portalSession: Stripe.BillingPortal.Session =
    await stripe.billingPortal.sessions.create({
      customer: session.user.stripeCustomerId,
      return_url: `${headers().get("origin")}/dashboard`,
    });

  return { url: portalSession.url };
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
