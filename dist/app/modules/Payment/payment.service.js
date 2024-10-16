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
exports.paymentServices = void 0;
const stripe_1 = require("stripe");
const config_1 = __importDefault(require("../../config"));
const payment_model_1 = __importDefault(require("./payment.model"));
const stripe = new stripe_1.Stripe(config_1.default.stripe_secret_key);
// Create a payment intent
const createPaymentIntent = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: paymentData.amount * 100,
        currency: 'usd',
        // payment_method_types: ['card'],
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return {
        client_secret: paymentIntent.client_secret,
    };
});
// make a payment and save it to the database
const makePaymentToDatabase = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield payment_model_1.default.create({
        amount: paymentData.amount,
        currency: paymentData.currency || 'usd',
        method: paymentData.method || 'card',
        description: paymentData.description,
        transactionId: paymentData.transactionId,
        doctorId: paymentData.doctorId,
        userId: paymentData.userId,
    });
    return payment;
});
// get payment details
const getPayments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield payment_model_1.default.find({
        userId: id,
    }).populate('doctorId');
    return payments;
});
exports.paymentServices = {
    createPaymentIntent,
    makePaymentToDatabase,
    getPayments,
};
