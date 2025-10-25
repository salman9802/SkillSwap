import { create } from "zustand";

import { createAuthSlice } from "@src/features/auth/store";
import type { Store } from "@src/types";

export const useStore = create<Store>((...args) => ({
  ...createAuthSlice(...args),
}));
