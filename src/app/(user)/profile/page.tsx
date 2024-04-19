import { getSession } from "@/libs/auth/auth-utils";
import { Typography } from "@/components/ui/typography";

export default async function ProfilePage() {
  const session = await getSession();

  return (
    <div className="mt-2">
      <Typography component="h1">User Profile</Typography>

      <section className="mt-2">
        <Typography component="h2">{session?.user.name}</Typography>
        <Typography>{session?.user.email}</Typography>
      </section>
    </div>
  );
}
