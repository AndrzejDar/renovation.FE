import React, { useEffect, useRef } from "react";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useStoreActions } from "@/store/hooks";
import { useRouter } from "next/navigation";
import SuccesIcon from "@/assets/icons/succes.svg";

const RemoveAccountConfirmation = () => {
  const clearUser = useStoreActions((store) => store.auth.clearUser);
  const { push } = useRouter();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      clearUser();
      push("/sign-in");
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [clearUser, push]);

  return (
    <>
      <div className="w-full min-h-[300px] flex flex-col justify-center items-center gap-4">
        <SuccesIcon alt="" className="mt-8 mb-7 w-[78px] h-[78px]" />
        <p className="text-2xl font-semibold text-center">Konto usunięte</p>
      </div>
    </>
  );
};

export default RemoveAccountConfirmation;
