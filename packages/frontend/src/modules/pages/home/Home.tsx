import { Box, Container, Stack, Typography } from '@mui/material'

const Home = () => {
  return (
    <Container maxWidth="lg" component="main">
      <Box mt="4rem">
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Typography component="h1" variant="h4" mb="2rem">
            Welcome to the User Management App!
          </Typography>
          <Typography align="center">
            This application empowers you to efficiently handle user-related operations. With
            seamless integration to a robust API, you can perform various actions to manage your
            user base effectively.
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="center" justifyContent="center" my="4rem">
          <Typography component="h2" variant="h6">
            Supported Actions:
          </Typography>
          <Box component="ul">
            <Typography component="li">
              View Users: Explore a comprehensive list of users with details such as name, email,
              and user ID.
            </Typography>
            <Typography component="li">
              Create New Users: Easily add new users to your system by providing essential
              information like name, email, and password.
            </Typography>
            <Typography component="li">
              Update User Details: Keep user information up-to-date by modifying details such as
              name, email, or password.
            </Typography>
            <Typography component="li">
              Remove Users: Safely deactivate or delete users who are no longer part of your system.
            </Typography>
            <Typography component="li">
              User Authentication: Enable secure user authentication through features like sign-up,
              sign-in, and sign-out.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default Home
