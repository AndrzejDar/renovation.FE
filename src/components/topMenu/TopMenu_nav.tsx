import React from "react";
import M_add from "@/assets/icons/m_add.svg";
import M_projects from "@/assets/icons/m_projects.svg";
import M_tools from "@/assets/icons/m_tools.svg";
import M_search from "@/assets/icons/m_search.svg";
import M_archive from "@/assets/icons/m_archive.svg";
import M_dots from "@/assets/icons/m_dots.svg";
import { ActionCreator, State } from "easy-peasy";
import NewProjectDialog from "../DialogContent/NewProjectDialog";

// import  Dots from '@/assets/icons/m_dots.svg';
// import { ReactComponent as Logo } from 'src/assets/brand/logo.svg'

const topMenu_nav = (
  setMenuSet: React.Dispatch<React.SetStateAction<Number>>,
  setDialogContent: ActionCreator<() => React.ReactNode | undefined>,
  toggleDialogOpen: ActionCreator<boolean | undefined>,
  toggleSearchOpen: ActionCreator<boolean | undefined>,
  searchOpen: boolean
) => {
  return [
    {
      component: "",
      label: "",
      onClick: () => {
        setMenuSet(1);
      },
      icon: (
        <M_dots
          style={{ maxWidth: "50px", maxHeight: "60px", height: "auto" }}
        />
      ),
    },
    {
      component: "",
      label: "Search",
      // to: "/dashboard/search",
      onClick: () => {
        toggleSearchOpen(undefined);
      },
      icon: (
        <M_search
          style={{ maxWidth: "50px", maxHeight: "50px", height: "auto" }}
          className={searchOpen ? "text-secondary" : ""}
        />
      ),
    },
    {
      component: "",
      label: "Archive",
      // to: "/dashboard/archive",
      disabled: true,
      icon: (
        <M_archive
          style={{ maxWidth: "50px", maxHeight: "50px", height: "auto" }}
        />
      ),
    },

    {
      component: "",
      label: "Tool",
      to: "/",
      disabled: true,
      icon: (
        <M_tools
          style={{ maxWidth: "50px", maxHeight: "60px", height: "auto" }}
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
          style={{ maxWidth: "50px", maxHeight: "60px", height: "auto" }}
        />
      ),
    },
    {
      component: "",
      label: "Projects",
      to: "/dashboard",
      icon: (
        <M_projects
          style={{ maxWidth: "50px", maxHeight: "60px", height: "auto" }}
        />
      ),
      bgColor: "bg-secondary",
      textColor: "text-white",
    },
  ];
};

export default topMenu_nav;
