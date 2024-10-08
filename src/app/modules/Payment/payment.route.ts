import { Router } from 'express'
import { paymentController } from './payment.controller'

const router = Router()

// get payment
router.route('/').get(paymentController.getPayments)

// create payment intent
router
  .route('/create-payment-intent')
  .post(paymentController.createClientSecret)

// make payment
router.route('/make-payment').post(paymentController.makePayment)

export const paymentRoutes = router
