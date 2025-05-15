import { cn } from "@/lib/utils";
import type React from "react";

type SidebarLeftContentPropsType = React.PropsWithChildren & {
  className?: string;
};

const LeftContent = ({ children, className }: SidebarLeftContentPropsType) => {
  return (
    <div className={cn("h-screen min-w-64 px-6 py-12", className)}>
      {children}
    </div>
  );
};

type SidebarRightContentPropsType = React.PropsWithChildren & {
  className?: string;
};

const RightContent = ({
  children,
  className,
}: SidebarRightContentPropsType) => {
  return <div className={cn("min-h-screen grow", className)}>{children}</div>;
};

type SidebarPropsType = React.PropsWithChildren & {
  className?: string;
};

const Sidebar = ({ children, className }: SidebarPropsType) => {
  return (
    <div className={cn("flex w-full flex-row", className)}>{children}</div>
  );
};

Sidebar.LeftContent = LeftContent;
Sidebar.RightContent = RightContent;

export default Sidebar;
