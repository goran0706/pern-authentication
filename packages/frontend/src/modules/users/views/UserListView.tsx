import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { withAuth } from '../../common/components/withAuth'
import UserList from '../components/UserList'
import { fetchUsers, selectUsers } from '../usersSlice'

const UserListView = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectUsers)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Container maxWidth="lg" component="main">
      <Box mt="4rem">
        <Stack direction="row" justifyContent="space-between" mb="2rem">
          <Typography component="h2" variant="h5">
            Users List
          </Typography>
          <Button component={Link} to="create" variant="outlined">
            Create
          </Button>
        </Stack>
        <UserList users={users} />
      </Box>
    </Container>
  )
}

const ProtectedUserListView = withAuth(UserListView)
export default ProtectedUserListView
