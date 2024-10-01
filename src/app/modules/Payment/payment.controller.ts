import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
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

export const paymentController = {
  createClientSecret,
  makePayment,
}
