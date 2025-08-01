import React from "react";
import { Outlet } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import Sidebar from "@/components/utils/Sidebar";
import { cn } from "@/lib/utils";
import UserAccountSidebar from "@/components/user/UserAccountSidebar";
import DemoAnnouncement from "@/components/DemoAnnouncement";

const UserAccountLayout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false);

  return (
    <div className="">
      <DemoAnnouncement />
      <Sidebar>
        <Sidebar.LeftContent className="sticky top-0 bottom-0 left-0 hidden px-7 py-14 md:block">
          <UserAccountSidebar />
        </Sidebar.LeftContent>
        <Sidebar.RightContent
          className={cn(
            "relative h-screen px-7 py-14",
            isHamburgerOpen ? "overflow-hidden" : "overflow-auto",
          )}
        >
          <div className="flex flex-col gap-6">
            <button
              onClick={() => setIsHamburgerOpen(true)}
              className={"cursor-pointer self-end md:hidden"}
            >
              <RxHamburgerMenu className="size-5" />
            </button>
            <div
              className={cn(
                "absolute top-0 bottom-0 left-0 z-50 bg-white px-7 py-14 transition-all duration-200",
                isHamburgerOpen ? "translate-x-0" : "-translate-x-full",
              )}
            >
              <div className="flex h-full flex-col gap-6">
                <button
                  className="self-end"
                  onClick={() => setIsHamburgerOpen(false)}
                >
                  <IoClose className="size-5" />
                </button>
                <UserAccountSidebar onClick={() => setIsHamburgerOpen(false)} />
              </div>
            </div>
            {/* overlay */}
            <div
              className={cn(
                "absolute inset-0 z-40 bg-black/20",
                isHamburgerOpen ? "block" : "hidden",
              )}
            ></div>
            <Outlet />
          </div>
        </Sidebar.RightContent>
      </Sidebar>
    </div>
  );
};

export default UserAccountLayout;
