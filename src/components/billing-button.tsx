import toast from "react-hot-toast";

import { createPortalSession } from "@/app/(public)/pricing/actions";

export const BillingButton = () => {
  const openCustomerPortal = async () => {
    try {
      const data = await createPortalSession();
      window.location.assign(data.url as string);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return <button onClick={openCustomerPortal}>Billing</button>;
};
