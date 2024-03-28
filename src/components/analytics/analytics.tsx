"use client";

import dynamic from "next/dynamic";

import { appAnalyticsConfig } from "@/config/app-analytics-config";

const isProd = process.env.NODE_ENV === "production";

export const Analytics = () => {
  if (!isProd) {
    return null;
  }

  if (isProd && appAnalyticsConfig.googleAnalyticsId) {
    const GoogleAnalytics = dynamic(() => import("./google-analytics"), {
      ssr: false,
    });

    return <GoogleAnalytics />;
  }

  return null;
};
