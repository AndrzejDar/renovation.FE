import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ChangeUserDataForm from "./user-data-form";
import NewProjectDataForm from "./new-project-data-form";

const NewProjectDialog = () => {
  return (
    <>
      <DialogHeader className="pt-6">
        <DialogTitle className="text-3xl font-bold mb-6">
          Nowy Projekt
        </DialogTitle>
      </DialogHeader>
      <NewProjectDataForm />
    </>
  );
};

export default NewProjectDialog;
