import React from "react";
import SignInForm from "./sign-in-form";
import Logo from "@/assets/brand/Logo.png";
import Image from "next/image";
import DecorativeLink from "@/components/DecorativeLink";

const SignInPage = () => {
  return (
    <>
      <section className="w-full h-full flex items-center">
        <div className="w-full sm:w-[450px] mx-auto flex flex-col items-center px-6">
          <Image
            priority
            src={Logo}
            alt="Buglo Logo"
            className="fill mb-8"
            width={210}
            height={90}
          />
          <h2 className="font-bold text-[28px] mb-2">
            Project Management Panel
          </h2>
          <SignInForm className="mb-8 w-full" />
          <DecorativeLink className="mb-6" href="/reset-password">
            Zapomniałeś hasła?
          </DecorativeLink>
          <DecorativeLink className="mb-6" href="/sign-up">
            Zarejestruj się
          </DecorativeLink>
        </div>
      </section>
    </>
  );
};

export default SignInPage;
