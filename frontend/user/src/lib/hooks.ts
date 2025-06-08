import React from "react";
import { useDispatch } from "react-redux";

import type { StoreDispatch } from "@/features/store";

// helper hook to avoid repeating imports and easier change & reusable
export function useStoreDispatch() {
  return useDispatch<StoreDispatch>();
}

export function useDebounce<T>(value: T, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState<T>();

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
