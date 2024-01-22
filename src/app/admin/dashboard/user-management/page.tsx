import { UsersTable } from "./components/users-table";

export default function UserManagementPage() {
  return (
    <>
      <h1 className="text-xl font-extrabold leading-none tracking-tight md:text-xl lg:text-2xl">
        User management
      </h1>

      <section className="py-8">
        <UsersTable />
      </section>
    </>
  );
}
