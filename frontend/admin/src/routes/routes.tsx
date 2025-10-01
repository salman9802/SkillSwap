import { createBrowserRouter, Navigate, Outlet } from "react-router";

import Root from "./root";
import Login from "./login/login";
import NavLayout from "@src/layouts/NavLayout";
import Dashboard from "./dashboard/dashboard";
import AdminManagement from "./admin-management/admin-management";
import UserManagement from "./user-management/user-management";
import AdminReport from "./admin-report/admin-report";
import UserReport from "./user-report/user-report";
import { AdminLog } from "./admin-log/admin-log";
import { UserLog } from "./user-log/user-log";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    element: <Outlet />, // basic auth
    children: [
      {
        path: "/",
        Component: NavLayout,
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" replace />,
          },
          {
            path: "dashboard",
            Component: Dashboard,
          },
          {
            path: "manage-admin",
            Component: AdminManagement,
          },
          {
            path: "manage-user",
            Component: UserManagement,
          },
          {
            path: "user-log",
            Component: UserLog,
          },
          {
            path: "user-report",
            Component: UserReport,
          },
          {
            element: <Outlet />, // advanced access auth layout
            children: [
              {
                path: "admin-log",
                Component: AdminLog,
              },
              {
                path: "admin-report",
                Component: AdminReport,
              },
            ],
          },
        ],
      },
    ],
  },
]);
