import httpStatus from 'http-status'
import config from '../../config'
import AppError from '../../errors/AppError'
import { sendVerificationEmail } from '../../utils/sendVerificationEmail'
import { decodeToken } from '../../utils/token/decodeToken'
import { generateAuthToken } from '../../utils/token/generateAuthToken'
import { TUser } from './user.interface'
import { User } from './user.model'

// register user into database
const registerUserIntoDB = async (userData: TUser) => {
  // generate token for email verification
  const emailToken = generateAuthToken(
    { email: userData.email },
    config.jwt_email_verify_expires_in as string,
  )

  // add token to user
  userData.verifyToken = emailToken

  // create new user
  const newUser = await User.create(userData)

  // send email verification link to user
  await sendVerificationEmail(userData.email, emailToken)

  // remove token and password from user
  newUser.verifyToken = ''
  newUser.password = ''

  return newUser
}

// verify email
const verifyEmail = async (token: string) => {
  // verify token
  const decoded = decodeToken(
    token,
    config.jwt_email_verify_secret as string,
  ) as { email: string }

  console.log({ decoded })

  // find user by email
  const user = await User.findOne({ email: decoded.email })

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not Found')
  }

  if (user.isEmailVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Already Verified')
  }

  // update user isEmailVerified field
  const updateUser = await User.findByIdAndUpdate(
    user._id,
    {
      isEmailVerified: true,
    },
    { new: true },
  )

  console.log({ updateUser })

  // generate auth token
  const authToken = generateAuthToken(
    { email: user.email, id: user._id },
    config.jwt_access_expires_in as string,
  )

  return { token: authToken }
}

// login user
const loginUser = async (email: string, password: string) => {
  // find user by email
  const user = await User.findOne({ email, isEmailVerified: true }, '+password')

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not Found')
  }

  console.log({ email, password, user })

  // check password
  const isPasswordMatch = await User.isPasswordMatched(password, user.password)

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Password')
  }

  // generate auth token
  const authToken = generateAuthToken(
    { email: user.email, id: user._id },
    config.jwt_access_expires_in as string,
  )

  return { token: authToken }
}

// export user services
export const UserServices = {
  registerUserIntoDB,
  verifyEmail,
  loginUser,
}
