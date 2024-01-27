import { authConfig } from "@/config";

export const normalUser = {
  email: "user@my-saas.com",
  name: "Jimmy Doe",
  appUrl: authConfig.normalUserCallbackUrl,
  loginUrl: authConfig.loginUrl,
  storageSessionPath: "./tests/data/normal-user.session.json",
};
