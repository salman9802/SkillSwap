import React from "react";

import Button from "@src/components/ui/Button";
import Input from "@src/components/ui/Input";
import type { LoginCredentials } from "../types";

type LoginFormProps = {
  onSubmit: (credentials: LoginCredentials) => any;
  isSubmitting: boolean;
  error: any;
};

export const LoginForm = ({
  onSubmit,
  isSubmitting,
  error,
}: LoginFormProps) => {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
      <h1 className="mb-3 text-center text-2xl font-semibold md:text-3xl">
        Admin Login
      </h1>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Input
        autoComplete="off"
        className="w-full"
        name="name"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        autoComplete="off"
        className="w-full"
        name="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button>{isSubmitting ? "Loading..." : "Login"}</Button>
    </form>
  );
};
