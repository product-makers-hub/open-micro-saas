import { authConfig } from "@/config";

export const inactiveUser = {
  email: "inactive-user@my-saas.com",
  name: "Joe Doe",
  plainPassword: "123456",
  appUrl: authConfig.normalUserCallbackUrl,
  loginUrl: authConfig.loginUrl,
};
