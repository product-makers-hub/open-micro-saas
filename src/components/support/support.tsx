import dynamic from "next/dynamic";

import { supportConfig } from "@/config/support-config";

const isProd = process.env.NODE_ENV === "production";

export const Support = () => {
  if (!isProd) {
    return null;
  }

  if (isProd && supportConfig.crispId) {
    const Crisp = dynamic(() => import("./crisp"), {
      ssr: false,
    });

    return <Crisp />;
  }

  return null;
};
