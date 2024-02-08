import { authConfig } from "@/config/auth-config";

export const adminUser = {
  email: "admin@my-saas.com",
  name: "Admin",
  appUrl: authConfig.adminUserCallbackUrl,
  loginUrl: authConfig.loginUrl,
  storageSessionPath: "./tests/data/admin-user.session.json",
};
