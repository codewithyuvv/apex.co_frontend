import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { authContext } from '../Global/AuthProvider'

const ProtectedRoute = () => {
  const { user, loading } = useContext(authContext)

  if (loading) {
    return (
      <div className='min-h-screen w-full flex justify-center items-center bg-zinc-950 text-zinc-300'>
         <h1> loading... </h1>
      </div>
    )
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default ProtectedRoute