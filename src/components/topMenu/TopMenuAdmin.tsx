"use client";

import { useStoreActions, useStoreState } from "@/store/hooks";
import React from "react";
import { cn } from "@/app/lib/utils";
import ChevRound from "@/assets/icons/chev_round.svg";

import topMenu_adminProfile from "./TopMenu_adminProfile";
import { useRouter } from "next/navigation";

interface MenuElement {
  component: string;
  label: string;
  onClick?: () => any;
  icon: React.ReactNode;
  to?: string;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
}

const TopMenuAdmin = () => {
  const topMenuShow = useStoreState((state) => state.app.topMenuShow);
  const toggleTopMenuShow = useStoreActions(
    (actions) => actions.app.toggleTopMenuShow
  );

  const setDialogContent = useStoreActions(
    (store) => store.app.setDialogContent
  );
  const toggleDialogOpen = useStoreActions(
    (store) => store.app.toggleDialogOpen
  );

  const logoutUser = useStoreActions((store) => store.auth.clearUser);

  const _adminProfile = topMenu_adminProfile(
    setDialogContent,
    toggleDialogOpen,
    logoutUser
  );

  const { replace } = useRouter();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleTopMenuShow(undefined);
  };

  const handleClick = (el: any) => {
    if (el.onClick) el.onClick();
    else if (el.to) {
      replace(el.to);
    }
  };

  return (
    <div className="w-full min-w-[640px]">
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden relative bg-transparent",
          topMenuShow ? "h-[200px]" : "h-[0px]"
        )}
      >
        {/* Admin menu*/}
        <div
          className={cn(
            "w-full h-full flex flex-row-reverse absolute top-0 p-3"
          )}
          style={{ backgroundColor: "unset" }}
        >
          {_adminProfile.map((el: MenuElement, index) => (
            <div
              key={index}
              className={cn(
                "w-full h-full flex items-center justify-center py-2 border-2 border-x-0 border-collapse hover:cursor-pointer",
                index === 5 && "border-0",
                index === 4 ? "border-l-2" : "",
                index === 0 ? "border-r-2" : ""
                // menuSet === 1 ? "z-10" : "z-0"
              )}
              style={{
                borderRadius:
                  index === 4
                    ? "5px 0 0 5px"
                    : index === 0
                    ? "0 5px 5px 0"
                    : undefined,
              }}
            >
              <div className={cn("w-full h-full px-2")}>
                <div
                  onClick={() => handleClick(el)}
                  className={cn(
                    `w-full h-full flex-1 border rounded-[5px] flex flex-col bg-gray-100 justify-center items-center overflow-hidden fill-gray-500  transition-all hover:scale-105 hover:fill-secondary hover:text-secondary`,
                    el.bgColor ? el.bgColor + " border-none" : "",
                    el?.textColor ? el.textColor : "text-gray-500"
                  )}
                >
                  {el.icon}
                  <h4 className="text-xl font-medium text-center">
                    {el.label}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-row justify-center relative transition-all duration-300 z-10 ",
          topMenuShow ? "top-[-32px]" : "top-0 rotate-180"
        )}
      >
        <a href="" onClick={handleToggle} className="">
          <ChevRound
            width={40}
            height={40}
            alt=""
            className="hover:scale-110 transition-all text-gray-500 hover:text-secondary"
          />
        </a>
      </div>
    </div>
  );
};

export default TopMenuAdmin;
