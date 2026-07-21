import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate = useNavigate()
  return (
       <div className='px-2 py-2 bg-violet-700 w-24 rounded-2xl flex justify-between items-center cursor-pointer' onClick={() => navigate(-1)}> <ArrowLeft size={18}/> Go Back 
       </div>
  )
}

export default Back
