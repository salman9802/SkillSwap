import React from "react";

import { Outlet } from "react-router";
import { RxHamburgerMenu } from "react-icons/rx";

import NavBar from "@src/components/admin/NavBar";
import { IoClose } from "react-icons/io5";

const NavLayout = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  // prevent scroll when nav is open
  React.useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  });

  return (
    <div className="relative h-full [--navbar-width:80vw] md:[--navbar-width:375px] lg:[--navbar-width:20vw]">
      {/* Navbar */}
      <div
        className={`absolute inset-y-0 left-0 z-50 min-h-screen w-[var(--navbar-width)] bg-white shadow-lg transition-transform duration-200 lg:translate-x-0 ${isNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="sticky top-0 left-0">
          <NavBar onNavigate={() => setIsNavOpen(false)} />
        </div>
        <button
          onClick={() => setIsNavOpen((prev) => !prev)}
          className="absolute top-3 right-3 lg:hidden"
        >
          <IoClose className="size-5" />
        </button>
      </div>
      {/* Overlay */}
      <div
        className={`absolute z-40 h-screen w-full bg-black/30 ${isNavOpen ? "block" : "hidden"}`}
      ></div>

      {/* Content */}
      <div className="lg:ml-[var(--navbar-width)]">
        <button
          onClick={() => setIsNavOpen((prev) => !prev)}
          className="mt-6 ml-6 lg:hidden"
        >
          <RxHamburgerMenu className="size-5" />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default NavLayout;
