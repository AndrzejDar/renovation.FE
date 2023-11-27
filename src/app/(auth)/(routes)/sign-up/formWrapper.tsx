"use client";

import React, { useState } from "react";
import SuccesIcon from "@/assets/icons/succes.svg";
import Image from "next/image";
import DecorativeLink from "@/components/DecorativeLink";
import SignUpForm from "./sign-up-form";

const FormResultWrapper: React.FC = () => {
  const [succes, setSucces] = useState<Boolean | undefined>();
  const [mail, setMail] = useState<string>("Your mail");
  const [msg, setMsg] = useState<string>("");

  return (
    <div>
      {succes === undefined ? (
        <SignUpForm
          className="mb-8 w-full"
          succes={{ setSucces: setSucces, setMail: setMail, setMsg: setMsg }}
        />
      ) : succes ? (
        <Succes mail={mail} />
      ) : (
        <Fail msg={msg} />
      )}
    </div>
  );
};

const Succes = ({ mail }: { mail: string }) => {
  return (
    <div className="mb-8 w-full flex flex-col items-center">
      <SuccesIcon width={78} height={78} alt="" className="mt-8 mb-7" />
      <h3 className="font-bold text-xl mb-6">
        Rejestracja przebiegła pomyślnie
      </h3>
      {/* <p className="text-base mb-4">Otwórz link, który wysłaliśmy na maila:</p>
      <DecorativeLink href={""} className="font-bold text-base">
        {mail}
      </DecorativeLink> */}
    </div>
  );
};

const Fail = ({ msg }: { msg: string }) => {
  const msgs: { [key: string]: string } = {
    USER_WITH_GIVEN_EMAIL_EXISTS_IN_SYSTEM:
      "Użytkownik o podanym adresie email jest już zarejstrowawny.",
    EMAIL_FORMAT_ERROR: "Niepoprawny format adresu email.",
  };

  return (
    <div className="mb-8 w-full flex flex-col items-center">
      <h3 className="font-bold text-xl mb-6 text-secondary">
        Rejestracja nieudana
      </h3>
      {msg != "" && (
        <p className="text-center">{msgs[msg] || "Nieznany błąd"}</p>
      )}
    </div>
  );
};

export default FormResultWrapper;
