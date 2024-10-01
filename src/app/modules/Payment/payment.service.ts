import { Stripe } from 'stripe'
import config from '../../config'
import { IPaymentData } from './payment.interface'
import Payment from './payment.model'

const stripe = new Stripe(config.stripe_secret_key as string)

// Create a payment intent
const createPaymentIntent = async (paymentData: IPaymentData) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: paymentData.amount * 100,
    currency: 'usd',
    // payment_method_types: ['card'],
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return {
    client_secret: paymentIntent.client_secret,
  }
}

// make a payment and save it to the database
const makePaymentToDatabase = async (paymentData: IPaymentData) => {
  const payment = await Payment.create({
    amount: paymentData.amount,
    currency: paymentData.currency || 'usd',
    method: paymentData.method || 'card',
    description: paymentData.description,
    transactionId: paymentData.transactionId,
    doctorId: paymentData.doctorId,
    userId: paymentData.userId,
  })

  return payment
}

export const paymentServices = {
  createPaymentIntent,
  makePaymentToDatabase,
}
