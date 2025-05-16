import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdManageHistory } from "react-icons/md";

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
          <span>New request</span>
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

export default UserAccountNavbar;
