import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoAddCircle, IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import Sidebar from "@/components/utils/Sidebar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxHamburgerMenu } from "react-icons/rx";
import React from "react";

const UserAccountNavbar = ({ onClick }: { onClick?: () => any }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "font-medium px-6 py-3 flex items-center justify-start gap-4",
      isActive ? "font-semibold bg-accent text-primary" : "text-gray-600",
    );

  return (
    <div className="flex min-h-full flex-col gap-12">
      <h1 className="text-xl md:text-2xl lg:text-4xl">Account</h1>
      <div className="flex grow flex-col gap-1.5">
        <NavLink
          onClick={onClick}
          to="/user/account/profile"
          className={navLinkClass}
        >
          <CgProfile className="size-5" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          onClick={onClick}
          to="/user/account/dashboard"
          className={navLinkClass}
        >
          <AiOutlineDashboard className="size-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          onClick={onClick}
          to="/user/account/new-request"
          className={navLinkClass}
        >
          <IoAddCircle className="size-5" />
          <span>New request</span>
        </NavLink>
      </div>
      <div className="bg-primary/20 flex items-center justify-start gap-1.5 px-4 py-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.pngf" alt="@shadcn" />
          <AvatarFallback>SK</AvatarFallback>
        </Avatar>
        <span className="text-gray-800">Salman Khan</span>
      </div>
    </div>
  );
};

const UserAccountLayout = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false);

  return (
    <Sidebar>
      <Sidebar.LeftContent className="sticky top-0 bottom-0 left-0 hidden px-7 py-14 md:block">
        <UserAccountNavbar />
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
            className="cursor-pointer self-end"
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
              <UserAccountNavbar onClick={() => setIsHamburgerOpen(false)} />
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
  );
};

export default UserAccountLayout;
