import { PrismaClient } from "../../generated/prisma/client";

import { hashPassword } from "../lib/bcrypt";
import { hashPasswordMiddleware } from "../middlewares/prisma/hashPassword";

const prisma = new PrismaClient();

// doesn't work
// prisma.$extends({
//   query: {
//     user: {
//       // hash password before being saved
//       async create({ args, query }) {
//         console.log("User create extension triggered".green);
//         if (args.data.password) {
//           args.data.password = await hashPassword(args.data.password);
//         }
//         return query(args);
//       },
//       // hash password before being updated
//       async update({ args, query }) {
//         const passwordField = args.data.password;

//         if (typeof passwordField === "string") {
//           args.data.password = await hashPassword(passwordField);
//         } else if (passwordField?.set) {
//           passwordField.set = await hashPassword(passwordField.set);
//         }
//         return query(args);
//       },
//     },
//   },
// });

prisma.$use(hashPasswordMiddleware);

export default prisma;
