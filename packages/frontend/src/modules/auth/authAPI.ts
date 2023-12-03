import { User } from '../common/interfaces/User'
import apiClient from '../common/utils/api'

const endpoint = '/auth'

const signUp = async (user: Partial<User>) => {
  return apiClient.post(`${endpoint}/sign-up`, user)
}

const signIn = (email: string, password: string) => {
  return apiClient.post(`${endpoint}/sign-in`, { email, password })
}

const signOut = () => {
  return apiClient.post(`${endpoint}/sign-out`)
}

export default {
  signUp,
  signIn,
  signOut,
}
