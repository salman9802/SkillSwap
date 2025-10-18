import { privateApi } from "@src/api/client";
import type { Admin } from "./types";
import { STATUS_CODES } from "@src/constants/http";

export async function fetchAdmins(): Promise<Admin[]> {
  const res = await privateApi("/");
  return res.data.admins;
}

export async function activateAccount(adminId: string): Promise<Boolean> {
  const res = await privateApi.put(`/activate/${adminId}`);
  return res.status === STATUS_CODES.OK;
}

export async function deactivateAccount(adminId: string) {
  const res = await privateApi.put(`/deactivate/${adminId}`);
  return res.status === STATUS_CODES.OK;
}

export async function changePassword(adminId: string, newPassword?: string) {
  const res = await privateApi.put(`/override-admin-password/${adminId}`, {
    newPassword,
  });
  return res.status === STATUS_CODES.OK;
}
