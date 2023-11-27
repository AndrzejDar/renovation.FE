import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import ProjectDataList from "./project-data-list";
import { ProjectData } from "@/lib/validations/project.schema";

const ProjectDetails = ({ data }: { data: ProjectData }) => {
  return (
    <>
      <DialogHeader className="pt-6">
        <DialogTitle className="text-3xl font-bold mb-6">
          Szczegóły projektu
        </DialogTitle>
      </DialogHeader>
      <ProjectDataList data={data} />
    </>
  );
};

export default ProjectDetails;
