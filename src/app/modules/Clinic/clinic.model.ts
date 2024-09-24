import mongoose, { Schema } from 'mongoose'
import { IClinic } from './clinic.interface'

// Clinic Schema
const ClinicSchema: Schema = new Schema({
  clinic_name: { type: String, required: true },
  contact_number: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
})

// Create a model using the schema
const Clinic = mongoose.model<IClinic>('Clinic', ClinicSchema)

export default Clinic
