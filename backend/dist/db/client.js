"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../../generated/prisma/client");
const hashPassword_1 = require("../middlewares/prisma/hashPassword");
const prisma = new client_1.PrismaClient();
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
prisma.$use(hashPassword_1.hashPasswordMiddleware);
exports.default = prisma;
