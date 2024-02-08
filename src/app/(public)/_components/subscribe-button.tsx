"use client";

import Link from "next/link";

import { authConfig } from "@/config/auth-config";
import { useAuth } from "@/hooks/use-auth";
import { createCheckoutSession } from "@/app/(public)/pricing/actions";

interface SubscribeButtonProps {
  priceId: string;
  planName: string;
  amount: number;
  children: React.ReactNode;
}

export const SubscribeButton = ({
  planName,
  priceId,
  amount,
  children,
}: SubscribeButtonProps) => {
  const { status } = useAuth();

  const handleCheckout = async () => {
    const formData = new FormData();
    formData.append("priceId", priceId);
    formData.append("uiMode", "hosted");
    formData.append("planName", planName);
    formData.append("amount", amount.toString());

    const { url } = await createCheckoutSession(formData);

    window.location.assign(url as string);
  };

  const isUnauthenticated = status === "unauthenticated";
  const isLoading = status === "loading";

  if (isLoading) {
    return <span className="loading loading-spinner loading-xs" />;
  }

  if (isUnauthenticated) {
    return (
      <Link className="btn btn-primary" href={authConfig.loginUrl}>
        Sign in to subscribe
      </Link>
    );
  }

  return (
    <button onClick={() => handleCheckout()} className="btn btn-primary">
      {children}
    </button>
  );
};
