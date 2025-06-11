import "socket.io";

import { SafeUser } from "../../lib/sanitize";

declare module "socket.io" {
  interface Socket {
    user?: SafeUser;
  }
}
