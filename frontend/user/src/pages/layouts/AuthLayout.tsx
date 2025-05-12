import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  // TODO: check user authentication
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
