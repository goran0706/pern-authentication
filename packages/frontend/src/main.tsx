import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import SignInView from './modules/auth/views/SignInView.tsx'
import SignUpView from './modules/auth/views/SignUpView.tsx'
import theme from './modules/common/styles/theme/theme.ts'
import Home from './modules/pages/home/Home.tsx'
import NotFound from './modules/pages/notFound/NotFound.tsx'
import ProtectedCreateUserView from './modules/users/views/CreateUserView.tsx'
import ProtectedUserDetailsView from './modules/users/views/UserDetailsView.tsx'
import ProtectedUserListView from './modules/users/views/UserListView.tsx'
import store from './store/store.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'users/create', element: <ProtectedCreateUserView /> },
      { path: 'users/:userId', element: <ProtectedUserDetailsView /> },
      { path: 'users', element: <ProtectedUserListView /> },
      { path: 'sign-in', element: <SignInView /> },
      { path: 'sign-up', element: <SignUpView /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
