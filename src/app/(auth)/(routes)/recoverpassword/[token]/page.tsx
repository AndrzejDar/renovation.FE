import Header from "@/components/Header";
import React from "react";
import Logo from "@/assets/brand/logo.svg";
import ChangePasswordForm from "./create-password-form";

const CreateNewPassword = ({
  params: { token },
}: {
  params: { token: string };
}) => {
  return (
    <>
      <Header />
      <section className="w-full h-full flex items-center">
        {/* {isLoading && <IsLoadingOverlay />} */}
        <div className="w-full sm:w-[450px] mx-auto flex flex-col items-center px-6">
          <Logo
            alt="Buglo Logo"
            className="fill mb-8"
            width={210}
            height={90}
          />
          <h2 className="font-bold text-[28px] mb-2">Tworzenie nowego hasła</h2>
          <ChangePasswordForm className="mb-8 w-full" token={token} />
        </div>
      </section>
    </>
  );
};

export default CreateNewPassword;
