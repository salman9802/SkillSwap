import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <header className="relative inset-x-0 z-50 bg-white">
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
          {isAuthenticated ? (
            <Link to="/user/account">
              <Button
                variant="outline"
                className="flex h-auto cursor-pointer items-center justify-between gap-4 px-4 py-2"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.pngf"
                    alt="@shadcn"
                  />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <span className="text-gray-800">Salman Khan</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/user/register">
                <Button className="cursor-pointer">Create an account</Button>
              </Link>
              <Link to="/user/login">
                <Button className="cursor-pointer" variant="primary-outline">
                  Log in
                </Button>
              </Link>
            </>
          )}
          <Link to="/marketplace">
            <Button className="cursor-pointer" variant="ghost">
              Visit Marketplace
            </Button>
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "absolute top-full flex w-full flex-col items-start gap-2 bg-gray-50 px-2 py-3 transition-all duration-200",
          isHamburgerOpen && "scale-100 opacity-100",
          !isHamburgerOpen && "pointer-events-none scale-95 opacity-0",
        )}
      >
        <Link to="user/register">
          <Button className="cursor-pointer">Create an account</Button>
        </Link>
        <Link to="/user/login">
          <Button className="cursor-pointer" variant="primary-outline">
            Log in
          </Button>
        </Link>
        <Link to="/marketplace">
          <Button className="cursor-pointer" variant="ghost">
            Visit Marketplace
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
