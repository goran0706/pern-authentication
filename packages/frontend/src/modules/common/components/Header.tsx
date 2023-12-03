import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectIsAuthenticated, selectUser, setAuthenticated, signOut } from '../../auth/authSlice'

const pages = [
  { href: '/', label: 'Home', protected: false },
  { href: 'users', label: 'Users', protected: true },
]

function Header() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}')
    if ('user' in auth) {
      dispatch(setAuthenticated(auth.user))
    }
  }, [dispatch])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElUser(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleGoToProfile = () => {
    setAnchorElUser(null)
    if (profile) navigate(`/users/${profile.id}`)
  }

  const handleSignOut = () => {
    setAnchorElUser(null)
    dispatch(signOut())
    navigate('/')
  }

  const filteredPages = pages.filter((page) => {
    if (isAuthenticated) {
      return page
    } else {
      if (page.protected) {
        return
      } else {
        return page
      }
    }
  })

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {filteredPages.map((page) => (
                <Button component={Link} to={page.href} key={page.label} sx={{ display: 'block' }}>
                  {page.label}
                </Button>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {filteredPages.map((page) => (
              <Button
                component={Link}
                to={page.href}
                key={page.label}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleGoToProfile}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button component={Link} to="sign-in" sx={{ my: 2, color: 'white', display: 'block' }}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
