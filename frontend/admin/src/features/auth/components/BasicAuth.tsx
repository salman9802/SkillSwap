import { Navigate, Outlet } from "react-router";

import { useStore } from "@src/store/appStore";

export const BasicAuth = () => {
  const accessToken = useStore((s) => s.accessToken);

  return accessToken == undefined ? (
    <Navigate to="/login" replace />
  ) : (
    <Outlet />
  );
};
