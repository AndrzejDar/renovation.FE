import React from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useStoreActions, useStoreState } from "@/store/hooks";
import MyProfile from "./MyProfile";
import DecorativeLink from "../DecorativeLink";
import { Button } from "../ui/button";
import { useMutation } from "react-query";
import AuthService from "@/services/authService";
import { useRouter } from "next/navigation";
import RemoveAccountConfirmation from "./RemoveAccountConfirmation";
import { cn } from "@/app/lib/utils";

interface ConfirmOperationProps {
  action: () => void;
  cancelAction: () => void;
  label: string;
  confirmLabel: string;
  bgColor?: string;
}

const ConfirmOperation = ({
  action,
  cancelAction,
  label,
  confirmLabel,
  bgColor,
}: ConfirmOperationProps): React.ReactNode => {
  // const setDialogContent = useStoreActions(
  //   (store) => store.app.setDialogContent
  // );

  return (
    <>
      <DialogHeader className="pt-10">
        <DialogTitle className="text-2xl font-bold mb-6">{label}</DialogTitle>
      </DialogHeader>
      {/* <p>Czy napewno chcesz usunąć konto?</p> */}
      <div className="w-full flex-row flex justify-end mt-9 gap-10 items-center">
        <div onClick={cancelAction}>
          <DecorativeLink href="">Anuluj</DecorativeLink>
        </div>
        <Button
          size="lg"
          onClick={action}
          className={cn("bg-primary justify-end", bgColor)}
        >
          {confirmLabel}
        </Button>
      </div>
    </>
  );
};

export default ConfirmOperation;
