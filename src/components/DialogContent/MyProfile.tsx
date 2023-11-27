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

const MyProfile = () => {
  return (
    <>
      <DialogHeader className="pt-6">
        <DialogTitle className="text-3xl font-bold mb-6">Konto</DialogTitle>
      </DialogHeader>
      <ChangeUserDataForm />
    </>
  );
};

export default MyProfile;
