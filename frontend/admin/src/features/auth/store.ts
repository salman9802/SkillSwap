import type { StateCreator } from "zustand";
import type { AuthState, AuthStore } from "./types";
import { api } from "@src/api/client";
import type { Store } from "@src/types";

export const createAuthSlice: StateCreator<AuthStore, [], [], AuthStore> = (
  set,
) => ({
  adminId: undefined,
  name: undefined,
  accessToken: undefined,
  isSuperAdmin: false,

  setCredentials: (authState: AuthState) => set({ ...authState }),
  unsetCredentials: () =>
    set({ adminId: undefined, name: undefined, accessToken: undefined }),

  refreshTokens: async () => {
    const res = await api.get("/auth", { withCredentials: true });
    console.log("res.data", res.data);
    set({ ...res.data });
  },
});

// export const authSelector = (store: Store) => ({
//   adminId: store.adminId,
//   name: store.name,
//   accessToken: store.accessToken,
//   isSuperAdmin: store.isSuperAdmin,
// });
