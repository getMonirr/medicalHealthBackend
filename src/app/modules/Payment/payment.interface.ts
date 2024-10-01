import { Document } from 'mongoose'

// Enum for payment statuses
export enum PaymentStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Refunded = 'Refunded',
}

// Define an interface for the Payment document
export interface IPayment extends Document {
  amount: number
  currency: string
  method: string
  status: PaymentStatus
  timestamp: Date
  description?: string
  transactionId: string
}

// Define an interface for the payment data
export interface IPaymentData {
  amount: number
  currency: string
  method: string
  description?: string
  transactionId: string
  doctorId: string
  userId: string
}
