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

// Skillswap request
export type CreateSkillswapRequestPayloadType = {
  requestedSkill: string;
  availability: { date: Date }[];
};

export type SkillswapRequestCardDataType = {
  id: string;
  requester: {
    name: string;
    offeredSkills: string[];
  };
  requestedSkill: string;
  createdAt: string;
  availability: { date: string }[];
};

export type MarketplaceFilter = {
  date?: Date;
  offeredSkills?: string[];
  requestedSkill?: string;
};

export const MarketplaceSort = {
  OLDEST_FIRST: "Oldest First",
  NEWEST_FIRST: "Newest First",
} as const;

// export type MarketplaceSortType =
//   (typeof MarketplaceSort)[keyof typeof MarketplaceSort];
export type MarketplaceSortKeyType = keyof typeof MarketplaceSort;

export type MarketplacePayloadType = {
  date?: string;
  offeredSkills?: string[];
  requestedSkill?: string;
  offeredSkillQuery?: string;
};

type SkillswapRequestRequester = {
  name: string;
  offeredSkills: string[];
  picture: string;
};

/** Type for Skillswap request object */
export type SkillswapRequest = {
  id: string;
  requestedSkill: string;
  createdAt: Date;
  availability: {
    id: string;
    date: Date;
  }[];
  requester: SkillswapRequestRequester;
};

/** Type for response from `.../request/:id` */
export type SkillswapRequestResponse = {
  // Remove availablity from `SkillswapRequest`
  request: Omit<SkillswapRequest, "availability" | "createdAt"> & {
    // Add array of <type without date> U <changed date type>
    availability: Array<
      // Type of availability array's individual element - date + changed date
      Omit<SkillswapRequest["availability"][number], "date"> & {
        date: string;
      }
    >;
    createdAt: string;
  };
  reviewScore?: number;
  canProvideSkill: boolean;
};

// Skillswap session
export type NewSkillswapSession = {
  offeredSkill: string;
  // schedule?: { date: Date };
  scheduleId: string;
};

export type CreateSkillswapSessionPayload = {
  // schedule: { date: Date };
  scheduleId: string;
  requestId: string;
  offeredSkill: string;
};
