import React from "react";
import { landingPageContent } from "@/config/landing-page-config";
import { siteMetadata } from "@/config/site-metadata-config";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 dark:bg-inherit">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <Typography className="text-sm">
            © {new Date().getFullYear()} {siteMetadata.title} All rights
            reserved.
          </Typography>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          {landingPageContent.footer.links.map((link) => (
            <Link
              key={link.title}
              className="text-gray-400 hover:text-gray-100 transition-colors"
              href={link.url}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
