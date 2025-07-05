import { User, UserSession } from "../../generated/prisma";

export type SafeUser = Omit<User, "password" | "createdAt">;
export type SafeUserSession = Omit<UserSession, "createdAt">;

/** Takes an object and list of keys to remove and returns a clean object */
export function sanitize<T extends Record<string, any>>(
  obj: T,
  keysToRemove: (keyof T)[]
): Omit<T, (typeof keysToRemove)[number]> {
  const clone = { ...obj };
  for (const key of keysToRemove) {
    delete clone[key];
  }
  return clone;
}

export function sanitizeUser(user: User): SafeUser {
  return sanitize(user, ["password", "createdAt"]) as SafeUser;
}

export function sanitizeSession(userSession: UserSession): SafeUserSession {
  return sanitize(userSession, ["createdAt"]) as SafeUserSession;
}
