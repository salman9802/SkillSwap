import { useMutation, useQuery } from "@tanstack/react-query";
import {
  activateAccount,
  changePassword,
  deactivateAccount,
  fetchAdmins,
} from "./services";
import { mutationKeys, queryKeys } from "@src/api/queryKeys";

export function useFetchAdminsQuery() {
  return useQuery({
    queryKey: queryKeys.fetchAdmins(),
    queryFn: fetchAdmins,
  });
}

export function useActivateAccountMutation(adminId: string) {
  return useMutation({
    mutationKey: mutationKeys.activateAccount(adminId),
    mutationFn: () => activateAccount(adminId),
  });
}

export function useDeactivateAccountMutation(adminId: string) {
  return useMutation({
    mutationKey: mutationKeys.deactivateAccount(adminId),
    mutationFn: () => deactivateAccount(adminId),
  });
}

export function useChangePassword(adminId: string) {
  return useMutation({
    mutationKey: mutationKeys.changePassword(adminId),
    mutationFn: (newPassword?: string) => changePassword(adminId, newPassword),
  });
}
