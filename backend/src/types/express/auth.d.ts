import { JwtPayload } from "jsonwebtoken";
import { User } from "../../generated/prisma";

export interface RefreshTokenJwtPayload extends JwtPayload {
  id: string;
}

export interface AccessTokenJwtPayload extends JwtPayload {
  id: string;
  uid: string;
}

export type SafeUser = Omit<User, "password">;

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
    }
  }
}
