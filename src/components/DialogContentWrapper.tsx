// "use client";
import React from "react";
import { DialogContent } from "./ui/dialog";

import { useStoreState } from "@/store/hooks";

const DialogContentWrapper = () => {
  const dialogContent = useStoreState((store) => store.app.dialogContent);

  return (
    <>
      {dialogContent && (
        <DialogContent className="sm:max-w-[633px]">
          {dialogContent()}
        </DialogContent>
      )}
    </>
  );
};

export default DialogContentWrapper;
