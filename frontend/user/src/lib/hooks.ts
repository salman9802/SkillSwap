import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

import type { StoreDispatch, StoreState } from "@/features/store";
import { SERVER_URL } from "@/features/api";

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

const SOCKET_SERVER_URL = "http://localhost:" + "8080";

/** hook that manages a ref to `Socket` */
export function useSocket() {
  const socketRef = React.useRef<Socket>(undefined);

  const accessToken = useSelector(
    (store: StoreState) => store.session.accessToken,
  );

  React.useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      auth: {
        accessToken,
      },
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [accessToken]);

  return socketRef.current;
}
