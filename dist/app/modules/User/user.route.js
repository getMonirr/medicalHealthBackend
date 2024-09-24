"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
// register user route
router
    .route('/register')
    .post((0, validateRequest_1.default)(user_validation_1.UserValidation.userRegistrationSchema), user_controller_1.UserControllers.registerUser);
// verify email route
router.route('/verify-email').get(user_controller_1.UserControllers.verifyEmail);
// login user route
router
    .route('/login')
    .post((0, validateRequest_1.default)(user_validation_1.UserValidation.userLoginSchema), user_controller_1.UserControllers.loginUser);
// export user routes
exports.UserRoutes = router;
