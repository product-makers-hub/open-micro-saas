"use server";

import {
  toggleUserAccessByEmail,
  getManyUsers,
  updateUserRoleByEmail,
} from "@/repositories/user-repository";
import { UserRole } from "@/consts/roles-consts";

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

export const updateUserRoleAction = async (
  prevState: any,
  formData: FormData,
) => {
  const email = formData.get("email");
  const roleToUpdate = formData.get("roleToUpdate");

  if (!email || !roleToUpdate) {
    return {
      message: "User public id and role are required",
      error: true,
    };
  }

  try {
    await updateUserRoleByEmail(
      email.toString(),
      roleToUpdate.toString() as UserRole,
    );

    return {
      message: "User role was updated",
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
