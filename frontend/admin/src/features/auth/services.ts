import { api, privateApi } from "@src/api/client";
import type { AuthState, LoginCredentials } from "./types";
import { useStore } from "@src/store/appStore";

export async function login(loginCredentials: LoginCredentials) {
  const res = await api.post("/auth/login", loginCredentials);

  return res.data as Required<AuthState>;
}

export async function logout() {
  // const unsetCredentials = useStore.getState().unsetCredentials;
  const state = useStore.getState();

  await privateApi.delete("/auth/logout");

  state.unsetCredentials();
}
