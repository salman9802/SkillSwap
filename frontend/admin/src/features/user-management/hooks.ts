import { useMutation, useQuery } from "@tanstack/react-query";
import {
  activateAccount,
  changePassword,
  deactivateAccount,
  fetchUsers,
} from "./services";
import { mutationKeys, queryKeys } from "@src/api/queryKeys";

export function useFetchUsersQuery() {
  return useQuery({
    queryKey: queryKeys.fetchUsers(),
    queryFn: fetchUsers,
  });
}

export function useActivateAccountMutation(userId: string) {
  return useMutation({
    mutationKey: mutationKeys.activateUserAccount(userId),
    mutationFn: () => activateAccount(userId),
  });
}

export function useDeactivateAccountMutation(userId: string) {
  return useMutation({
    mutationKey: mutationKeys.deactivateUserAccount(userId),
    mutationFn: () => deactivateAccount(userId),
  });
}

export function useChangePassword(userId: string) {
  return useMutation({
    mutationKey: mutationKeys.changeUserPassword(userId),
    mutationFn: (newPassword?: string) => changePassword(userId, newPassword),
  });
}
