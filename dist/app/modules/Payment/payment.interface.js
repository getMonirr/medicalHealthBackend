"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = void 0;
// Enum for payment statuses
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Pending"] = "Pending";
    PaymentStatus["Completed"] = "Completed";
    PaymentStatus["Failed"] = "Failed";
    PaymentStatus["Refunded"] = "Refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
