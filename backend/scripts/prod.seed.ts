import path from "path";

import dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "..", "..", ".env"),
});

import prisma from "../src/db/client";

const prismaClient = prisma;

async function main() {
  await prismaClient.$connect();

  const adminCount = await prismaClient.admin.count();
  if (adminCount !== 0) {
    console.log("Data found. Skipping seeding.");
    return;
  }

  const admins = await prismaClient.$transaction([
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
