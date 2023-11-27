import React from "react";

import Logo from "src/assets/brand/logo.svg";
import Chev_left from "@/assets/icons/chev_left.svg";
import Image from "next/image";
import DecorativeLink from "@/components/DecorativeLink";
import IsLoadingOverlay from "@/components/IsLoadingOverlay";
// import { useStoreState } from "easy-peasy";
import { useStoreState } from "@/store/hooks";
import Header from "@/components/Header";
import ResetPasswordForm from "./reset-password-form";
import Link from "next/link";

const SignInPage = () => {
  // const isLoading = useStoreState((state) => state.app.isLoading);
  // const isLoading = useStoreState((state) => state.app);

  return (
    <>
      <Header />
      <section className="w-full h-full flex items-center">
        {/* {isLoading && <IsLoadingOverlay />} */}
        <div
          className="w-full sm:w-[450px] mx-auto flex flex-col items-center px-6"
          // style={{ maxWidth: "450px" }}
        >
          <Logo
            alt="Buglo Logo"
            className="fill mb-8"
            width={210}
            height={90}
          />
          <div className="w-full relative flex flex-col items-center justify-center ">
            <Link
              href="/sign-in"
              className="bg-gray-100 rounded-full w-[36px] h-[36px] hover:bg-gray-200 absolute left-0 top-1 flex items-center align-middle justify-center"
            >
              <Chev_left />
            </Link>
            <h2 className="font-bold text-[28px] mb-3">Zresetuj hasło</h2>
            <p>Podaj adres email na który zostanie wysłany link</p>
          </div>

          <ResetPasswordForm className="mb-8 w-full" />
        </div>
      </section>
    </>
  );
};

export default SignInPage;
