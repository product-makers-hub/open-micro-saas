import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";

import { providers } from "@/libs/auth/providers/auth-providers";
import prisma from "@/libs/prisma";
import {
  getUserByEmail,
  updateStripeCustomerIdByEmail,
} from "@/repositories/user-repository";
import { stripe } from "@/libs/stripe/stripe";
import { CustomPrismaAdapter } from "./custom-prisma-adapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: CustomPrismaAdapter(prisma) as Adapter,
  providers,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session }) {
      if (!session.user.email) {
        throw new Error("Missing email");
      }

      const userData = await getUserByEmail(session.user.email);

      if (session.user && userData) {
        session.user.role = userData.role;
        session.user.isActive = userData.isActive;
        session.user.stripeCustomerId = userData.stripeCustomerId;
      }

      return session;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      if (token.email) {
        const userData = await getUserByEmail(token.email);
        token.isActive = userData?.isActive;
        token.role = userData?.role;
      }

      return token;
    },
  },
  events: {
    createUser: async ({ user }) => {
      try {
        if (!user.email) {
          console.warn("events:createUser: No email found", {
            user: user.email,
          });
          return;
        }

        const customer = await stripe.customers.create({
          email: user.email!,
        });

        await updateStripeCustomerIdByEmail(user.email, customer.id);

        console.log("events:createUser - Stripe customer created", {
          user: user.email,
        });
      } catch (e) {
        console.error("events:createUser", e);
      }
    },
  },
  debug: false,
};
