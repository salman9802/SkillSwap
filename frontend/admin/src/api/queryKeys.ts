export const queryKeys = {
  fetchAdmins: () => ["admins"],
};

export const mutationKeys = {
  activateAccount: (adminId: string) => ["admin/activate", adminId],
  deactivateAccount: (adminId: string) => ["admin/deactivate", adminId],
  changePassword: (adminId: string) => ["admin/change-password", adminId],
};
