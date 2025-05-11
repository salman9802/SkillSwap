import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <header className="relative">
      <div className="container flex items-center justify-between px-2 py-4 sm:mx-auto md:py-6">
        {/* Logo */}
        <span className="custom-gradient text-3xl lg:text-5xl">SkillSwap</span>
        {/* Hamburger */}
        <button
          onClick={() => setIsHamburgerOpen((prev) => !prev)}
          className="cursor-pointer [--size:1.5rem] hover:text-gray-600 md:hidden"
        >
          {isHamburgerOpen ? (
            <IoClose className="size-[var(--size)]" />
          ) : (
            <RxHamburgerMenu className="size-[var(--size)]" />
          )}
        </button>
        {/* Buttons */}
        <div className="hidden items-center justify-center gap-4 md:flex">
          <Button className="cursor-pointer">Create an account</Button>
          <Button className="cursor-pointer" variant="primary-outline">
            Log in
          </Button>
          <Button className="cursor-pointer" variant="ghost">
            Visit Marketplace
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "absolute top-full flex w-full flex-col items-start gap-2 bg-gray-50 px-2 py-3 transition-all duration-200",
          isHamburgerOpen && "scale-100 opacity-100",
          !isHamburgerOpen && "pointer-events-none scale-95 opacity-0",
        )}
      >
        <Button className="cursor-pointer">Create an account</Button>
        <Button className="cursor-pointer" variant="primary-outline">
          Log in
        </Button>
        <Button className="cursor-pointer" variant="ghost">
          Visit Marketplace
        </Button>
      </div>
    </header>
  );
};

export default Header;
