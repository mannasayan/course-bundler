import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { useSelector } from 'react-redux'

const Layout = () => {
  const {isAuthenticated,user} = useSelector(state=>state.user)

  return (
    <div>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout