import path from "path";

import dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "..", "..", "..", "..", ".env.test"),
  override: true,
});
import { execSync } from "child_process";

import express from "express";
import request from "supertest";
import { createPrismaClient } from "../../db/client";
import { createExpressApp } from "../../server";
import { STATUS_CODES } from "../../constants/http";

const prisma = createPrismaClient();
const app = createExpressApp();

describe("Admin", () => {
  let accessToken: string,
    admin: { name: string; password: string },
    superadmin: { name: string; password: string };

  beforeAll(async () => {
    // dev seeding
    execSync("npm run seed:dev", {
      stdio: "inherit",
      env: {
        ...process.env,
      },
    });
  });

  test("'SUPERADMIN' and 'ADMIN' accounts were seeded", async () => {
    const admins = await prisma.admin.findMany();
    superadmin = admins.filter((a) => a.role === "SUPERADMIN")[0];
    admin = admins.filter((a) => a.role === "ADMIN")[0];

    expect(superadmin).toBeDefined();
    expect(admin).toBeDefined();
  });

  describe("Admin Account", () => {
    const mockAdmin = {
      name: "Test",
      password: "test123",
    };

    test("Creating admin account requires login", async () => {
      const res = await request(app).post("/api/admin").send(mockAdmin);
      expect(res.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
      expect(res.body.message).toEqual("Invalid token");
    });

    test("Roles other than 'SUPERADMIN' cannot create admin account", async () => {
      let res;
      res = await request(app).post("/api/admin/auth/login").send(admin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.accessToken).toBeDefined();
      accessToken = res.body.accessToken;

      res = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(mockAdmin);
      expect(res.statusCode).toBe(STATUS_CODES.FORBIDDEN);
      expect(res.body.message).toEqual("Unauthorized");
    });

    test("Account can only be created by 'SUPERADMIN' role", async () => {
      let res;
      res = await request(app).post("/api/admin/auth/login").send(superadmin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.accessToken).toBeDefined();
      accessToken = res.body.accessToken;

      res = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(mockAdmin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body).toEqual(
        expect.objectContaining({
          admin: expect.any(Object),
          accessToken: expect.any(String),
        })
      );
    });

    test("Admin can log into created account", async () => {
      const res = await request(app)
        .post("/api/admin/auth/login")
        .send(mockAdmin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.accessToken).toBeDefined();
      accessToken = res.body.accessToken;
    });

    test("Admin can log out of created account", async () => {
      const res = await request(app)
        .delete("/api/admin/auth/logout")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(res.statusCode).toBe(STATUS_CODES.OK);
      expect(res.body).toBeDefined();
    });
  });
});
