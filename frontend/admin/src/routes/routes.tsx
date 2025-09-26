import { createBrowserRouter } from "react-router";
import Root from "./root";
import Login from "./login/login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);
