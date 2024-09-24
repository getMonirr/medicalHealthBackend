import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { doctorServices } from './doctor.service'

// get all doctors with specialty filter
const getDoctors = catchAsync(async (req, res) => {
  const specialty = req.query

  const doctors = await doctorServices.getDoctors(specialty)

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Doctors fetched successfully',
    data: doctors,
  })
})

// export doctor controllers
export const doctorControllers = {
  getDoctors,
}
