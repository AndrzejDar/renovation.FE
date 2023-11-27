import { useStoreState } from "@/store/hooks";
import React, { useEffect, useRef, useState } from "react";
import ProjectFilterForm from "./project-filter-form";
import { cn } from "@/app/lib/utils";
import {
  ProjectFilter,
  ProjectFilterPayload,
  defaultProjectFilterValues,
} from "@/lib/types";
import { format } from "date-fns";
import { QueryClient } from "react-query";

interface ProjectFilterProps {
  filter?: ProjectFilterPayload;
  setFilter?: React.Dispatch<React.SetStateAction<ProjectFilterPayload>>;
  queryClient: QueryClient;
  isRefetching: boolean;
  refetch: () => void;
  className: string;
}

const ProjectFilter = ({
  filter,
  setFilter,
  queryClient,
  isRefetching,
  refetch,
  className,
}: ProjectFilterProps) => {
  const [prevVals, setPrevVals] = useState<ProjectFilter>(
    defaultProjectFilterValues
  );
  const [currVals, setCurrVals] = useState<ProjectFilter>(
    defaultProjectFilterValues
  );

  useEffect(() => {
    if (JSON.stringify(currVals) !== JSON.stringify(prevVals)) {
      setPrevVals({ ...currVals });

      let parsedFilter: ProjectFilterPayload = {
        name: currVals.name,
        customer: currVals.customer,
        // ...currVals,
        tags: currVals.tags?.split(",").map((tag) => tag.trim()),
      };
      if (currVals.toDate && currVals.toDate != undefined) {
        parsedFilter.toDate = format(new Date(currVals.toDate), "yyyy-MM-dd");
      }

      if (currVals.fromDate && currVals.fromDate != undefined) {
        console.log(currVals.fromDate);
        parsedFilter.fromDate = format(
          new Date(currVals.fromDate),
          "yyyy-MM-dd"
        );
      }

      if (setFilter) setFilter(parsedFilter);
    }
  }, [currVals, prevVals, setFilter]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRefetching === true)
      queryClient.cancelQueries({ queryKey: "projects" });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      refetch();
    }, 500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [filter]);

  const searchShow = useStoreState((store) => store.app.searchShow);
  return (
    <div
      className={cn(
        "overflow-hidden transition-all px-6",
        searchShow ? "max-h-[400px] mb-6" : "max-h-[0px]",
        className
      )}
    >
      <ProjectFilterForm setCurrVals={setCurrVals} className="mt-1" />
    </div>
  );
};

export default ProjectFilter;
