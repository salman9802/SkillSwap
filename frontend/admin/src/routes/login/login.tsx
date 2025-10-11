import React from "react";

import { LoginForm } from "@src/features/auth";
import type { LoginCredentials } from "@src/features/auth";

const Login = () => {
  const handleLogin = (credentials: LoginCredentials) => {
    console.log("credentials", credentials);
  };

  return (
    // <div className="mx-auto min-h-screen max-w-lg items-center justify-center border border-gray-300 p-12 shadow-md">
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-lg min-w-[300px] border border-gray-300 p-6 shadow-md">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
