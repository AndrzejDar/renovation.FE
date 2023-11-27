// "use client";
// import IsLoadingOverlay from "@/components/IsLoadingOverlay";
// import ProjectTile from "@/components/ProjectTile";
// import { projectTile } from "@/lib/types";
// import DataService from "@/services/dataService";
// import React, { useEffect } from "react";
// import { useQuery } from "react-query";

// const Dashboard = () => {
//   const { data, error, isLoading, refetch, isRefetching, isFetching } =
//     useQuery("projects", DataService.projects.getProjects());

//   useEffect(() => {
//     console.log("projects data changed", data);
//   }, [data]);

//   if (error) return <div>error</div>;

//   if (isLoading) return <IsLoadingOverlay />;

//   return (
//     <div className="flex flex-row gap-4 w-full h-full flex-wrap justify-start">
//       {data?.map((el, id: number) => {
//         return <ProjectTile data={el} key={id} />;
//       })}
//     </div>
//   );
// };

// export default Dashboard;
