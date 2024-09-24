import { Router } from 'express'
import { clinicControllers } from './clinic.controller'

const router = Router()

// get all clinics
router.route('/').get(clinicControllers.getClinics)

// export router
export const clinicRoutes = router
