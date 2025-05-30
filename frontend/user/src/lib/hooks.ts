import { useDispatch } from "react-redux";

import type { StoreDispatch } from "@/features/store";

// helper hook to avoid repeating imports and easier change & reusable
export function useStoreDispatch() {
  return useDispatch<StoreDispatch>();
}
