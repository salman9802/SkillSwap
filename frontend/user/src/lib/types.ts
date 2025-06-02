export type RequestCardDataType = {
  id: number;
  requesterName: string;
  skillsOffered: string[];
  skillsRequested: string[];
  createdAt: string;
};

// user
export type User = {
  id: string;
  name: string;
  email: string;
  picture: string | undefined;
};

export type UserDetails = User & {
  country: string | null;
  timezone: string | null;
  offeredSkills: string[];
  requestedSkills: string[];
};

export type RegisterResponse = {
  user: User;
  accessToken: string;
};

export type FetchDetailsResponse = {
  user: UserDetails;
};

export type UserUpdatePayload = {
  name?: string;
  email?: string;
  password?: string;
  country?: string;
  timezone?: string;
  offeredSkills?: string[];
  requestedSkills?: string[];
};

// session
export type UserSession = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type SessionSlice = {
  isAuthenticated: boolean;
  accessToken: null | string;
  user: null | User;
  // status: 'idle' | 'loading' | 'succeeded' | 'failed';
};

export type SessionSetCredentialsPayload = Pick<
  SessionSlice,
  "user" | "accessToken"
>;

export type SessionLoginReturnType = {
  user: User;
  accessToken: string;
};

export type SessionRefreshReturnType = {
  user: User;
  accessToken: string;
};
