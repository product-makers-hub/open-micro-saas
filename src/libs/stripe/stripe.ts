import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  // More about api version: https://stripe.com/docs/api/versioning
  apiVersion: "2023-10-16",
  typescript: true,
  // appInfo: {
  //   name: "nextjs-with-stripe-typescript-demo",
  //   url: "https://nextjs-with-stripe-typescript-demo.vercel.app",
  // },
});
