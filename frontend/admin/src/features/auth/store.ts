import type { StateCreator } from "zustand";
import type { AuthStore } from "./types";
import { api } from "@src/api/client";
import type { Store } from "@src/types";

export const createAuthSlice: StateCreator<AuthStore, [], [], AuthStore> = (
  set,
) => ({
  adminId: undefined,
  name: undefined,
  accessToken: undefined,

  setCredentials: ({ adminId, name, accessToken }) =>
    set({ adminId, name, accessToken }),
  unsetCredentials: () =>
    set({ adminId: undefined, name: undefined, accessToken: undefined }),

  // TODO: set returned accessToken (normal axios request)
  refreshTokens: async () => {
    // const res = await api.post("/whatever")
    // return res.data.newAccessToken;
  },
});

export const authSelector = (store: Store) => ({
  adminId: store.adminId,
  name: store.name,
  accessToken: store.accessToken,
});
