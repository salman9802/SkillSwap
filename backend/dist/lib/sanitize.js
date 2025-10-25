"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = sanitize;
exports.sanitizeUser = sanitizeUser;
exports.sanitizeSession = sanitizeSession;
exports.sanitizeAdmin = sanitizeAdmin;
/** Takes an object and list of keys to remove and returns a clean object */
function sanitize(obj, keysToRemove) {
    const clone = Object.assign({}, obj);
    for (const key of keysToRemove) {
        delete clone[key];
    }
    return clone;
}
function sanitizeUser(user) {
    return sanitize(user, ["password", "createdAt"]);
}
function sanitizeSession(userSession) {
    return sanitize(userSession, ["createdAt"]);
}
function sanitizeAdmin(admin) {
    return sanitize(admin, ["password"]);
}
