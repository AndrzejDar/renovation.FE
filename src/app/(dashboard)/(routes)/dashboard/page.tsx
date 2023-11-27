"use client";
import { parseObjectToUrlQuery } from "@/assets/helpers";
import IsLoadingOverlay from "@/components/IsLoadingOverlay";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectTile from "@/components/ProjectTile";
import {
  ProjectFilterPayload,
  defaultProjectFilterPayloadVaules,
} from "@/lib/types";
import DataService from "@/services/dataService";
import { useStoreState } from "@/store/hooks";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

const Dashboard = () => {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<ProjectFilterPayload>(
    defaultProjectFilterPayloadVaules
  );

  const searchShow = useStoreState((store) => store.app.searchShow);

  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    "projects",
    DataService.projects.getProjects(
      searchShow ? parseObjectToUrlQuery(filter) : undefined
    )
  );

  useEffect(() => {
    if (searchShow === false && filter != defaultProjectFilterPayloadVaules) {
      setFilter(defaultProjectFilterPayloadVaules);
      console.log("searchShow", searchShow);
      // refetch();
    }
  }, [searchShow, refetch, filter]);

  if (error)
    return (
      <>
        <ProjectFilter
          filter={filter}
          setFilter={setFilter}
          queryClient={queryClient}
          refetch={refetch}
          isRefetching={isRefetching}
          className=""
        />
        <div>error</div>;
      </>
    );

  // if (isLoading) return <IsLoadingOverlay />;

  return (
    <>
      <ProjectFilter
        filter={filter}
        setFilter={setFilter}
        queryClient={queryClient}
        refetch={refetch}
        isRefetching={isRefetching}
        className=""
      />
      <div className="w-full h-100 relative flex flex-grow">
        {isRefetching && <IsLoadingOverlay screen={false} />}
        <div className=" flex flex-row gap-x-4 gap-y-4 px-6 py-6 flex-wrap justify-start flex-grow">
          {data?.length && data?.length > 0 ? (
            data?.map((el, id: number) => {
              return <ProjectTile data={el} key={id} />;
            })
          ) : (
            <div className="w-full h-auto flex-grow">Brak Projektów</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
