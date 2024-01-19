import { getUsersAction } from "@/app/admin/dashboard/user-management/actions";

import { ToggleUserStatus } from "./toggle-user-status";

const tableHeaders = [
  "Access",
  "Status",
  "Email",
  "Name",
  "Role",
  "Created at (YYYY-MM-DD)",
];

export const UsersTable = async () => {
  const users = await getUsersAction();

  return (
    <div className="overflow-x-auto">
      <table aria-label="users list" className="table table-md">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.email} className="hover">
              <td>
                <ToggleUserStatus
                  isActive={user.isActive}
                  email={user.email as string}
                />
              </td>
              <td>{user.isActive ? "Active" : "Inactive"}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role.name}</td>
              <td>
                {user.createdAt.toLocaleString("eu", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
