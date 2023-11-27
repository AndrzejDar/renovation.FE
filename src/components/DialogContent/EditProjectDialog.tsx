import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import NewProjectDataForm from "./new-project-data-form";
import { ProjectData } from "@/lib/validations/project.schema";

const EditProjectDialog = ({ data }: { data: ProjectData }) => {
  return (
    <>
      <DialogHeader className="pt-6">
        <DialogTitle className="text-3xl font-bold mb-6">
          Edytuj Projekt
        </DialogTitle>
      </DialogHeader>
      <NewProjectDataForm initData={data} />
    </>
  );
};

export default EditProjectDialog;
