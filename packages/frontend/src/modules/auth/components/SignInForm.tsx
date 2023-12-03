import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import { FormEvent, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface SignInFormProps {
  isAuthenticated: boolean
  isLoading: boolean
  isError: boolean
  success: string
  error: string[]
  onSignIn: (email: string, password: string) => void
}

const SignInForm = ({ isError, success, error, onSignIn }: SignInFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current
    if (form) {
      const elements = form.elements
      const email = (elements.namedItem('email') as HTMLInputElement)?.value
      const password = (elements.namedItem('password') as HTMLInputElement)?.value
      onSignIn(email, password)
    }
  }

  return (
    <Container maxWidth="xs">
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
          Sign In
        </Typography>
        <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="sign-in-email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="sign-in-password"
            autoComplete="current-password"
          />
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
              bgcolor="greenyellow"
              padding="5px"
              border="solid green 1px"
              borderRadius="5px"
              my="2px"
            >
              <Typography color="white">{success}</Typography>
            </Box>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/sign-up" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignInForm
