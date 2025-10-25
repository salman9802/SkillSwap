export type LoginCredentials = {
  name: string;
  password: string;
};

export type AuthState = {
  adminId?: string;
  name?: string;
  accessToken?: string;
  isSuperAdmin: boolean;
};

export type AuthStore = AuthState & {
  setCredentials: ({ adminId, name, accessToken }: Required<AuthState>) => any;
  unsetCredentials: () => any;
  refreshTokens: () => any;
};
