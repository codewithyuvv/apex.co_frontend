import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import * as Yup from "yup"
import Back from '../Global/Back'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const errorSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    age: Yup.number()
      .min(15, "Minimum age should be 15 or above")
      .required("Age is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .matches(/[A-Z]/, "Must contain one uppercase letter")
      .matches(/[a-z]/, "Must contain one lowercase letter")
      .matches(/[0-9]/, "Must contain one number")
      .matches(/[!@#$%^&.-_*]/, "Must contain one special character"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })

  // 2. Password Strength Logic
  const checkPasswordStrength = (password) => {
    if (!password) return '';
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[!@#$%^&.-_*]/.test(password)) score++

    if (score <= 2) return 'Weak'
    if (score <= 4) return 'Medium'
    return 'Strong'
  }

  // 3. Conditional Color mapping for Strength Indicator
  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Weak': return 'text-red-400';
      case 'Medium': return 'text-amber-400';
      case 'Strong': return 'text-emerald-400';
      default: return 'text-zinc-500';
    }

  }

  return (
    <div className='w-full min-h-screen flex bg-zinc-950 bg-linear-to-br from-black via-zinc-950 to-violet-950/30 px-6 md:px-12 lg:px-20 py-12 items-center justify-center text-white'>
      <div className='max-w-5xl w-full flex flex-col lg:flex-row shadow-2xl rounded-2xl overflow-hidden border border-zinc-800/50'>
        
        {/* Left branding panel */}
        <div className='bg-linear-to-b from-violet-900 to-indigo-950 hidden lg:flex flex-col lg:w-1/2 p-12 justify-center items-center text-center'>
          <h1 className='text-5xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-300'> 
            apex.co 
          </h1>
          <h2 className='mt-3 font-medium text-zinc-200 text-lg'> 
            Where volunteers meet opportunities 
          </h2>
          <div className='mt-10 space-y-3 text-sm text-zinc-400 border-t border-white/10 pt-8 w-2/3'>
            <p className='hover:text-white transition-colors'>✨ Find events</p>
            <p className='hover:text-white transition-colors'>🚀 Build experience</p>
            <p className='hover:text-white transition-colors'>🎓 Earn incentives and Certificates</p>
          </div>
        </div>

        {/* Form panel */}
        <Formik 
          validationSchema={errorSchema}
          initialValues={{
            name: '',
            email: '',
            role: 'VOLUNTEER',
            age: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={async (values, {setSubmitting, resetForm}) => {
           try {
            const { confirmPassword, ...userData } = values
            const response = await axios.post("http://localhost:3000/api/user/register", userData, {withCredentials: true})
            if(response){
              toast.success(response.data.message || "Registered successfuly")
               navigate('/login')
            } else {
              toast.error(response.data.message || "Registration incomplete")
            }
            
           } catch (error) {
             console.log("ERROR: ",error.message)
             toast.error("Internal Server error")
           }
            setSubmitting(false)
            resetForm()
          }}
        >
          {({ values }) => (
            <Form className='flex flex-col bg-zinc-900/90 backdrop-blur-md p-8 md:p-12 w-full lg:w-1/2 gap-5 justify-center'>
               <Back />
              <div className='mb-2'>
                <h2 className='text-3xl font-bold tracking-tight'>Create an account</h2>
                <p className='text-zinc-400 text-sm mt-1'>Get started with apex.co today.</p>
              </div>

              {/* Name Field */}
              <div className='flex flex-col gap-1 w-full'>
                <label className='text-xs font-semibold text-zinc-400 tracking-wider uppercase'>Full Name</label>
                <Field 
                  type="text"
                  name="name"
                  placeholder="Yuvraj Singh"
                  className='bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                />
                <ErrorMessage name='name' component='div' className='text-red-400 text-xs mt-1' />
              </div>

              {/* Email Field */}
              <div className='flex flex-col gap-1 w-full'>
                <label className='text-xs font-semibold text-zinc-400 tracking-wider uppercase'>Email Address</label>
                <Field 
                  type="email"
                  name="email"
                  placeholder="yuvraj@email.com"
                  className='bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                />
                <ErrorMessage name='email' component="div" className='text-red-400 text-xs mt-1' />
              </div>

              {/* Age Field */}
              <div className='flex flex-col gap-1 w-full'>
                <label className='text-xs font-semibold text-zinc-400 tracking-wider uppercase'>Age</label>
                <Field 
                  type="text"
                  name="age"
                  placeholder="20"
                  className='bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                />
                <ErrorMessage name='age' component="div" className='text-red-400 text-xs mt-1' />
              </div>

              {/* role Field */}
              <div className='flex flex-col gap-1 w-full'>
                <label className='text-xs font-semibold text-zinc-400 tracking-wider uppercase'>role</label>
                <Field 
                  name="role"
                  disabled
                  className='bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-zinc-950 placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                />
              </div>

              {/* Password Field */}
              <div className='flex flex-col gap-1 w-full'>
                <div className='flex justify-between items-center'>
                  <label className='text-xs font-semibold text-zinc-400 tracking-wider uppercase'>Password</label>
                  {values.password && (
                    <span className={`text-xs font-bold ${getStrengthColor(checkPasswordStrength(values.password))}`}>
                      {checkPasswordStrength(values.password)} Strength
                    </span>
                  )}
                </div>
                <Field 
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className='bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                />
                <ErrorMessage name='password' component="div" className='text-red-400 text-xs mt-1 max-w-sm' />
              </div>

              {/* Confirm Password Field */}
              <div className='flex flex-col gap-1 w-full'>
                <label className='text-xs font-semibold text-zinc-400 tracking-wider uppercase'>Confirm Password</label>
                <Field 
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className='bg-zinc-800 border border-zinc-700/60 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                />
                <ErrorMessage name='confirmPassword' component="div" className='text-red-400 text-xs mt-1' />
              </div>

              <button 
                type="submit"
                className='mt-4 w-full bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl py-3 shadow-lg shadow-indigo-950/50 transition-all active:scale-[0.98]'
              >
                Register Account
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Register
