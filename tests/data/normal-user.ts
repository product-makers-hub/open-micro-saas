import { authConfig } from "@/config";

export const normalUser = {
  email: "user@open-saas.com",
  name: "Jimmy Doe",
  plainPassword: "user",
  appUrl: authConfig.normalUserCallbackUrl,
  loginUrl: authConfig.loginUrl,
  storageSessionPath: "./tests/data/normal-user.session.json",
};
