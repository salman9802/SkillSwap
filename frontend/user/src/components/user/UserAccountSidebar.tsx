import { Link, NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TiHome } from "react-icons/ti";

import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdManageHistory } from "react-icons/md";
import { useSelector } from "react-redux";
import type { StoreState } from "@/features/store";
import { SERVER_URL } from "@/features/api";

const UserAccountSidebar = ({ onClick }: { onClick?: () => any }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "font-medium px-6 py-3 flex items-center justify-start gap-4",
      isActive ? "font-semibold bg-accent text-primary" : "text-gray-600",
    );

  const user = useSelector((state: StoreState) => state.session.user);

  return (
    <div className="flex min-h-full flex-col gap-6">
      <Link to="/" className="text-primary flex items-center gap-3 underline">
        <TiHome className="size-5" /> Home
      </Link>
      <div className="flex grow flex-col gap-12">
        <h1 className="text-xl md:text-2xl lg:text-4xl">Account</h1>
        <div className="flex grow flex-col gap-1.5">
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
            to="/user/account/profile"
            className={navLinkClass}
          >
            <CgProfile className="size-5" />
            <span>Profile</span>
          </NavLink>
          <NavLink
            onClick={onClick}
            to="/user/account/new-request"
            className={navLinkClass}
          >
            <IoAddCircle className="size-5" />
            <span>New Skillswap request</span>
          </NavLink>
          <NavLink
            onClick={onClick}
            to="/user/account/manage-sessions"
            className={navLinkClass}
          >
            <MdManageHistory className="size-5" />
            <span>Manage Sessions</span>
          </NavLink>
        </div>
        <div className="bg-primary/10 flex flex-col gap-3 px-4 py-2">
          <div className="flex items-center justify-start gap-1.5">
            <Avatar>
              <AvatarImage
                src={`${SERVER_URL}${user?.picture}`}
                alt="@shadcn"
              />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <span className="text-gray-800">{user?.name}</span>
          </div>

          {user?.coins && (
            <div className="flex items-center justify-start">
              <img src="/coin.png" className="size-5" alt="" />
              <span className="font-bold">{user?.coins}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccountSidebar;
