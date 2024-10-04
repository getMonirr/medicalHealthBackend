import httpStatus from 'http-status'
import config from '../../config'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { decodeToken } from '../../utils/token/decodeToken'
import { paymentServices } from './payment.service'

// create client secret controller
const createClientSecret = catchAsync(async (req, res) => {
  const paymentIntent = await paymentServices.createPaymentIntent(req.body)

  if (!paymentIntent) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Payment intent not created',
      data: null,
    })
  }

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: paymentIntent,
    message: 'Payment intent created successfully',
  })
})

// make payment controller
const makePayment = catchAsync(async (req, res) => {
  const payment = await paymentServices.makePaymentToDatabase(req.body)

  if (!payment) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Payment not created',
      data: null,
    })
  }

  return sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    data: payment,
    message: 'Payment created successfully',
  })
})

// get payment controller
const getPayments = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1] as string

  const decodedToken = decodeToken(
    token,
    config.jwt_email_verify_secret as string,
  ) as { id: string }

  const payments = await paymentServices.getPayments(decodedToken.id)

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: payments,
    message: 'Payments retrieved successfully',
  })
})

export const paymentController = {
  createClientSecret,
  makePayment,
  getPayments,
}
