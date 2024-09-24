import Doctor from './doctor.model'

// get doctors with specialty filter
const getDoctors = async (specialty: unknown) => {
  if (specialty === 'All') {
    return await Doctor.find().limit(6)
  } else if (specialty) {
    return await Doctor.find({ specialty }).limit(6)
  } else {
    return await Doctor.find().limit(6)
  }
}

// export doctor service
export const doctorServices = {
  getDoctors,
}
