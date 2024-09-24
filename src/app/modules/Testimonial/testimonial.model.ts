import mongoose, { Schema } from 'mongoose'
import { ITestimonial } from './testimonial.interface'

// Testimonial Schema
const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  review: { type: String, required: true },
  image: { type: String, required: true },
})

// Create a model using the schema
const Testimonial = mongoose.model<ITestimonial>(
  'Testimonial',
  TestimonialSchema,
)

export default Testimonial
