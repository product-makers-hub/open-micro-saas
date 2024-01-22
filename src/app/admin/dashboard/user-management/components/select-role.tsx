import { ADMIN_ROLE_NAME, USER_ROLE_NAME } from "@/consts/roles-consts";

interface SelectRoleProps {
  userRoleName: string;
}

export const SelectRole = ({ userRoleName }: SelectRoleProps) => {
  return (
    <select
      className="select select-bordered w-full max-w-xs"
      defaultValue={userRoleName}
    >
      <option value={ADMIN_ROLE_NAME}>{ADMIN_ROLE_NAME}</option>
      <option value={USER_ROLE_NAME}>{USER_ROLE_NAME}</option>
    </select>
  );
};
