export const queryKeys = {
  // Admin
  fetchAdmins: () => ["admins"],

  // User
  fetchUsers: () => ["users"],
};

export const mutationKeys = {
  // Admin
  activateAccount: (adminId: string) => ["admin/activate", adminId],
  deactivateAccount: (adminId: string) => ["admin/deactivate", adminId],
  changePassword: (adminId: string) => ["admin/change-password", adminId],

  // User
  activateUserAccount: (userId: string) => ["admin/activate-user", userId],
  deactivateUserAccount: (userId: string) => ["admin/deactivate-user", userId],
  changeUserPassword: (userId: string) => [
    "admin/change-user-password",
    userId,
  ],
};
