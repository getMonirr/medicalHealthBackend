import jwt from 'jsonwebtoken'

export const decodeToken = (token: string, secret: string) => {
  // decode token
  const decoded = jwt.verify(token, secret)

  return decoded
}
