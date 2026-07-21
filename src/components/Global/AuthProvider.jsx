import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

// Set once globally, outside component
axios.defaults.withCredentials = true

export const authContext = createContext(null)

const AuthProvider = ({ children }) => {
   const navigate = useNavigate()
   
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)

   const verifyUserSession = async () => {
     try {
       const response = await axios.get("http://localhost:3000/api/user/verify")
       if(response.data.success){
          setUser(response.data.user)
       }
     } catch (error) {
       setUser(null)
       console.log("ERROR: ", error)
     } finally {
       setLoading(false)
     }    
   }

   useEffect(() => {
    verifyUserSession()
   }, [])

   const logout = async () => {
     try {
       await axios.post('http://localhost:3000/api/user/logout')
       toast.success("logged Out")
        navigate('/login')
     } catch (error) {
       console.log("ERROR: ", error)
       toast.error("Internal server Error")
     } finally {
       setUser(null) // ← clears user whether server call succeeds or fails
     }
   }

   return (
     <authContext.Provider value={{ user, loading, setUser, logout }}>
        {children}
     </authContext.Provider>
   )
}

export default AuthProvider