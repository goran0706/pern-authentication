import { useAppDispatch } from '../../../store/hooks'
import { withAuth } from '../../common/components/withAuth'
import { User } from '../../common/interfaces/User'
import UserForm from '../components/UserForm'
import { createUser } from '../usersSlice'

const CreateUserView = () => {
  const dispatch = useAppDispatch()

  const handleCreateOrUpdate = (user: User) => {
    dispatch(createUser(user))
  }

  return <UserForm buttonText="Create User" onCreateOrUpdate={handleCreateOrUpdate} />
}

const ProtectedCreateUserView = withAuth(CreateUserView)
export default ProtectedCreateUserView
