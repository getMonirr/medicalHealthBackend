import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_email_verify_secret: process.env.JWT_EMAIL_VERIFY_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_email_verify_expires_in: process.env.JWT_EMAIL_VERIFY_EXPIRES_IN,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  front_end_url: process.env.FRONT_END_URL,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
}
