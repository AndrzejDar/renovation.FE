import { cn } from "@/app/lib/utils";
import React from "react";

interface InfoRecordProps {
  data: Record<string, any>;
  field: string;
  label: string;
  className?: string;
  dataClassName?: string;
  labelClassName?: string;
}

const InfoRecord: React.FC<InfoRecordProps> = ({
  data,
  field,
  label,
  className,
  dataClassName,
  labelClassName,
}) => {
  const getData = (): string => {
    if (Array.isArray(data[field])) return data[field].join(", ");
    return data[field];
  };

  return (
    <div className={cn("w-full mb-3 flex flex-row", className)}>
      <div className={cn("w-[180px]", labelClassName)}>{label}</div>
      <div className={cn("w-[180px]", dataClassName)}>{getData()}</div>
    </div>
  );
};

export default InfoRecord;
