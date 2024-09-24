import { Document } from 'mongoose'

// Interface for the clinic schema
export interface IClinic extends Document {
  clinic_name: string
  contact_number: string
  email: string
  location: string
  image: string
}
