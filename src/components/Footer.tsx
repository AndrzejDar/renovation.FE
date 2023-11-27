import React from "react";

import Logo from "@/assets/brand/logo.svg";
import { cn } from "@/app/lib/utils";

const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row justify-between items-end relative bottom-0 p-5 pr-8 text-xs text-gray-400",
        className
      )}
    >
      <div>Copyright 2023 Buglo Sp. z.o.o. Developed by MuchMore Sp. z.o.o</div>

      <Logo style={{ maxWidth: "100%", maxHeight: "60px", height: "auto" }} />
    </div>
  );
};

export default Footer;
