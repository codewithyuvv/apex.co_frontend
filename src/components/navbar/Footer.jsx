import React, { useContext } from 'react'
import { authContext } from '../Global/AuthProvider'

const Footer = () => {
  const {logout} = useContext(authContext)
  return (
    <footer className='w-full bg-black text-white px-4 md:px-16 py-8'>
      <section className='cta-section max-w-7xl mx-auto'>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-[40%_35%_25%] items-center justify-between rounded-2xl'>
          
          {/* Main Heading */}
          <div className='cta-animate flex flex-col w-full'>
            <h2 className='text-2xl md:text-3xl tracking-tight font-semibold leading-tight'>
              Let's make your <br /> next event <span className='text-violet-500'>legendary.</span>
            </h2>
          </div>
          
          {/* Subtext */}
          <div className='cta-animate flex flex-col'>
            <p className='text-sm tracking-wider leading-relaxed text-zinc-400'>
              Ready to plan your next big event? Let's create something unforgettable.
            </p>
          </div>
          
          {/* Button Container */}
          <div className='cta-animate flex justify-center md:justify-end items-center w-full'>
            <button 
              className='w-full sm:w-fit bg-violet-800 py-3 px-6 rounded-2xl hover:bg-violet-600 transition-all duration-200 cursor-pointer hover:scale-[1.03] text-sm font-medium'>
              Connect with Us
            </button>

            {/* <button className='p-2 bg-cyan-800'
            onClick={logout}>
              Logout
            </button> */}
          </div>

        </div>
        
      </section>
    </footer> 
  )
}

export default Footer