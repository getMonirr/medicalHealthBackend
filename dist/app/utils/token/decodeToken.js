"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const decodeToken = (token, secret) => {
    // decode token
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    return decoded;
};
exports.decodeToken = decodeToken;
