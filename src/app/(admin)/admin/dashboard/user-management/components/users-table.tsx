import { getUsersAction } from "../actions";

import { SelectRole } from "./select-role";

const tableHeaders = [
  "Status",
  "Email",
  "Name",
  "Role",
  "Created at (YYYY-MM-DD)",
];

export const UsersTable = async () => {
  const users = await getUsersAction();

  if (!users || !users.length) {
    return <p>No users found</p>;
  }

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
            <tr
              key={user.email}
              className="hover"
              aria-label={user.email as string}
            >
              <td>{user.isActive ? "Active" : "Inactive"}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td aria-label={user.role.name}>
                <SelectRole
                  userRoleName={user.role.name}
                  email={user.email as string}
                />
              </td>
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
