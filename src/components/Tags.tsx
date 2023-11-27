import React from "react";
import { defaultTags } from "@/assets/data/tags";
import Tag from "./Tag";
import { UseFormSetValue } from "react-hook-form";
import { ProjectFilter } from "@/lib/types";
import { cn } from "@/app/lib/utils";

const Tags = ({
  setValue,
  selectedTags,
  className,
}: {
  setValue: UseFormSetValue<any>;
  selectedTags: string[];
  className?: string;
}) => {
  const setTag = (tag: string) => {
    if (selectedTags.join() !== "") {
      if (selectedTags.includes(tag)) {
        setValue("tags", selectedTags.filter((el) => el != tag).join(", "));
      } else {
        setValue("tags", [...selectedTags, tag].join(", "));
      }
    } else {
      setValue("tags", tag);
    }
  };

  return (
    <div className={cn("", className)}>
      {defaultTags.map((el, id) => {
        return (
          <Tag
            label={el.label}
            key={id}
            active={selectedTags.includes(el.label)}
            setTag={setTag}
          />
        );
      })}
    </div>
  );
};

export default Tags;
