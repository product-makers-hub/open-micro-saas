import { UsersTable } from "./components/users-table";
import { Typography } from "@/components/ui/typography";

export default function UserManagementPage() {
  return (
    <>
      <Typography component="h2">User management</Typography>

      <section className="py-8">
        <UsersTable />
      </section>
    </>
  );
}
