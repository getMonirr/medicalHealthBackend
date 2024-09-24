import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

// register user
const registerUser = catchAsync(async (req, res) => {
  const userData = req.body

  const user = await UserServices.registerUserIntoDB(userData)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  })
})

// verify email
const verifyEmail = catchAsync(async (req, res) => {
  const { token } = req.query

  const authToken = await UserServices.verifyEmail(token as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Email verified successfully',
    data: authToken,
  })
})

// login user
const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body

  const authToken = await UserServices.loginUser(email, password)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: authToken,
  })
})

// export user controllers
export const UserControllers = {
  registerUser,
  verifyEmail,
  loginUser,
}
