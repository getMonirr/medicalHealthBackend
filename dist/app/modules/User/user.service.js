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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendVerificationEmail_1 = require("../../utils/sendVerificationEmail");
const decodeToken_1 = require("../../utils/token/decodeToken");
const generateAuthToken_1 = require("../../utils/token/generateAuthToken");
const user_model_1 = require("./user.model");
// register user into database
const registerUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // generate token for email verification
    const emailToken = (0, generateAuthToken_1.generateAuthToken)({ email: userData.email }, config_1.default.jwt_email_verify_expires_in);
    // add token to user
    userData.verifyToken = emailToken;
    // create new user
    const newUser = yield user_model_1.User.create(userData);
    // send email verification link to user
    yield (0, sendVerificationEmail_1.sendVerificationEmail)(userData.email, emailToken);
    // remove token and password from user
    newUser.verifyToken = '';
    newUser.password = '';
    return newUser;
});
// verify email
const verifyEmail = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    const decoded = (0, decodeToken_1.decodeToken)(token, config_1.default.jwt_email_verify_secret);
    console.log({ decoded });
    // find user by email
    const user = yield user_model_1.User.findOne({ email: decoded.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not Found');
    }
    if (user.isEmailVerified) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Already Verified');
    }
    // update user isEmailVerified field
    const updateUser = yield user_model_1.User.findByIdAndUpdate(user._id, {
        isEmailVerified: true,
    }, { new: true });
    console.log({ updateUser });
    // generate auth token
    const authToken = (0, generateAuthToken_1.generateAuthToken)({ email: user.email }, config_1.default.jwt_access_expires_in);
    return { token: authToken };
});
// login user
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // find user by email
    const user = yield user_model_1.User.findOne({ email, isEmailVerified: true }, '+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not Found');
    }
    console.log({ email, password, user });
    // check password
    const isPasswordMatch = yield user_model_1.User.isPasswordMatched(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid Password');
    }
    // generate auth token
    const authToken = (0, generateAuthToken_1.generateAuthToken)({ email: user.email }, config_1.default.jwt_access_expires_in);
    return { token: authToken };
});
// export user services
exports.UserServices = {
    registerUserIntoDB,
    verifyEmail,
    loginUser,
};
