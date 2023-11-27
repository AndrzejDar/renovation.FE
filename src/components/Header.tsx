"use client";

import { useStoreActions, useStoreState } from "@/store/hooks";
import React, { useEffect } from "react";
import IsLoadingOverlay from "./IsLoadingOverlay";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import DialogContentWrapper from "./DialogContentWrapper";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ children }: { children?: React.ReactNode }) => {
  const isLoading = useStoreState((store) => store.app.isLoading);
  const dialogOpen = useStoreState((store) => store.app.dialogOpen);
  const toggleDialogOpen = useStoreActions(
    (store) => store.app.toggleDialogOpen
  );

  const { replace } = useRouter();
  const path = usePathname();
  const isAuthenticated = useStoreState((store) => store.auth.isAuthenticated);
  const tokenExpiration = useStoreState((store) => store.auth.tokenExpiration);
  const clearUser = useStoreActions((store) => store.auth.clearUser);
  const { push } = useRouter();

  useEffect(() => {
    //close dialog if open
    toggleDialogOpen(false);

    //setup timeout to logout on JWT expiration
    let signOutTimeout: NodeJS.Timeout;
    const signOut = () => {
      clearUser();
      push("/sign-in");
    };

    if (isAuthenticated) {
      // console.log(
      //   "setting logout in",
      //   tokenExpiration * 1000 - Date.now(),
      //   "ms"
      // );
      signOutTimeout = setTimeout(signOut, tokenExpiration * 1000 - Date.now());
    }
    return () => clearTimeout(signOutTimeout);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //redirect depending on isAuthenticeted store value
    if (!isAuthenticated && path.startsWith("/dashboard")) {
      console.log("not authenticated -> redirecting to sign in");
      replace("/sign-in");
    }
    if (isAuthenticated && !path.startsWith("/dashboard")) {
      console.log("authenticated -> redirecting to dashboard");
      replace("/dashboard");
    }
    if (path === "/") replace("/sign-in");
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <>
      {isLoading && <IsLoadingOverlay />}
      <Dialog open={dialogOpen} onOpenChange={toggleDialogOpen}>
        <DialogContentWrapper />
      </Dialog>
      {children}
    </>
  );
};

export default Header;
