import { Box, Button, Container, Grid, TextField } from '@mui/material'
import { FormEvent, useRef } from 'react'
import { User } from '../../common/interfaces/User'

interface UserFormProps {
  user?: User
  buttonText: string
  onCreateOrUpdate: (user: User) => void
}

const UserForm = ({ user, buttonText, onCreateOrUpdate }: UserFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current
    if (form) {
      const elements = form.elements
      const firstName = (elements.namedItem('firstName') as HTMLInputElement)?.value
      const lastName = (elements.namedItem('lastName') as HTMLInputElement)?.value
      const email = (elements.namedItem('email') as HTMLInputElement)?.value
      const password = (elements.namedItem('password') as HTMLInputElement)?.value
      onCreateOrUpdate({ firstName, lastName, email, password })
    }
  }

  return (
    <Container maxWidth="lg" component="main">
      <Box component="form" mt="4rem" ref={formRef} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              defaultValue={user?.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              defaultValue={user?.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="sign-up-email"
              label="Email Address"
              name="email"
              autoComplete="email"
              defaultValue={user?.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="sign-up-password"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>

        {/* {isError &&
          error.map((errMsg, i) => (
            <Box
              key={i}
              bgcolor="crimson"
              padding="5px"
              border="solid red 1px"
              borderRadius="5px"
              my="2px"
            >
              <Typography color="white">{errMsg}</Typography>
            </Box>
          ))}

        {success && (
          <Box
            bgcolor="green"
            padding="5px"
            border="solid lightgreen 1px"
            borderRadius="5px"
            my="2px"
          >
            <Typography color="white">{success}</Typography>
          </Box>
        )} */}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {buttonText}
        </Button>
      </Box>
    </Container>
  )
}

export default UserForm
