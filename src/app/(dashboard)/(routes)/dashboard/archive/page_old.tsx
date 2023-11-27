// "use client";
// import IsLoadingOverlay from "@/components/IsLoadingOverlay";
// import ProjectTile from "@/components/ProjectTile";
// import { projectTile } from "@/lib/types";
// import DataService from "@/services/dataService";
// import React, { useEffect } from "react";
// import { useQuery } from "react-query";

// const Dashboard = () => {
//   const { data, error, isLoading, refetch, isRefetching, isFetching } =
//     useQuery("projects_archived", DataService.projects.getProjectsArchived());

//   if (error)
//     return (
//       <>
//         <h2 className="text-xl font-bold mb-4">Archiwum projektów</h2>
//         <div>Brak danych</div>
//       </>
//     );

//   if (isLoading) return <IsLoadingOverlay />;

//   return (
//     <>
//       <h2 className="text-xl font-bold">Archiwum projektów</h2>
//       <div className="flex flex-row gap-4 w-full h-full p-10 flex-wrap">
//         {data?.map((el, id: number) => {
//           return <ProjectTile data={el} key={id} />;
//         })}
//       </div>
//     </>
//   );
// };

// export default Dashboard;
