import { JwtPayload } from "jsonwebtoken";

import { SafeAdmin } from "../../lib/sanitize";

export interface AdminRefreshTokenJwtPayload extends JwtPayload {
  id: string;
}

export interface AdminAccessTokenJwtPayload extends JwtPayload {
  id: string;
  aid: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: SafeAdmin;
      validated?: {
        // validated request
        headers?: any;
        params?: any;
        query?: any;
        body?: any;
      };
      metatdata?: any; // monitoring log metadata
    }
  }
}
