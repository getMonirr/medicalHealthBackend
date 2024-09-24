import { z } from 'zod'

const userRegistrationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
  }),
})

// login user schema
const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
})

export const UserValidation = {
  userRegistrationSchema,
  userLoginSchema,
}
