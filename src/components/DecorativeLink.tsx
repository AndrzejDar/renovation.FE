import { cn } from "@/app/lib/utils";
import Link from "next/link";
import React from "react";

interface DecorativeLinkProps {
  className?: string | undefined;
  href: string;
  children: React.ReactNode;
  accentColor?: string;
}

const DecorativeLink = ({
  className,
  href,
  children,
  accentColor,
}: DecorativeLinkProps) => {
  return (
    <Link
      href={href}
      className={cn("inline-block group text-sm font-medium", className)}
    >
      {children}
      <div
        className={cn(
          "bg-primary h-[2px] group-hover:bg-primary/75",
          accentColor
        )}
      >
        {" "}
      </div>
    </Link>
  );
};

export default DecorativeLink;
