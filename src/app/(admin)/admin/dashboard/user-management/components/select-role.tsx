"use client";

import { ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { UserRole } from "@prisma/client";

import { updateUserRoleAction } from "../actions";

interface SelectRoleProps {
  userRoleName: UserRole;
  email: string;
}

const initialState = {
  message: "",
  error: false,
};

export const SelectRole = ({ userRoleName, email }: SelectRoleProps) => {
  const [state, action] = useFormState(updateUserRoleAction, initialState);

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newRoleName = event.target.value;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("roleToUpdate", newRoleName);

    action(formData);
  };

  useEffect(() => {
    if (state?.message) {
      toast[state.error ? "error" : "success"](state.message);
    }
  }, [state]);

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      defaultValue={userRoleName}
      onChange={handleChange}
    >
      <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
      <option value={UserRole.USER}>{UserRole.USER}</option>
    </select>
  );
};
