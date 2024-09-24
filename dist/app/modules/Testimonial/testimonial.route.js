"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testimonialsRoutes = void 0;
const express_1 = require("express");
const testimonial_controller_1 = require("./testimonial.controller");
const router = (0, express_1.Router)();
// get testimonials
router.route('/').get(testimonial_controller_1.testimonialControllers.getTestimonials);
// export router
exports.testimonialsRoutes = router;
