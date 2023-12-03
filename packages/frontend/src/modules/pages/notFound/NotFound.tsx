import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container maxWidth="lg" component="main">
      <Box mt="4rem" textAlign="center">
        <Typography component="h2" variant="h3">
          This page does not exist.
        </Typography>
        <Button component={Link} to="/">
          Go Back
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
