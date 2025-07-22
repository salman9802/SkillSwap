import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";

import { Button } from "./ui/button";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { StoreState } from "@/features/store";
import {
  useLogoutMutation,
  useRefreshQuery,
} from "@/features/session/sessionApi";
import { useStoreDispatch } from "@/lib/hooks";
import {
  clearCredentials,
  setCrenentials,
} from "@/features/session/sessionSlice";
import Loader from "./utils/Loader";

const Header = () => {
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state: StoreState) => state.session,
  );
  const { data, isLoading, isFetching, isSuccess, isError } = useRefreshQuery();
  const dispatch = useStoreDispatch();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  React.useEffect(() => {
    if (data) {
      dispatch(setCrenentials(data));
    }
  }, [data]);

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
          {/* when first render show loader
          when fetching show loader
          when fetched swith between ui elems */}

          {isLoading || isFetching ? (
            <Loader className="size-5" />
          ) : !data || !isAuthenticated ? (
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
          ) : (
            <>
              <Button
                onClick={async () => {
                  try {
                    const res = await logout().unwrap();
                    console.log(res);
                    dispatch(clearCredentials());
                    navigate("/", { replace: true });
                  } catch (error) {
                    console.log(error);
                  }
                }}
                disabled={logoutLoading}
                className="text-primary hover:text-primary cursor-pointer"
                variant="ghost"
              >
                {logoutLoading ? (
                  <Loader className="mx-auto size-5" />
                ) : (
                  "Log out"
                )}
              </Button>
              <Link to="/user/account">
                <Button
                  variant="outline"
                  className="flex h-auto cursor-pointer items-center justify-between gap-4 px-4 py-2"
                >
                  <Avatar>
                    <AvatarImage
                      src={user?.picture}
                      alt={`@${data?.user?.name}`}
                    />
                    <AvatarFallback className="uppercase">
                      {getInitials(data?.user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-800 capitalize">
                    {data?.user?.name || "Guest"}
                  </span>
                </Button>
              </Link>
            </>
          )}

          {/* {isAuthenticated ? (
              !data && isFetching ? (
              <Loader className="size-5" />
            ) : (
              <>
                <Button
                  onClick={async () => {
                    try {
                      const res = await logout().unwrap();
                      console.log(res);
                      dispatch(clearCredentials());
                      navigate("/", { replace: true });
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  disabled={logoutLoading}
                  className="text-primary hover:text-primary cursor-pointer"
                  variant="ghost"
                >
                  {logoutLoading ? (
                    <Loader className="mx-auto size-5" />
                  ) : (
                    "Log out"
                  )}
                </Button>
                <Link to="/user/account">
                  <Button
                    variant="outline"
                    className="flex h-auto cursor-pointer items-center justify-between gap-4 px-4 py-2"
                  >
                    <Avatar>
                      <AvatarImage
                        src={user?.picture}
                        alt={`@${data?.user?.name}`}
                      />
                      <AvatarFallback className="uppercase">
                        {getInitials(data?.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-gray-800 capitalize">
                      {data?.user?.name || "Guest"}
                    </span>
                  </Button>
                </Link>
              </>
            )
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
          )} */}
          <Link to="/marketplace">
            <Button className="cursor-pointer" variant="ghost">
              Visit Marketplace
            </Button>
          </Link>
        </div>
      </div>

      {/* Popup */}
      <div
        className={cn(
          "absolute top-full mb-1 flex w-full items-start gap-2 bg-gray-50 px-2 py-3 transition-all duration-200",
          isHamburgerOpen && "scale-100 opacity-100",
          !isHamburgerOpen && "pointer-events-none scale-95 opacity-0",
        )}
      >
        {/* <Link to="user/register">
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
        </Link> */}

        {isLoading || isFetching ? (
          <Loader className="size-5" />
        ) : !data || !isAuthenticated ? (
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
        ) : (
          <>
            <Button
              onClick={async () => {
                try {
                  const res = await logout().unwrap();
                  console.log(res);
                  dispatch(clearCredentials());
                  navigate("/", { replace: true });
                } catch (error) {
                  console.log(error);
                }
              }}
              disabled={logoutLoading}
              className="text-primary hover:text-primary cursor-pointer"
              variant="ghost"
            >
              {logoutLoading ? (
                <Loader className="mx-auto size-5" />
              ) : (
                "Log out"
              )}
            </Button>
            <Link to="/user/account">
              <Button
                variant="outline"
                className="flex h-auto cursor-pointer items-center justify-between gap-4 px-4 py-2"
              >
                <Avatar>
                  <AvatarImage
                    src={user?.picture}
                    alt={`@${data?.user?.name}`}
                  />
                  <AvatarFallback className="uppercase">
                    {getInitials(data?.user?.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-800 capitalize">
                  {data?.user?.name || "Guest"}
                </span>
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
