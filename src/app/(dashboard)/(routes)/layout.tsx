"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import IsLoadingOverlay from "@/components/IsLoadingOverlay";
import UsersTable from "@/components/UsersTable";
import UsersTableWrapper from "@/components/UsersTableWrapper";
import TopMenu from "@/components/topMenu/TopMenu";
import TopMenuAdmin from "@/components/topMenu/TopMenuAdmin";
import { store } from "@/store";
import { useStoreActions, useStoreState } from "@/store/hooks";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isAuthenticated = useStoreState((store) => store.auth.isAuthenticated);
  const isAdmin = useStoreState((store) => store.auth.isAdmin);

  // const isAuthenticated = typeof window !== "undefined" ? isAuth : true;

  return (
    <div className="min-h-full w-full flex flex-col items-center bg-white absolute">
      {isHydrated ? (
        <Header>
          <>
            {isAuthenticated ? (
              isAdmin ? (
                <>
                  <TopMenuAdmin />
                  <UsersTableWrapper className="w-full h-auto flex-grow px-10" />
                  <Footer className="self-end" />
                </>
              ) : (
                <>
                  <TopMenu />
                  <section className="w-full h-auto flex-grow flex flex-col">
                    {children}
                  </section>
                  <Footer className="self-end" />
                </>
              )
            ) : (
              <IsLoadingOverlay />
              // <></>
            )}
          </>
        </Header>
      ) : null}
    </div>
  );
};

export default DashboardLayout;
