import { authConfig } from "@/config/auth-config";

export const inactiveUser = {
  email: "inactive-user@my-saas.com",
  name: "Joe Doe",
  appUrl: authConfig.normalUserCallbackUrl,
  loginUrl: authConfig.loginUrl,
  storageSessionPath: "./tests/data/innactive-user.session.json",
};
