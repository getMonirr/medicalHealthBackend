import mongoose, { Model, Schema } from 'mongoose'
import { IDoctor, Specialty } from './doctor.interface'

// Create a new Mongoose schema for Doctor
const DoctorSchema: Schema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
      enum: Object.values(Specialty),
      default: Specialty.Anaesthestic,
    },
    likes: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Export the Mongoose model for Doctor
const Doctor: Model<IDoctor> = mongoose.model<IDoctor>('Doctor', DoctorSchema)

export default Doctor
