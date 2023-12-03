import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../store/store'
import { AuthResponse } from '../common/interfaces/AuthResponse'
import { User } from '../common/interfaces/User'
import { ValidationError } from '../common/interfaces/ValidationError'
import authAPI from './authAPI'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  isError: boolean
  success: string
  error: string | ValidationError | ValidationError[] | undefined
  user: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  success: '',
  error: '',
  user: null,
}

export const signUp = createAsyncThunk<AuthResponse, User, { rejectValue: AuthResponse }>(
  'auth/signUp',
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await authAPI.signUp(newUser)
      const { accessToken, user } = response.data.data
      localStorage.setItem('auth', JSON.stringify({ user, accessToken }))
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
  },
)

export const signIn = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: AuthResponse }
>('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await authAPI.signIn(email, password)
    const { accessToken, user } = response.data.data
    localStorage.setItem('auth', JSON.stringify({ user, accessToken }))
    return response.data
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return rejectWithValue(error.response.data)
    }
    throw error
  }
})

export const signOut = createAsyncThunk<AuthResponse, void, { rejectValue: AuthResponse }>(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('auth')
      const response = await authAPI.signOut()
      return response.data
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data)
      }
      throw error
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // SignUp
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.isLoading = false
        state.isError = false
        state.success = action.payload.message as string
        state.error = ''
        state.user = action.payload.data.user
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthenticated = false
        state.isLoading = false
        state.isError = true
        state.success = ''
        state.error = action.payload ? action.payload.message : action.error.message
      })

      // SignIn
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.isLoading = false
        state.isError = false
        state.success = action.payload.message as string
        state.error = ''
        state.user = action.payload.data.user
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isAuthenticated = false
        state.isLoading = false
        state.isError = true
        state.success = ''
        state.error = action.payload ? action.payload.message : action.error.message
      })

      // SignOut
      .addCase(signOut.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isAuthenticated = false
        state.isLoading = false
        state.isError = false
        state.success = ''
        state.error = ''
        state.user = null
      })
      .addCase(signOut.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.error = action.payload ? action.payload.message : action.error.message
      })
  },
})

export const { setAuthenticated } = authSlice.actions

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectIsLoading = (state: RootState) => state.auth.isLoading
export const selectIsError = (state: RootState) => state.auth.isError
export const selectSuccess = (state: RootState) => state.auth.success
export const selectError = (state: RootState) => state.auth.error
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer
