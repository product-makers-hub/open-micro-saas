"use client";

import dynamic from "next/dynamic";

import { appAnalyticsConfig } from "@/config/app-analytics-config";

const isProd = process.env.NODE_ENV === "production";

const GoogleAnalytics = dynamic(() => import("./google-analytics"), {
  ssr: false,
});

export const Analytics = () => {
  if (!isProd) {
    return null;
  }

  if (isProd && appAnalyticsConfig.googleAnalyticsId) {
    return <GoogleAnalytics />;
  }

  return null;
};
