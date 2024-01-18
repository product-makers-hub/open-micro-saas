import Link from "next/link";

export const Drawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <main className="drawer-content">
        {/* Page content here */}
        <div className="flex-none lg:hidden">
          <label
            htmlFor="drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-primary fixed right-4 bottom-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>

        <div className="py-4 px-4">{children}</div>
      </main>
      <nav aria-label="drawer" className="drawer-side">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
          <li>
            <Link href="/admin/dashboard">Main</Link>
          </li>
          <li>
            <Link href="/admin/dashboard/user-management">User management</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
