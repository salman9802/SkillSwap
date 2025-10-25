import React from "react";

import { LoginForm } from "@src/features/auth";
import type { LoginCredentials } from "@src/features/auth";
import { useActionData, useNavigation, useSubmit } from "react-router";

const Login = () => {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === "submitting";

  const handleLogin = (credentials: LoginCredentials) => {
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("password", credentials.password);

    submit(formData, { method: "POST" });
  };

  return (
    // <div className="mx-auto min-h-screen max-w-lg items-center justify-center border border-gray-300 p-12 shadow-md">
    <div className="flex min-h-screen items-center justify-center">
      <div className="max-w-lg min-w-[300px] border border-gray-300 p-6 shadow-md">
        <LoginForm
          onSubmit={handleLogin}
          isSubmitting={isSubmitting}
          error={actionData}
        />
      </div>
    </div>
  );
};

export default Login;
