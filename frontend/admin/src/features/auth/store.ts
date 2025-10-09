import type { StateCreator } from "zustand";
import type { AuthState } from "./types";
import type { Store } from "@src/store/appStore";

export type AuthStore = AuthState & {
  login: ({ adminId, name, accessToken }: Required<AuthState>) => any;
  logout: () => any;
};

export const createAuthSlice: StateCreator<AuthStore, [], [], AuthStore> = (
  set,
) => ({
  adminId: undefined,
  name: undefined,
  accessToken: undefined,

  login: ({ adminId, name, accessToken }) =>
    set({ adminId, name, accessToken }),
  logout: () =>
    set({ adminId: undefined, name: undefined, accessToken: undefined }),
});

export const authSelector = (store: Store) => ({
  adminId: store.adminId,
  name: store.name,
  accessToken: store.accessToken,
});
