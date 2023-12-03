import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { RootState } from '../../../store/store'
import { withAuth } from '../../common/components/withAuth'
import { User } from '../../common/interfaces/User'
import UserForm from '../components/UserForm'
import { selectUserById, updateUser } from '../usersSlice'

const UserDetailsView = () => {
  const dispatch = useAppDispatch()
  const { userId } = useParams()
  const user = useAppSelector((state: RootState) => selectUserById(state, Number(userId)))

  if (!user) {
    return null
  }

  const handleCreateOrUpdate = (fields: User) => {
    dispatch(updateUser({ ...fields, id: Number(userId) }))
  }

  return <UserForm user={user} buttonText="Update User" onCreateOrUpdate={handleCreateOrUpdate} />
}

const ProtectedUserDetailsView = withAuth(UserDetailsView)
export default ProtectedUserDetailsView
