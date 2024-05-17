import React from 'react'
import Login from './components/Login'

const AuthContainer = () => {
  return (
    <>
      {/* generate magic links for admins to get into app */}
      <Login />
    </>
  )
}

export default AuthContainer
