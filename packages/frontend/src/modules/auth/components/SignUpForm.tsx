import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { FormEvent, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { User } from '../../common/interfaces/User'

interface SignUpFormProps {
  isAuthenticated: boolean
  isLoading: boolean
  isError: boolean
  success: string
  error: string[]
  onSignUp: (user: User) => void
}

const SignUpForm = ({ isError, success, error, onSignUp }: SignUpFormProps) => {
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
      onSignUp({ firstName, lastName, email, password })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" ref={formRef} noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          {isError &&
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
          )}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUpForm
