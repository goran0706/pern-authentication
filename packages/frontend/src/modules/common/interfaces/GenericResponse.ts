import { ValidationError } from './ValidationError'

export interface GenericResponse {
  success: boolean
  error: boolean
  data: unknown
  message: string | ValidationError | ValidationError[]
}
