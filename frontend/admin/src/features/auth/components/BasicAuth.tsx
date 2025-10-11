import { Navigate, Outlet } from "react-router";

// import { useStore } from "@src/store/appStore";
// import { authSelector } from "../store";

export const BasicAuth = () => {
  // const {accessToken } = useStore(authSelector);
  const accessToken = null;

  return accessToken == undefined ? (
    <Navigate to="/login" replace />
  ) : (
    <Outlet />
  );
};
