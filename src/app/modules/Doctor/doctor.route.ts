import { Router } from 'express'
import { doctorControllers } from './doctor.controller'

const router = Router()

// get doctors
router.route('/').get(doctorControllers.getDoctors)

//export router
export const doctorRoutes = router
