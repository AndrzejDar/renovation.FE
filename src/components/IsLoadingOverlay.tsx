import Image from "next/image";
import React from "react";
import B from "@/assets/brand/B.svg";
import { cn } from "@/app/lib/utils";

const IsLoadingOverlay = ({ screen = true }) => {
  return (
    <div
      className={cn(
        "   z-50 flex flex-col mx-auto items-center justify-center",
        screen
          ? "w-screen h-screen fixed top-0 left-0"
          : "h-full w-full absolute"
      )}
    >
      <div className="w-[120px] h-[120px] bg-white rounded-full flex items-center justify-center drop-shadow-[0_0_20px_rgba(0,0,0,0.4)]">
        <B
          alt=""
          width={60}
          height={60}
          className="animate-spin w-[80px] h-[80px]"
          style={{ animationDuration: "3s" }}
        />
      </div>
    </div>
  );
};

export default IsLoadingOverlay;
