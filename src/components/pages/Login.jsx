import React, { useContext, useEffect, useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { gsap } from 'gsap'
import axios from 'axios'
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom'
import { authContext } from '../Global/AuthProvider'
import toast from 'react-hot-toast'
import AxiosInstance from '../../utils/axiosInstance'
import Spinner from '../../assets/Spinner'
const Login = () => {
   const {setUser} = useContext(authContext)
  const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

   const errorSchema = Yup.object({
    email: Yup.string().required("email is required").email("invalid email address"),
    password: Yup.string().required("password is required")
   })

    // const handleLogin = async (values, {setSubmitting, resetForm}) => {
      
    // }


  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation for the main card container
      gsap.from('.login-card', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power4.out',
      })

      // Staggered reveal for internal elements
      gsap.from('.animate-item', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef} 
      className='bg-zinc-950 flex px-6 min-h-screen items-center justify-center p-4 selection:bg-violet-500 selection:text-violet-200'
    >
      <div className='login-card max-w-4xl w-full bg-zinc-900 border border-zinc-800 backdrop-blur-md flex flex-col md:flex-row justify-between items-stretch rounded-2xl overflow-hidden shadow-2xl shadow-black/50'>
        
        <div className='hidden w-full md:w-1/2 bg-violet-950 border-b md:border-b-0 md:border-r border-zinc-800/60 p-10 md:p-16 sm:flex flex-col justify-center items-start relative overflow-hidden'>          
          <h1 className='animate-item text-4xl font-bold tracking-tight text-white mb-2'>
            Welcome back
          </h1>
          <p className='animate-item text-zinc-400 text-sm font-medium'>
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <Formik
        validationSchema={errorSchema}
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={ async (values, {setSubmitting, resetForm}) => {
             try {
                    setLoading(true)
                    setSubmitting(true)
              const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`, values, {withCredentials: true})
               if(response.data?.success && response.data){
                 const loggedInUser = response.data?.user
                 setUser(loggedInUser)

                 if(!response?.data?.success){
                   toast.error(response?.data?.message || "failed to login")
                 }
                           setLoading(false)
                 if(loggedInUser?.role === "ORGANIZER"){
                    toast.success(response?.data?.message || "Organizer logged in")
                    navigate("/dashboard")
                  } else if(loggedInUser?.role === "VOLUNTEER"){
                    toast.success(response?.data?.message || "Volunteer logged in")
                    navigate('/all-events')
                  } else if(loggedInUser?.role === "ADMIN"){
                    toast.success(response?.data?.message || "Admin logged in")
                    navigate('/admin-panel')
                  } else {
                    toast.error(response?.data?.message || "Failed to log in")
                  }
                 resetForm() 
                    setLoading(false)
               }

             } catch (error) {
              console.log("Error: ", error.response?.data || error.message)
              toast.error("Internal Server Error")
             } finally {
               setSubmitting(false)
               setLoading(false)
             }
          }}
        >
          {({isSubmitting}) => {
             return <Form className='w-full md:w-1/2 flex flex-col justify-center px-3 py-4 md:p-16 gap-6 bg-zinc-850'>
            
             <div className='animate-item w-full flex flex-col gap-2'>
               <label className='text-xs font-semibold tracking-wider text-zinc-400 uppercase pl-1'>
                 Email Address
               </label>
               <Field 
                 type='email'
                 name='email'
                 placeholder='yuvraj@email'
                 className='w-full px-4 py-3 bg-zinc-950 border border-zinc-800/80 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 cursor-pointer'
               />
               <ErrorMessage name='email' component='div' className='text-red-400 text-xs mt-1'/>
             </div>
 
             <div className='animate-item w-full flex flex-col gap-2'>
               <label className='text-xs font-semibold tracking-wider text-zinc-400 uppercase pl-1'>
                 Password
               </label>
               <Field 
                 type='password'
                 name='password'
                 placeholder='********'
                 className='w-full px-4 py-3 bg-zinc-950 border border-zinc-800/80 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 cursor-pointer'  
               />
                <ErrorMessage name='password' component='div' className='text-red-400 text-xs mt-1' />
               
             </div>
 
             <button 
               type='submit'
               disabled={isSubmitting}
              //  onClick={() => {navigate('/')}}
               className={` py-2 rounded-3xl transform transition-all bg-violet-950 cursor-pointer flex justify-center items-center${
                isSubmitting? 'bg-zinc-700 cursor-not-allowed opacity-80 ' : 'bg-violet-950 hover:bg-violet-900 rounded-3xl'
               }`}
             >
                   {loading? <Spinner size='md'/> : "login"}
             </button>
 
           </Form>
        }}
        </Formik>

      </div>
    </div>
  )
}

export default Login