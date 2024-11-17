import Link from "next/link";
import React from "react";

type icon = {
  children: React.ReactNode;
  link: string;
  className?: string
};

export const ClickableIcon = ({children, link, className }: icon) => {
  return (
    <Link className={`h-fit w-fit cursor-pointer ${className}`} href={link}>
      {children}
    </Link>
  );
};
