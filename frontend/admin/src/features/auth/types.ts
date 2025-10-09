export type LoginCredentials = {
  name: string;
  password: string;
};

export type AuthState = {
  adminId?: string;
  name?: string;
  accessToken?: string;
};
