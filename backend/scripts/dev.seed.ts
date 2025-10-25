import path from "path";

import dotenv from "dotenv";

if (process.env.NODE_ENV !== "test") {
  dotenv.config({
    path: path.join(__dirname, "..", "..", ".env"),
  });
}

// import { PrismaClient } from "../generated/prisma/client";

import prisma from "../src/db/client";

const prismaClient = prisma;

async function main() {
  await prismaClient.$connect();

  await prismaClient.$transaction([
    prismaClient.adminSession.deleteMany(),
    prismaClient.admin.deleteMany(),
  ]);

  const admins = await prismaClient.$transaction([
    prismaClient.admin.create({
      data: {
        name: "John",
        password: "john123",
        role: "SUPERADMIN",
      },
    }),
    prismaClient.admin.create({
      data: {
        name: "Jane",
        password: "jane123",
      },
    }),
    prismaClient.admin.create({
      data: {
        name: "Mary",
        password: "mary123",
      },
    }),
  ]);

  console.log("Seeding complete [dev]: ", admins);
}

main()
  .catch((e) => {
    console.log("Error seeding [dev]: ", e);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
