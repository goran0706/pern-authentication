import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { User } from '../../common/interfaces/User'
import {
  selectError,
  selectIsAuthenticated,
  selectIsError,
  selectIsLoading,
  selectSuccess,
  signUp,
} from '../authSlice'
import SignUpForm from '../components/SignUpForm'

const SignUpView = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isLoading = useAppSelector(selectIsLoading)
  const isError = useAppSelector(selectIsError)
  const success = useAppSelector(selectSuccess)
  const error = useAppSelector(selectError)

  const handleSubmit = async (user: User) => {
    const response = await dispatch(signUp(user))
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

  return (
    <SignUpForm
      isAuthenticated={isAuthenticated}
      isLoading={isLoading}
      isError={isError}
      success={success}
      error={errorMessage}
      onSignUp={handleSubmit}
    />
  )
}

export default SignUpView
