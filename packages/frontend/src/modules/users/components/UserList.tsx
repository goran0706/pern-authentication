import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'
import { User } from '../../common/interfaces/User'

interface UserListProps {
  users: User[]
}

const UserList = ({ users }: UserListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">FirstName</TableCell>
            <TableCell align="left">LastName</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="left">{user.firstName}</TableCell>
              <TableCell align="left">{user.lastName}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">
                <Button component={Link} to={`${user.id}`}>
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserList
