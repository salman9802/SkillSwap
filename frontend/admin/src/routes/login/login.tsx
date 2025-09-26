import React from "react";

import LoginForm from "@src/features/auth/components/LoginForm";
import type { LoginCredentials } from "@src/features/auth";

const Login = () => {
  const handleLogin = (credentials: LoginCredentials) => {
    console.log("credentials", credentials);
  };

  return (
    <div className="border border-gray-300 p-12 shadow-md">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
