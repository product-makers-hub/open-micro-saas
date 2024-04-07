import { UserNavbar } from "./_components/user-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserNavbar />
      <div className="px-6">
        <main className="">{children}</main>
      </div>
    </>
  );
}
