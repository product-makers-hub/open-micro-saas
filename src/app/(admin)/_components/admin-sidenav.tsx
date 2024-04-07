import { adminNavLinks } from "@/config/navigation-links-config";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

export const AdminSidenav = () => {
  return (
    <aside
      className="hidden max-h-full lg:block w-56 flex-shrink-0 border-r-2"
      role="navigation"
      aria-label="Admin sidenav"
    >
      <ul className="">
        {adminNavLinks.map((link) => (
          <Button asChild key={link.url} variant="link">
            <Link className="mt-4" href={link.url}>
              {link.title}
            </Link>
          </Button>
        ))}
      </ul>
    </aside>
  );
};
