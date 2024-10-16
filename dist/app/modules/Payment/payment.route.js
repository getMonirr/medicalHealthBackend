"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
// get payment
router.route('/').get(payment_controller_1.paymentController.getPayments);
// create payment intent
router
    .route('/create-payment-intent')
    .post(payment_controller_1.paymentController.createClientSecret);
// make payment
router.route('/make-payment').post(payment_controller_1.paymentController.makePayment);
exports.paymentRoutes = router;
