// Interface for the testimonial schema
export interface ITestimonial extends Document {
  name: string
  designation: string
  rating: number
  review: string
  image: string
}
