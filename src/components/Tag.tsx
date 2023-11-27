import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/app/lib/utils";

const Tag = ({
  label,
  active,
  setTag,
}: {
  label: string;
  active: boolean;
  setTag: (tag: string) => void;
}) => {
  return (
    <Button
      variant="outline"
      size="tag"
      type="button"
      className={cn(
        "",
        active
          ? "bg-secondary hover:bg-secondary/80 text-white hover:text-white"
          : ""
      )}
      onClick={(e) => {
        e.preventDefault();
        setTag(label);
      }}
    >
      {label}
    </Button>
  );
};

export default Tag;
