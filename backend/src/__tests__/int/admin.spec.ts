import path from "path";

import dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "..", "..", "..", "..", ".env.test"),
  override: true,
});
import { execSync } from "child_process";

import request from "supertest";
import { createPrismaClient } from "../../db/client";
import { createExpressApp } from "../../server";
import { STATUS_CODES } from "../../constants/http";

const prisma = createPrismaClient();
const app = createExpressApp();

describe("Admin", () => {
  let admin: any, superadmin: any;

  beforeAll(async () => {
    // dev seeding
    execSync("npm run seed:dev", {
      stdio: "inherit",
      env: {
        ...process.env,
      },
    });

    const admins = await prisma.admin.findMany();
    superadmin = admins.filter((a) => a.role === "SUPERADMIN")[0];
    admin = admins.filter((a) => a.role === "ADMIN")[0];
  });

  test("'SUPERADMIN' and 'ADMIN' accounts were seeded", async () => {
    expect(superadmin).toBeDefined();
    expect(admin).toBeDefined();
  });

  describe("Admin Account", () => {
    test("Creating admin account requires login", async () => {
      const mockAdmin = {
        name: "Test",
        password: "test123",
      };

      const res = await request(app).post("/api/admin").send(mockAdmin);
      expect(res.statusCode).toBe(STATUS_CODES.UNAUTHORIZED);
      expect(res.body.message).toEqual("Invalid token");
    });

    test("Roles other than 'SUPERADMIN' cannot create admin account", async () => {
      const mockAdmin = {
        name: "Test",
        password: "test123",
      };
      let res;

      res = await request(app).post("/api/admin/auth/login").send(admin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.accessToken).toBeDefined();

      res = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${res.body.accessToken}`)
        .send(mockAdmin);
      expect(res.statusCode).toBe(STATUS_CODES.FORBIDDEN);
      expect(res.body.message).toEqual("Unauthorized");
    });

    test("Account can only be created by 'SUPERADMIN' role", async () => {
      const mockAdmin = {
        name: "Test",
        password: "test123",
      };
      let res;

      res = await request(app).post("/api/admin/auth/login").send(superadmin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.accessToken).toBeDefined();

      res = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${res.body.accessToken}`)
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
      const mockAdmin = {
        name: "Test",
        password: "test123",
      };
      let res;

      res = await request(app).post("/api/admin/auth/login").send(superadmin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.accessToken).toBeDefined();
      res = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${res.body.accessToken}`)
        .send(mockAdmin);

      res = await request(app).post("/api/admin/auth/login").send(mockAdmin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.accessToken).toBeDefined();
    });

    test("Admin can log out of created account", async () => {
      const mockAdmin = {
        name: "Test",
        password: "test123",
      };
      let res;

      res = await request(app).post("/api/admin/auth/login").send(mockAdmin);
      expect(res.statusCode).toBe(STATUS_CODES.CREATED);
      expect(res.body.accessToken).toBeDefined();

      res = await request(app)
        .delete("/api/admin/auth/logout")
        .set("Authorization", `Bearer ${res.body.accessToken}`);
      expect(res.statusCode).toBe(STATUS_CODES.OK);
      expect(res.body).toBeDefined();
    });

    test("Roles other than 'SUPERADMIN' cannot delete admin account", async () => {
      const mockAdmin1 = {
        name: "Test",
        password: "test123",
      };
      const mockAdmin2 = {
        name: "Test2",
        password: "test1234",
      };

      const superAdminRes = await request(app)
        .post("/api/admin/auth/login")
        .send(superadmin);
      const newAdminRes1 = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
        .send(mockAdmin1);
      const newAdminRes2 = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
        .send(mockAdmin2);

      const res = await request(app)
        .delete(`/api/admin/${newAdminRes2.body.admin.id}`)
        .set("Authorization", `Bearer ${newAdminRes1.body.accessToken}`);
      expect(res.statusCode).toBe(STATUS_CODES.FORBIDDEN);
      expect(res.body.message).toBe("Unauthorized");
    });

    test("'SUPERADMIN' can delete admin account", async () => {
      const mockAdmin = {
        name: "Test",
        password: "test123",
      };

      const superAdminRes = await request(app)
        .post("/api/admin/auth/login")
        .send(superadmin);
      const newAdminRes = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
        .send(mockAdmin);

      const res = await request(app)
        .delete(`/api/admin/${newAdminRes.body.admin.id}`)
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`);
      expect(res.statusCode).toBe(STATUS_CODES.OK);
      expect(res.body.result).toBeDefined();
      expect(res.body.result.id).toBeDefined();
    });
  });

  describe("User management", () => {
    beforeEach(async () => {
      await prisma.$transaction([
        prisma.userSession.deleteMany(),
        prisma.user.deleteMany(),
      ]);
    });

    test("Roles other than 'SUPERADMIN' cannot override user password", async () => {
      const mockAdmin = {
        name: "Test",
        password: "test123",
      };
      const mockUser = {
        email: "test@test.test",
        name: "testuser",
        password: "testuser123",
      };

      const newUserRes = await request(app)
        .post("/api/user/account")
        .send(mockUser);
      expect(newUserRes.statusCode).toBe(STATUS_CODES.CREATED);
      expect(newUserRes.body).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          user: expect.any(Object),
        })
      );

      const superAdminRes = await request(app)
        .post("/api/admin/auth/login")
        .send(superadmin);
      const newAdminRes = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
        .send(mockAdmin);

      const res = await request(app)
        .put(`/api/admin/override-password/${mockUser}`)
        .set("Authorization", `Bearer ${newAdminRes.body.accessToken}`);
      expect(res.statusCode).toBe(STATUS_CODES.FORBIDDEN);
      expect(res.body.message).toEqual("Unauthorized");
    });

    test("'SUPERADMIN' can override user password", async () => {
      const mockUser = {
        email: "test@test.test",
        name: "testuser",
        password: "testuser123",
      };

      const newUserRes = await request(app)
        .post("/api/user/account")
        .send(mockUser);
      expect(newUserRes.statusCode).toBe(STATUS_CODES.CREATED);
      expect(newUserRes.body).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
          user: expect.any(Object),
        })
      );

      const superAdminRes = await request(app)
        .post("/api/admin/auth/login")
        .send(superadmin);

      const res = await request(app)
        .put(`/api/admin/override-password/${mockUser}`)
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`);
    });
  });

  describe("Admin management", () => {
    test("Roles other than 'SUPERADMIN' can activate/deactivate accounts", async () => {
      const mockAdmin1 = {
        name: "Test",
        password: "test123",
      };
      const mockAdmin2 = {
        name: "Test2",
        password: "test1234",
      };

      const superAdminRes = await request(app)
        .post("/api/admin/auth/login")
        .send(superadmin);
      const newAdminRes1 = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
        .send(mockAdmin1);
      const newAdminRes2 = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
        .send(mockAdmin2);

      const res1 = await request(app)
        .put(`/api/admin/deactivate/${newAdminRes2.body.admin.id}`)
        .set("Authorization", `Bearer ${newAdminRes1.body.accessToken}`);
      expect(res1.statusCode).toBe(STATUS_CODES.OK);
      expect(res1.body.result).toBeDefined();
      const res2 = await request(app)
        .put(`/api/admin/activate/${newAdminRes2.body.admin.id}`)
        .set("Authorization", `Bearer ${newAdminRes1.body.accessToken}`);
      expect(res2.statusCode).toBe(STATUS_CODES.OK);
      expect(res2.body.result).toBeDefined();
    });

    test("'SUPERADMIN' can activate/deactivate accounts", async () => {
      const mockAdmin = {
        name: "Test",
        password: "test123",
      };

      const superAdminRes = await request(app)
        .post("/api/admin/auth/login")
        .send(superadmin);
      const newAdminRes = await request(app)
        .post("/api/admin")
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
        .send(mockAdmin);

      const res1 = await request(app)
        .put(`/api/admin/deactivate/${newAdminRes.body.admin.id}`)
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`);
      expect(res1.statusCode).toBe(STATUS_CODES.OK);
      expect(res1.body.result).toBeDefined();

      const res2 = await request(app)
        .put(`/api/admin/activate/${newAdminRes.body.admin.id}`)
        .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`);
      expect(res2.statusCode).toBe(STATUS_CODES.OK);
      expect(res2.body.result).toBeDefined();
    });
  });
});
