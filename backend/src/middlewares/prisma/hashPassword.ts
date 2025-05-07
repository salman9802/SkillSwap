import { Prisma } from "../../generated/prisma";
import { hashPassword } from "../../lib/bcrypt";

/** Prisma middleware to hash password before being saved / updated */
export const hashPasswordMiddleware: Prisma.Middleware = async (
  params,
  next
) => {
  if (
    params.model === "User" &&
    (params.action === "create" || params.action === "update")
  ) {
    const password = params.args.data.password;
    if (password) {
      const hashedPassword = await hashPassword(password);
      params.args.data.password = hashedPassword;
    }
  }

  return next(params);
};
