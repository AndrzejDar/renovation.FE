import { useStoreActions } from "@/store/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import ErrorIcon from "@/assets/icons/error.svg";

const ErrorDialog = ({
  text,
  redirect,
}: {
  text: string;
  redirect?: React.ReactNode | string;
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
    timeoutRef.current = setTimeout(() => {
      if (React.isValidElement(redirect)) setDialogContent(() => redirect);
      else if (typeof redirect === "string") {
        toggleDialogOpen(false);
        push(redirect);
      } else {
        toggleDialogOpen(false);
        push("/dashboard");
      }
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [push, redirect, setDialogContent, toggleDialogOpen]);

  return (
    <>
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center gap-4">
        <ErrorIcon alt="" className="mt-8 mb-7 w-[78px] h-[78px]" />
        <p className="text-2xl font-semibold">{text}</p>
        <p className="text-md font-medium">Spróbuj ponownie</p>
      </div>
    </>
  );
};

export default ErrorDialog;
