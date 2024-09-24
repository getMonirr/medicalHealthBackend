import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { testimonialServices } from './testimonial.service'

// get all testimonial controller
const getTestimonials = catchAsync(async (req, res) => {
  const testimonials = await testimonialServices.getTestimonials()

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Testimonials fetched successfully',
    data: testimonials,
  })
})

// export testimonial controllers
export const testimonialControllers = {
  getTestimonials,
}
