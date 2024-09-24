import { Router } from 'express'
import { testimonialControllers } from './testimonial.controller'

const router = Router()

// get testimonials
router.route('/').get(testimonialControllers.getTestimonials)

// export router
export const testimonialsRoutes = router
