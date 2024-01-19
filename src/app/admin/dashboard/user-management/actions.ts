"use server";

import {
  toggleUserAccessByEmail,
  getManyUsers,
} from "@/repositories/user-repository";

export const getUsersAction = async () => {
  const users = await getManyUsers();
  return users;
};

export const toggleUserAccessAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const email = formData.get("email");

    if (!email) {
      return {
        message: "Email is required",
        error: true,
      };
    }

    await toggleUserAccessByEmail(email.toString());

    return {
      message: "User access was updated",
      error: false,
    };
  } catch (e) {
    console.error(e);

    return {
      message: "Something went wrong",
      error: true,
    };
  }
};
