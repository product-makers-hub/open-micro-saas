import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "@/components/ui/button";

type Link = {
  title: string;
  url: string;
};

interface MobileNavProps {
  links: Link[];
}

export const MobileNav = ({ links }: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden" variant="outline">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Open Micro Saas</SheetTitle>
          <Separator />
        </SheetHeader>
        <div className="text-sm dark:text-muted-foreground">
          {links.map((link) => (
            <Link className="block p-4" key={link.title} href={link.url}>
              {link.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
