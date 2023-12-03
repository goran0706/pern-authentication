import { GenericResponse } from './GenericResponse'
import { User } from './User'

interface AuthData {
  user: User
  type: string
  accessToken: string
  expiresIn: string
}

export interface AuthResponse extends GenericResponse {
  data: AuthData
}
