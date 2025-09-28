import React from "react";
import { Link, NavLink } from "react-router";
import AccountDropdown from "./AccountDropdown";

const NavBar = () => {
  const activeClasses = ({ isActive }: { isActive: boolean }) =>
    "p-3 text-lg hover:bg-gray-100 md:text-xl " +
    (isActive ? "bg-gray-100" : "bg-none");

  return (
    <nav className="flex h-full flex-col gap-3 px-6 py-12">
      <div className="flex flex-col">
        <div className="py-3">
          <AccountDropdown />
        </div>
        <p className="text-gray-800 uppercase">General Admin</p>
        <NavLink className={activeClasses} to="/dashboard">
          Dashboard & Analytics
        </NavLink>
        <NavLink className={activeClasses} to="/manage-admin">
          Mange Admins
        </NavLink>
        <NavLink className={activeClasses} to="/user-log">
          User Logs
        </NavLink>
        <NavLink className={activeClasses} to="/user-report">
          User Reports
        </NavLink>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-800 uppercase">Advanced Access</p>
        <NavLink className={activeClasses} to="/admin-log">
          Admin Logs
        </NavLink>
        <NavLink className={activeClasses} to="/admin-report">
          Admin Reports
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
