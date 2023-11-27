import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import ChangeUserPasswordForm from "./user-password-form";

const ChangePassword = () => {
  return (
    <>
      <DialogHeader className="pt-6">
        <DialogTitle className="text-3xl font-bold mb-6">
          Zmień hasło
        </DialogTitle>
      </DialogHeader>
      <ChangeUserPasswordForm />
    </>
  );
};

export default ChangePassword;
