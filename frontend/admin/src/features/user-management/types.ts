export type User = {
  name: string;
  id: string;
  email: string;
  picture: string | null;
  country: string | null;
  timezone: string | null;
  coins: number;
  lastLoginDate: Date;
  offeredSkills: string[];
  requestedSkills: string[];
};
