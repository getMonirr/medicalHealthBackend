import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import config from '../../config'

interface IAuthToken {
  email: string
  id?: Types.ObjectId
}

export const generateAuthToken = (data: IAuthToken, expiresIn: string) => {
  return jwt.sign(data, config.jwt_email_verify_secret as string, {
    expiresIn: expiresIn,
  })
}
