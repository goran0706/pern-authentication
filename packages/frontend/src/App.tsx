import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './modules/common/components/Header'

const App = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  )
}

export default App
