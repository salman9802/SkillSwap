import { api } from "@src/api/client";
import type { AuthState, LoginCredentials } from "./types";

export async function login(loginCredentials: LoginCredentials) {
  const res = await api.post("/auth/login", loginCredentials);

  return res.data as Required<AuthState>;
}
