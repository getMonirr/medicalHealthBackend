import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { clinicServices } from './clinic.service'

// get all clinics
const getClinics = catchAsync(async (req, res) => {
  const clinics = await clinicServices.getClinics()

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clinics fetched successfully',
    data: clinics,
  })
})

// export clinic controllers
export const clinicControllers = {
  getClinics,
}
