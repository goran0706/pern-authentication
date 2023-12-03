import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../store/store'
import { GenericResponse } from '../common/interfaces/GenericResponse'
import { User } from '../common/interfaces/User'
import { ValidationError } from '../common/interfaces/ValidationError'
import userAPI from './userAPI'

interface UsersState {
  isLoading: boolean
  isError: boolean
  error: string | ValidationError | ValidationError[] | undefined
  users: User[]
}

const initialState: UsersState = {
  isLoading: false,
  isError: false,
  error: '',
  users: [],
}

export const fetchUsers = createAsyncThunk<GenericResponse, void, { rejectValue: GenericResponse }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.fetchUsers()
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
  },
)

export const createUser = createAsyncThunk<GenericResponse, User, { rejectValue: GenericResponse }>(
  'users/createUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await userAPI.createUser(user)
      return response.data.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
  },
)

export const updateUser = createAsyncThunk<GenericResponse, User, { rejectValue: GenericResponse }>(
  'users/updateUser',
  async (updatedUser, { rejectWithValue }) => {
    try {
      const { id, ...fields } = updatedUser as User & { id: number }
      const response = await userAPI.updateUser(id, fields)
      return response.data.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
  },
)

export const deleteUser = createAsyncThunk<number, number, { rejectValue: GenericResponse }>(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(id)
      return id
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.error = ''
        state.users = action.payload.data as User[]
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload ? action.payload.message : action.error.message
      })

      /* CREATE */
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.error = ''
        state.users.push(action.payload.data as User)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload ? action.payload.message : action.error.message
      })

      /* UPDATE */
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const { id, ...fields } = action.payload.data as User
        const userIndex = state.users.findIndex((user) => user.id === id)
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], ...fields }
        }
        state.isLoading = false
        state.isError = false
        state.error = ''
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload ? action.payload.message : action.error.message
      })

      /* DELETE */
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userIdToRemove = action.payload
        state.users = state.users.filter((user) => user.id !== userIdToRemove)
        state.isLoading = false
        state.isError = false
        state.error = ''
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload ? action.payload.message : action.error.message
      })
  },
})

export const selectUsers = (state: RootState) => state.users.users

export const selectUserById = (state: RootState, id: number) =>
  state.users.users.find((user) => user.id === id)

export const selectUserByEmail = (state: RootState, email: string) =>
  state.users.users.find((user) => user.email === email)

export default usersSlice.reducer
