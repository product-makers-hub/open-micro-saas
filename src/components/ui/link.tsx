import NextLink from "next/link";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const Link = ({ href, ...rest }: LinkProps) => {
  const isInternalLink = href.startsWith("/");
  const isAnchorLink = href.startsWith("#");

  if (isInternalLink) {
    return <NextLink href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
};
