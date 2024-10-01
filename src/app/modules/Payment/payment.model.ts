import mongoose, { Schema } from 'mongoose'
import { IPayment, PaymentStatus } from './payment.interface'

// Create the Mongoose schema for the payment
const PaymentSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    method: { type: String, required: true },
    transactionId: { type: String, required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.Pending,
    },
    description: { type: String },
  },
  { timestamps: true },
)

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema)

export default Payment
