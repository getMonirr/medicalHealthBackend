import { Model } from 'mongoose'

export interface TUser {
  email: string
  password: string
  isEmailVerified: boolean
  name: string
  verifyToken: string
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
