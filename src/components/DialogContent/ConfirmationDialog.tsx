import { useStoreActions } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import SuccesIcon from "@/assets/icons/succes.svg";
import { cn } from "@/app/lib/utils";

const ConfirmationDialog = ({
  text,
  redirect,
  autoclose = true,
  onClose,
  className,
}: {
  text: string;
  redirect?: React.ReactNode | string;
  autoclose?: boolean;
  onClose?: () => void;
  className?: string;
}) => {
  const setDialogContent = useStoreActions(
    (store) => store.app.setDialogContent
  );

  const { push } = useRouter();
  const toggleDialogOpen = useStoreActions(
    (store) => store.app.toggleDialogOpen
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoclose === true) {
      timeoutRef.current = setTimeout(() => {
        if (onClose) onClose();
        if (React.isValidElement(redirect)) {
          setDialogContent(() => redirect);
        } else if (typeof redirect === "string") {
          toggleDialogOpen(false);
          push(redirect);
        } else {
          toggleDialogOpen(false);
          push("/dashboard");
        }
      }, 3000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [push, redirect, setDialogContent, toggleDialogOpen, autoclose, onClose]);

  return (
    <>
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center gap-4">
        <SuccesIcon alt="" className="mt-8 mb-7 w-[78px] h-[78px]" />
        <p className={cn("text-2xl font-semibold text-center", className)}>
          {text}
        </p>
      </div>
    </>
  );
};

export default ConfirmationDialog;
