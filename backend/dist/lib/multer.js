"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
// Set up storage location and file naming
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save files to 'uploads/' folder
    },
    filename: function (req, file, cb) {
        // Unique filename: userId-timestamp-originalname
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    },
});
// File filter to accept images only
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only images are allowed"));
    }
};
// Create upload middleware
exports.upload = (0, multer_1.default)({ storage, fileFilter });
