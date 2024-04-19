import React, { FunctionComponent, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/libs/utils";

// Define allowed component types as a union of string literals
type AllowedComponents =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "code"
  | "div"
  | "small"
  | "span";

interface ITypographyProps {
  component?: AllowedComponents; // Use AllowedComponents type here
  children: ReactNode;
  className?: string;
}

type Props = ITypographyProps & HTMLAttributes<HTMLElement>;

const Typography: FunctionComponent<Props> = ({
  children,
  className = "",
  component: Component = "p",
  ...rest
}) => {
  const selectClassNames = (component: AllowedComponents) => {
    switch (component) {
      case "h1":
        return "scroll-m-20 text-4xl font-extrabold tracking-tight";
      case "h2":
        return "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0";
      case "h3":
        return "scroll-m-20 text-2xl font-semibold tracking-tight";
      case "h4":
        return "scroll-m-20 text-xl font-semibold tracking-tight";
      case "p":
        return "leading-7 [&:not(:first-child)]:mt-6";
      case "blockquote":
        return "mt-6 border-l-2 pl-6 italic";
      case "code":
        return "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold";
      case "div":
        return "text-lg font-semibold";
      case "small":
        return "text-sm font-medium leading-none";
      case "span":
        return "text-sm text-muted-foreground";
      default:
        return "";
    }
  };

  // Combine the selected class names with any custom class names provided via props
  const typographyClassName = `${selectClassNames(
    Component,
  )} ${className}`.trim();

  return (
    <Component className={cn(typographyClassName)} {...rest}>
      {children}
    </Component>
  );
};

export { Typography };
