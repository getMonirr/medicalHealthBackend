"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clinic_route_1 = require("../modules/Clinic/clinic.route");
const doctor_route_1 = require("../modules/Doctor/doctor.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const testimonial_route_1 = require("../modules/Testimonial/testimonial.route");
const user_route_1 = require("../modules/User/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/doctors',
        route: doctor_route_1.doctorRoutes,
    },
    {
        path: '/testimonials',
        route: testimonial_route_1.testimonialsRoutes,
    },
    {
        path: '/clinics',
        route: clinic_route_1.clinicRoutes,
    },
    {
        path: '/payments',
        route: payment_route_1.paymentRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
