import { privateApi } from "@src/api/client";
import type { User } from "./types";
import { STATUS_CODES } from "@src/constants/http";

export async function fetchUsers(): Promise<User[]> {
  const res = await privateApi("/users");
  return res.data.users;
}

export async function activateAccount(userId: string): Promise<Boolean> {
  const res = await privateApi.put(`/activate/${userId}`);
  return res.status === STATUS_CODES.OK;
}

export async function deactivateAccount(userId: string) {
  const res = await privateApi.put(`/deactivate/${userId}`);
  return res.status === STATUS_CODES.OK;
}

export async function changePassword(userId: string, newPassword?: string) {
  const res = await privateApi.put(`/override-admin-password/${userId}`, {
    newPassword,
  });
  return res.status === STATUS_CODES.OK;
}
