"use client";
import Header from "@/components/Header";
import IsLoadingOverlay from "@/components/IsLoadingOverlay";
import { useStoreState } from "@/store/hooks";
import React, { useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAuthenticated = useStoreState((store) => store.auth.isAuthenticated);

  return (
    <>
      {isHydrated ? (
        <div className="h-full w-full flex items-center justify-center bg-white">
          <Header>{!isAuthenticated ? children : <IsLoadingOverlay />}</Header>
        </div>
      ) : null}
    </>
  );
};

export default AuthLayout;
