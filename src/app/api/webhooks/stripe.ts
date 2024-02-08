import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";

import { stripe } from "@/libs/stripe/stripe";
import {
  activeUserByStripeCustomerId,
  desactiveUserByStripeCustomerId,
} from "@/repositories/user-repository";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string;

export const config = {
  api: {
    // don't parse body of incoming requests because we need it raw to verify signature
    bodyParser: false,
  },
};

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const requestBuffer = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;
    let event;

    try {
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret,
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook signature verification failed.`);
    }

    // Handle the event
    switch (event.type) {
      // Handle successful subscription creation
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;

        await activeUserByStripeCustomerId(subscription.customer.toString());
        break;
      }
      case "customer.subscription.deleted":
        const subscription = event.data.object as Stripe.Subscription;

        await desactiveUserByStripeCustomerId(subscription.customer.toString());
        break;

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } catch (err) {
    // Return a 500 error
    console.log(err);
    res.status(500).end();
  }
}
