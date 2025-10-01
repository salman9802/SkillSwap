import { createBrowserRouter, Navigate, Outlet } from "react-router";

import Root from "./root";
import Login from "./login/login";
import NavLayout from "@src/layouts/NavLayout";
import Dashboard from "./dashboard/dashboard";
import AdminManagement from "./admin-management/admin-management";
import UserManagement from "./user-management/user-management";
import AdminReport from "./admin-report/admin-report";
import UserReport from "./user-report/user-report";

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
            element: "user log",
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
                element: "admin log",
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
