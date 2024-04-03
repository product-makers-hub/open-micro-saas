import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table aria-label="users list" className="table table-md">
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow
              key={user.email}
              className="hover"
              aria-label={user.email as string}
            >
              <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell aria-label={user.role}>
                <SelectRole
                  userRoleName={user.role}
                  email={user.email as string}
                />
              </TableCell>
              <TableCell align="center">
                {user.createdAt.toLocaleString("eu", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
