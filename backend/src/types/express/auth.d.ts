import { JwtPayload } from "jsonwebtoken";

import { User } from "../../../generated/prisma";
import { SafeUser } from "../../lib/sanitize";

export interface RefreshTokenJwtPayload extends JwtPayload {
  id: string;
}

export interface AccessTokenJwtPayload extends JwtPayload {
  id: string;
  uid: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
    }
  }
}
