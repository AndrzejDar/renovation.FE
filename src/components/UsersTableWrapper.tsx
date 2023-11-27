import React, { useEffect, useState } from "react";
import UsersFilter from "./UsersFilter";
import { useQuery, useQueryClient } from "react-query";
import { parseObjectToUrlQuery } from "@/assets/helpers";
import DataService from "@/services/dataService";
import IsLoadingOverlay from "./IsLoadingOverlay";
import UsersTable from "./UsersTable";
import { cn } from "@/app/lib/utils";
import { UsersFilter as IUsersFilter } from "@/lib/types";

const UsersTableWrapper = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<IUsersFilter | undefined>({ email: "" });

  const { data, error, isLoading, refetch, isRefetching, isFetching, status } =
    useQuery(
      "users",
      DataService.users.getUsers(parseObjectToUrlQuery(filter)),
      { enabled: !!filter?.email }
    );

  // useEffect(() => {
  //   console.log(status, " filter:", filter);
  // }, [filter, status]);

  if (error) return <>błąd</>;
  // if (isLoading) return <IsLoadingOverlay />;

  return (
    <div className={cn("", className)}>
      <UsersFilter
        filter={filter}
        setFilter={setFilter}
        queryClient={queryClient}
        isRefetching={isRefetching}
        refetch={refetch}
      />
      {/* {console.log(data)} */}
      {data && <UsersTable data={data} isRefetching={isRefetching} />}
    </div>
  );
};

export default UsersTableWrapper;
