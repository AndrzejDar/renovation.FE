import React from "react";
import Logo from "src/assets/brand/Logo.png";
import Chev_left from "src/assets/icons/chev_left.svg";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import FormResultWrapper from "./formWrapper";

const SignInPage = () => {
  // const isLoading = useStoreState((state) => state.app.isLoading);
  // const isLoading = useStoreState((state) => state.app);

  return (
    <>
      <Header />
      {console.log(process.env.NEXT_PUBLIC_API_URL)}
      <section className="w-full h-screen flex items-center">
        {/* {isLoading && <IsLoadingOverlay />} */}
        <div
          className="w-full sm:w-[450px] mx-auto flex flex-col items-center px-6 max-h-screen"
          // style={{ maxWidth: "450px" }}
        >
          <Image
            priority
            src={Logo}
            alt="Buglo Logo"
            className="fill mb-8"
            width={210}
            height={90}
          />
          <div className="w-full relative flex flex-row justify-center ">
            <Link
              href="/sign-in"
              className="bg-gray-100 rounded-full w-[36px] h-[36px] hover:bg-gray-200 absolute left-0 flex items-center align-middle justify-center"
            >
              <Chev_left />
            </Link>
            <h2 className="font-bold text-[28px] mb-4">Rejestracja</h2>
          </div>
          <FormResultWrapper />
        </div>
      </section>
    </>
  );
};

export default SignInPage;
