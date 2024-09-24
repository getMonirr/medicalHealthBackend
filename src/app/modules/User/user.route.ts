import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

// register user route
router
  .route('/register')
  .post(
    validateRequest(UserValidation.userRegistrationSchema),
    UserControllers.registerUser,
  )

// verify email route
router.route('/verify-email').get(UserControllers.verifyEmail)

// login user route
router
  .route('/login')
  .post(
    validateRequest(UserValidation.userLoginSchema),
    UserControllers.loginUser,
  )

// export user routes
export const UserRoutes = router
