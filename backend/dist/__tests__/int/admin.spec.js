"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: path_1.default.join(__dirname, "..", "..", "..", "..", ".env.test"),
    override: true,
});
const child_process_1 = require("child_process");
const supertest_1 = __importDefault(require("supertest"));
const client_1 = require("../../db/client");
const server_1 = require("../../server");
const http_1 = require("../../constants/http");
const prisma = (0, client_1.createPrismaClient)();
const app = (0, server_1.createExpressApp)();
describe("Admin", () => {
    let admin, superadmin;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // dev seeding
        (0, child_process_1.execSync)("npm run seed:dev", {
            stdio: "inherit",
            env: Object.assign({}, process.env),
        });
        const admins = yield prisma.admin.findMany();
        superadmin = admins.filter((a) => a.role === "SUPERADMIN")[0];
        admin = admins.filter((a) => a.role === "ADMIN")[0];
    }));
    test("'SUPERADMIN' and 'ADMIN' accounts were seeded", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(superadmin).toBeDefined();
        expect(admin).toBeDefined();
    }));
    describe("Admin Account", () => {
        test("Creating admin account requires login", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin = {
                name: "Test",
                password: "test123",
            };
            const res = yield (0, supertest_1.default)(app).post("/api/admin").send(mockAdmin);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.UNAUTHORIZED);
            expect(res.body.message).toEqual("Invalid token");
        }));
        test("Roles other than 'SUPERADMIN' cannot create admin account", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin = {
                name: "Test",
                password: "test123",
            };
            let res;
            res = yield (0, supertest_1.default)(app).post("/api/admin/auth/login").send(admin);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(res.body.accessToken).toBeDefined();
            res = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${res.body.accessToken}`)
                .send(mockAdmin);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.FORBIDDEN);
            expect(res.body.message).toEqual("Unauthorized");
        }));
        test("Account can only be created by 'SUPERADMIN' role", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin = {
                name: "Test",
                password: "test123",
            };
            let res;
            res = yield (0, supertest_1.default)(app).post("/api/admin/auth/login").send(superadmin);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(res.body.accessToken).toBeDefined();
            res = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${res.body.accessToken}`)
                .send(mockAdmin);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(res.body).toEqual(expect.objectContaining({
                admin: expect.any(Object),
                accessToken: expect.any(String),
            }));
        }));
        test("Admin can log into created account", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin = {
                name: "Test",
                password: "test123",
            };
            let res;
            res = yield (0, supertest_1.default)(app).post("/api/admin/auth/login").send(superadmin);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(res.body.accessToken).toBeDefined();
            res = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${res.body.accessToken}`)
                .send(mockAdmin);
            res = yield (0, supertest_1.default)(app).post("/api/admin/auth/login").send(mockAdmin);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(res.body.accessToken).toBeDefined();
        }));
        test("Admin can log out of created account", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin = {
                name: "Test",
                password: "test123",
            };
            let res;
            res = yield (0, supertest_1.default)(app).post("/api/admin/auth/login").send(mockAdmin);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(res.body.accessToken).toBeDefined();
            res = yield (0, supertest_1.default)(app)
                .delete("/api/admin/auth/logout")
                .set("Authorization", `Bearer ${res.body.accessToken}`);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.OK);
            expect(res.body).toBeDefined();
        }));
        test("Roles other than 'SUPERADMIN' cannot delete admin account", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin1 = {
                name: "Test",
                password: "test123",
            };
            const mockAdmin2 = {
                name: "Test2",
                password: "test1234",
            };
            const superAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin/auth/login")
                .send(superadmin);
            const newAdminRes1 = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
                .send(mockAdmin1);
            const newAdminRes2 = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
                .send(mockAdmin2);
            const res = yield (0, supertest_1.default)(app)
                .delete(`/api/admin/${newAdminRes2.body.admin.id}`)
                .set("Authorization", `Bearer ${newAdminRes1.body.accessToken}`);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.FORBIDDEN);
            expect(res.body.message).toBe("Unauthorized");
        }));
        test("'SUPERADMIN' can delete admin account", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin = {
                name: "Test",
                password: "test123",
            };
            const superAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin/auth/login")
                .send(superadmin);
            const newAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
                .send(mockAdmin);
            const res = yield (0, supertest_1.default)(app)
                .delete(`/api/admin/${newAdminRes.body.admin.id}`)
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.OK);
            expect(res.body.result).toBeDefined();
            expect(res.body.result.id).toBeDefined();
        }));
    });
    describe("User management", () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.$transaction([
                prisma.userSession.deleteMany(),
                prisma.user.deleteMany(),
            ]);
        }));
        test("Roles other than 'SUPERADMIN' cannot override user password", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin = {
                name: "Test",
                password: "test123",
            };
            const mockUser = {
                email: "test@test.test",
                name: "testuser",
                password: "testuser123",
            };
            const newUserRes = yield (0, supertest_1.default)(app)
                .post("/api/user/account")
                .send(mockUser);
            expect(newUserRes.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(newUserRes.body).toEqual(expect.objectContaining({
                accessToken: expect.any(String),
                user: expect.any(Object),
            }));
            const superAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin/auth/login")
                .send(superadmin);
            const newAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
                .send(mockAdmin);
            const res = yield (0, supertest_1.default)(app)
                .put(`/api/admin/override-password/${mockUser}`)
                .set("Authorization", `Bearer ${newAdminRes.body.accessToken}`);
            expect(res.statusCode).toBe(http_1.STATUS_CODES.FORBIDDEN);
            expect(res.body.message).toEqual("Unauthorized");
        }));
        test("'SUPERADMIN' can override user password", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = {
                email: "test@test.test",
                name: "testuser",
                password: "testuser123",
            };
            const newUserRes = yield (0, supertest_1.default)(app)
                .post("/api/user/account")
                .send(mockUser);
            expect(newUserRes.statusCode).toBe(http_1.STATUS_CODES.CREATED);
            expect(newUserRes.body).toEqual(expect.objectContaining({
                accessToken: expect.any(String),
                user: expect.any(Object),
            }));
            const superAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin/auth/login")
                .send(superadmin);
            const res = yield (0, supertest_1.default)(app)
                .put(`/api/admin/override-password/${mockUser}`)
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`);
        }));
    });
    describe("Admin management", () => {
        test("Roles other than 'SUPERADMIN' can activate/deactivate accounts", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin1 = {
                name: "Test",
                password: "test123",
            };
            const mockAdmin2 = {
                name: "Test2",
                password: "test1234",
            };
            const superAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin/auth/login")
                .send(superadmin);
            const newAdminRes1 = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
                .send(mockAdmin1);
            const newAdminRes2 = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
                .send(mockAdmin2);
            const res1 = yield (0, supertest_1.default)(app)
                .put(`/api/admin/deactivate/${newAdminRes2.body.admin.id}`)
                .set("Authorization", `Bearer ${newAdminRes1.body.accessToken}`);
            expect(res1.statusCode).toBe(http_1.STATUS_CODES.OK);
            expect(res1.body.result).toBeDefined();
            const res2 = yield (0, supertest_1.default)(app)
                .put(`/api/admin/activate/${newAdminRes2.body.admin.id}`)
                .set("Authorization", `Bearer ${newAdminRes1.body.accessToken}`);
            expect(res2.statusCode).toBe(http_1.STATUS_CODES.OK);
            expect(res2.body.result).toBeDefined();
        }));
        test("'SUPERADMIN' can activate/deactivate accounts", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAdmin = {
                name: "Test",
                password: "test123",
            };
            const superAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin/auth/login")
                .send(superadmin);
            const newAdminRes = yield (0, supertest_1.default)(app)
                .post("/api/admin")
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`)
                .send(mockAdmin);
            const res1 = yield (0, supertest_1.default)(app)
                .put(`/api/admin/deactivate/${newAdminRes.body.admin.id}`)
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`);
            expect(res1.statusCode).toBe(http_1.STATUS_CODES.OK);
            expect(res1.body.result).toBeDefined();
            const res2 = yield (0, supertest_1.default)(app)
                .put(`/api/admin/activate/${newAdminRes.body.admin.id}`)
                .set("Authorization", `Bearer ${superAdminRes.body.accessToken}`);
            expect(res2.statusCode).toBe(http_1.STATUS_CODES.OK);
            expect(res2.body.result).toBeDefined();
        }));
    });
});
