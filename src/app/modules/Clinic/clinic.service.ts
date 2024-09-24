import Clinic from './clinic.model'

// get all clinics
const getClinics = async () => {
  return await Clinic.find()
}

// export clinic service
export const clinicServices = {
  getClinics,
}
