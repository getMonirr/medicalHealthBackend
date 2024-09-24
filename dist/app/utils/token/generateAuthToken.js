"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const generateAuthToken = (data, expiresIn) => {
    return jsonwebtoken_1.default.sign(data, config_1.default.jwt_email_verify_secret, {
        expiresIn: expiresIn,
    });
};
exports.generateAuthToken = generateAuthToken;
