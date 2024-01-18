"use client";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  createdAt: Date;
  isActive: boolean;
  role: {
    name: string;
  };
}

const tableHeaders = [
  "Access",
  "Status",
  "Email",
  "Name",
  "Role",
  "Created at (YYYY-MM-DD)",
];

async function getUsers(): Promise<User[] | null> {
  try {
    const response = await fetch("/api/users");

    if (response.status !== 200) throw new Error("Error fetching users");

    const { users } = await response.json();

    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const UsersTable = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  if (!users) {
    return <div>There was an error fetching users</div>;
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
            <tr key={user.email} className="hover">
              <td>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      aria-label="disactive user access"
                      defaultChecked={user.isActive}
                    />
                  </label>
                </div>
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
