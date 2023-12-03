import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // or your preferred primary color
    },
    secondary: {
      main: '#ff4081', // or your preferred secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // or your preferred font
  },
})

export default theme
