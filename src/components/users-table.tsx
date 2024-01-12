import prisma from "@/libs/prisma";

async function getUsers() {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      createdAt: true,
      role: true,
    },
  });

  return users;
}

export const UsersTable = async () => {
  const users = await getUsers();

  return (
    <div className="overflow-x-auto">
      <table aria-label="users list" className="table table-zebra">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Created at (YYYY-MM-DD)</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>
                {user.createdAt.toLocaleString("eu", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{user.role.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
