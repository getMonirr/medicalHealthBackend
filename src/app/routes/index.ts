import { Router } from 'express'
import { clinicRoutes } from '../modules/Clinic/clinic.route'
import { doctorRoutes } from '../modules/Doctor/doctor.route'
import { testimonialsRoutes } from '../modules/Testimonial/testimonial.route'
import { UserRoutes } from '../modules/User/user.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/doctors',
    route: doctorRoutes,
  },
  {
    path: '/testimonials',
    route: testimonialsRoutes,
  },
  {
    path: '/clinics',
    route: clinicRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
