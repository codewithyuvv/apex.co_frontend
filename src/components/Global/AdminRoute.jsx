import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { authContext } from '../Global/AuthProvider'

const AdminRoute = () => {
  const { user, loading } = useContext(authContext)

  if (loading) {
    return (
      <div className='min-h-screen w-full flex justify-center items-center bg-zinc-950 text-zinc-300'>
         <h1> Checking... </h1>
      </div>
    )
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

export default AdminRoute