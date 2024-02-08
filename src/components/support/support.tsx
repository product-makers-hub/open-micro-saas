import dynamic from "next/dynamic";

import { supportConfig } from "@/config/support-config";

const isProd = process.env.NODE_ENV === "production";

const Crisp = dynamic(() => import("./crisp"), {
  ssr: false,
});

export const Support = () => {
  if (!isProd) {
    return null;
  }

  if (isProd && supportConfig.crispId) {
    return <Crisp />;
  }

  return null;
};
