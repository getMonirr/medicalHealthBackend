// spcecialty enum
export enum Specialty {
  Anaesthestic = 'Anaesthestic',
  Pediatric = 'Pediatric',
  Nutritionist = 'Nutritionist',
  Orthopedic = 'Orthopedic',
}

// Define the Doctor interface
export interface IDoctor extends Document {
  name: string
  specialty: Specialty
  likes: number
  experience: number
  image: string
}
