import { useStoreState } from "@/store/hooks";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/app/lib/utils";
import { UsersFilter as IUsersFilter, UsersFilter } from "@/lib/types";
import UsersFilterForm from "./users-filter-form";
import { QueryClient } from "react-query";

interface UserFilterProps {
  filter: UsersFilter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<IUsersFilter | undefined>>;
  queryClient: QueryClient;
  isRefetching: boolean;
  refetch: () => void;
  className?: string;
}

const UsersFilter = ({
  filter,
  setFilter,
  queryClient,
  isRefetching,
  refetch,
  className,
}: UserFilterProps) => {
  const [prevVals, setPrevVals] = useState<IUsersFilter | undefined>({
    email: "",
  });
  const [currVals, setCurrVals] = useState<IUsersFilter | undefined>({
    email: "",
  });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    // console.log(currVals, prevVals, currVals == prevVals);
    if (JSON.stringify(currVals) !== JSON.stringify(prevVals)) {
      setPrevVals({ ...currVals });
      setFilter(currVals);
    }
  }, [currVals, prevVals, setFilter]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRefetching === true) {
      queryClient.cancelQueries({ queryKey: "users" });
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (isMounted === true) {
        if (filter?.email !== "") {
          // console.log("trigered refetching");
          refetch();
        }
      }
    }, 500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [filter]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "overflow-hidden transition-all px-6 mb-6 max-h-[400px]",
        className
      )}
    >
      <UsersFilterForm setCurrVals={setCurrVals} className="mt-1" />
    </div>
  );
};

export default UsersFilter;
