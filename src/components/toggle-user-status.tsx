import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { toggleUserAccessAction } from "@/app/admin/dashboard/user-management/actions";

interface ToggleUserStatusProps {
  isActive: boolean;
  email: string;
}

const initialState = {
  message: "",
  error: false,
};

export const ToggleUserStatus = ({
  isActive,
  email,
}: ToggleUserStatusProps) => {
  const [state, action] = useFormState(toggleUserAccessAction, initialState);

  const handleToggleUserAccess = async () => {
    const formData = new FormData();
    formData.append("email", email);
    action(formData);
  };

  useEffect(() => {
    if (state?.message) {
      toast[state.error ? "error" : "success"](state.message);
    }
  }, [state]);

  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <input
          type="checkbox"
          className="toggle toggle-primary"
          aria-label="disactive user access"
          defaultChecked={isActive}
          onChange={() => handleToggleUserAccess()}
        />
      </label>
    </div>
  );
};
