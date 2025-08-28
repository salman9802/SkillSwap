import path from "path";

import dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "..", "..", ".env"),
});

import { PrismaClient } from "../generated/prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.$connect();

  const adminCount = await prismaClient.admin.count();
  if (adminCount !== 0) {
    console.log("Data found. Skipping seeding.");
    return;
  }

  const admins = prismaClient.$transaction([
    prismaClient.admin.create({
      data: {
        name: "John",
        password: "john123",
        role: "SUPERADMIN",
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
