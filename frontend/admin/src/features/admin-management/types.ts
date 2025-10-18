export type Admin = {
  name: string;
  deactivated: boolean;
  role: "SUPERADMIN" | "ADMIN";
  id: string;
  deleted: boolean;
};
