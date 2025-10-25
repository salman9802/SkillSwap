import { useMutation } from "@tanstack/react-query";

import { login } from "./services";
import { useStore } from "@src/store/appStore";

export function useLoginMutation() {
  const { setCredentials } = useStore();

  return useMutation({
    mutationFn: login,
    onSuccess(data) {
      setCredentials(data);
    },
  });
}
