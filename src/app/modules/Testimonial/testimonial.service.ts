import Testimonial from './testimonial.model'

// get all testimonials
const getTestimonials = async () => {
  return await Testimonial.find()
}

// export testimonial service
export const testimonialServices = {
  getTestimonials,
}
