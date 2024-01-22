export const ADMIN_ROLE_ID = 1;
export const USER_ROLE_ID = 2;
export const ADMIN_ROLE_NAME = "ADMIN";
export const USER_ROLE_NAME = "USER";

// Add more roles as needed
export type UserRole = typeof ADMIN_ROLE_NAME | typeof USER_ROLE_NAME;
