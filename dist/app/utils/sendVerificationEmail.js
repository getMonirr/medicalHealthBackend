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
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendVerificationEmail = (userEmail, token) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'Gmail',
        auth: {
            user: config_1.default.email_user,
            pass: config_1.default.email_pass,
        },
    });
    const verificationUrl = `${config_1.default.front_end_url}/auth/verify-email?token=${token}`;
    const mailOptions = {
        from: config_1.default.email_user,
        to: userEmail,
        subject: 'Email Verification',
        text: `Click on the link to verify your email: ${verificationUrl}`,
    };
    const sendEmail = yield transporter.sendMail(mailOptions);
    return sendEmail;
});
exports.sendVerificationEmail = sendVerificationEmail;
