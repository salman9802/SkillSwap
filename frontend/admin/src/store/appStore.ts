import { create } from "zustand";

import { createAuthSlice, type AuthStore } from "@src/features/auth";

export type Store = AuthStore;

export const useStore = create<Store>((...args) => ({
  ...createAuthSlice(...args),
}));
