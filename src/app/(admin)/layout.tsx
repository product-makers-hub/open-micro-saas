import { AdminNavbar } from "./_components/admin-navbar";
import { AdminSidenav } from "./_components/admin-sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNavbar />
      <section className="lg:flex lg:h-[calc(100vh-80px)]">
        <AdminSidenav />
        <main className="flex-1 px-6 pt-4 overflow-auto">{children}</main>
      </section>
    </>
  );
}
