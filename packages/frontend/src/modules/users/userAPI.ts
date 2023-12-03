import { User } from '../common/interfaces/User'
import apiClient from '../common/utils/api'
import setAxiosConfig from '../common/utils/axiosRequestConfig'

const usersUrl = '/api/v1/users'
const config = setAxiosConfig()

const fetchUsers = () => apiClient.get(usersUrl, config)

const createUser = (user: User) => apiClient.post(usersUrl, user, config)

const updateUser = (id: number, user: Partial<User>) =>
  apiClient.put(`${usersUrl}/${id}`, user, config)

const deleteUser = (id: number) => apiClient.post(`${usersUrl}/${id}`, config)

export default { fetchUsers, createUser, updateUser, deleteUser }
