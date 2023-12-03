import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  selectError,
  selectIsAuthenticated,
  selectIsError,
  selectIsLoading,
  selectSuccess,
  signIn,
} from '../authSlice'
import SignInForm from '../components/SignInForm'

const SignInView = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)
  const isError = useAppSelector(selectIsError)
  const success = useAppSelector(selectSuccess)
  const error = useAppSelector(selectError)

  const handleSubmit = async (email: string, password: string) => {
    const response = await dispatch(signIn({ email, password }))
    if (response.payload?.data.accessToken) {
      navigate('/users')
    }
  }

  let errorMessage: string[] = []
  if (isError && error) {
    if (typeof error === 'string') {
      errorMessage.push(error)
    } else if (Array.isArray(error)) {
      errorMessage = error.map((obj) => obj.msg)
    } else {
      errorMessage.push(error.msg)
    }
  }

  return isAuthenticated ? (
    <Navigate to="users" />
  ) : (
    <SignInForm
      isAuthenticated={isAuthenticated}
      isLoading={isLoading}
      isError={isError}
      success={success}
      error={errorMessage}
      onSignIn={handleSubmit}
    />
  )
}

export default SignInView
