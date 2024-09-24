"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicRoutes = void 0;
const express_1 = require("express");
const clinic_controller_1 = require("./clinic.controller");
const router = (0, express_1.Router)();
// get all clinics
router.route('/').get(clinic_controller_1.clinicControllers.getClinics);
// export router
exports.clinicRoutes = router;
