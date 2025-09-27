import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Root from "./root";
import Login from "./login/login";
import NavLayout from "@src/layouts/NavLayout";

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
            element: "dashboard",
          },
          {
            path: "manage-admin",
            element: "manage admin",
          },
          {
            path: "user-log",
            element: "user log",
          },
          {
            path: "user-report",
            element: "user report",
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
                element: "admin report",
              },
            ],
          },
        ],
      },
    ],
  },
]);
