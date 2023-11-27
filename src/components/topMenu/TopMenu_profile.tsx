"use client";
import React from "react";
import Logo from "@/assets/brand/logo.svg";
import M_profile from "@/assets/icons/m_profile.svg";
import M_logout from "@/assets/icons/m_logout.svg";
import M_dots from "@/assets/icons/m_dots.svg";
import MyProfile from "../DialogContent/MyProfile";
import { ActionCreator } from "easy-peasy";

const topMenu_profile = (
  setMenuSet: React.Dispatch<React.SetStateAction<Number>>,
  setDialogContent: ActionCreator<() => React.ReactNode | undefined>,
  toggleDialogOpen: ActionCreator<boolean | undefined>,
  logoutUser: ActionCreator<void>
) => {
  return [
    {
      component: "",
      label: "",
      onClick: () => {
        setMenuSet(0);
      },
      icon: (
        <M_dots
          style={{ maxWidth: "50px", maxHeight: "60px", height: "auto" }}
        />
      ),
    },
    {
      component: "",
      label: "Log out",
      onClick: () => {
        logoutUser();
      },
      icon: (
        <M_logout
          style={{ maxWidth: "50px", maxHeight: "60px", height: "auto" }}
        />
      ),
    },
    {
      component: "",
      label: "Profil",
      onClick: () => {
        setDialogContent(() => <MyProfile />);
        toggleDialogOpen(true);
      },
      icon: (
        <M_profile
          style={{ maxWidth: "50px", maxHeight: "60px", height: "auto" }}
        />
      ),
    },
    {
      component: "",
      label: "",
      to: "",
      icon: "",
      bgColor: "bg-white",
    },
    {
      component: "",
      label: "",
      to: "",
      icon: "",
      bgColor: "bg-white",
    },
    {
      component: "",
      label: "",
      to: "/dashboard",
      bgColor: "bg-white",
      icon: (
        <Logo style={{ maxWidth: "100%", maxHeight: "60px", height: "auto" }} />
      ),
    },
  ];
};

export default topMenu_profile;
