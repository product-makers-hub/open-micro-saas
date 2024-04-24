import { adminNavLinks } from "@/config/navigation-links-config";
import { NavLink } from "@/components/ui/nav-link";

export const AdminSidenav = () => {
  return (
    <aside
      className="hidden max-h-full lg:block w-56 flex-shrink-0 border-r-2 px-4"
      aria-label="Admin sidenav"
    >
      <ul>
        {adminNavLinks.map((link) => (
          <li key={link.url} className="mt-4 flex gap-2">
            <NavLink
              className="w-full hover:bg-primary-foreground p-2 rounded transition-colors"
              href={link.url}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
