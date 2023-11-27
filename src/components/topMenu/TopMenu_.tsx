import React from "react";
import M_add from "@/assets/icons/m_add.svg";
import M_projects from "@/assets/icons/m_projects.svg";
import M_tools from "@/assets/icons/m_tools.svg";
import M_search from "@/assets/icons/m_search.svg";
import M_archive from "@/assets/icons/m_archive.svg";
import M_logout from "@/assets/icons/m_logout.svg";
import M_dots from "@/assets/icons/m_dots.svg";
import { ActionCreator, State } from "easy-peasy";
import NewProjectDialog from "../DialogContent/NewProjectDialog";
import M_profile from "@/assets/icons/m_profile.svg";
import MyProfile from "../DialogContent/MyProfile";

// import  Dots from '@/assets/icons/m_dots.svg';
// import { ReactComponent as Logo } from 'src/assets/brand/logo.svg'

const topMenu_nav = (
  setDialogContent: ActionCreator<() => React.ReactNode | undefined>,
  toggleDialogOpen: ActionCreator<boolean | undefined>,
  toggleSearchOpen: ActionCreator<boolean | undefined>,
  searchOpen: boolean,
  logoutUser: ActionCreator<void>
) => {
  return [
    {
      component: "",
      label: "Log out",
      onClick: () => {
        logoutUser();
      },
      icon: (
        <M_logout
          style={{ maxWidth: "40px", maxHeight: "60px", height: "auto" }}
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
        // <></>
        <M_profile
          style={{ maxWidth: "40px", maxHeight: "60px", height: "auto" }}
        />
      ),
    },
    {
      component: "",
      label: "Search",
      className: `${searchOpen ? "text-secondary" : ""}`,
      // to: "/dashboard/search",
      onClick: () => {
        toggleSearchOpen(undefined);
      },
      icon: (
        <M_search
          style={{ maxWidth: "40px", maxHeight: "50px", height: "auto" }}
          className={searchOpen ? "text-secondary" : ""}
        />
      ),
    },
    {
      component: "",
      label: "Add project",
      to: "/",
      onClick: () => {
        setDialogContent(() => <NewProjectDialog />);
        toggleDialogOpen(true);
      },
      icon: (
        <M_add
          style={{ maxWidth: "40px", maxHeight: "60px", height: "auto" }}
        />
      ),
    },
    {
      component: "",
      label: "Projects",
      to: "/dashboard",
      icon: (
        <M_projects
          style={{ maxWidth: "40px", maxHeight: "60px", height: "auto" }}
        />
      ),
      bgColor: "bg-secondary",
      textColor: "text-white",
    },
  ];
};

export default topMenu_nav;
