import { authConfig } from "@/config";

export const inactiveUser = {
  email: "inactive-user@my-saas.com",
  name: "Joe Doe",
  appUrl: authConfig.normalUserCallbackUrl,
  loginUrl: authConfig.loginUrl,
};
