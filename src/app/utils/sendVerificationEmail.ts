import nodemailer from 'nodemailer'
import config from '../config'

export const sendVerificationEmail = async (
  userEmail: string,
  token: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.email_user,
      pass: config.email_pass,
    },
  })

  const verificationUrl = `${config.front_end_url}/auth/verify-email?token=${token}`

  const mailOptions = {
    from: config.email_user,
    to: userEmail,
    subject: 'Email Verification',
    text: `Click on the link to verify your email: ${verificationUrl}`,
  }

  const sendEmail = await transporter.sendMail(mailOptions)

  return sendEmail
}
