import { GoogleAnalytics as GA } from "@next/third-parties/google";

import { appAnalyticsConfig } from "@/config/app-analytics-config";

export default function GoogleAnalytics() {
  return <GA gaId={appAnalyticsConfig.googleAnalyticsId} />;
}
