import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../Global/AuthProvider'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Back from '../Global/Back'

const Attendance = () => {
    const {eventId} = useParams()
    const { user } = useContext(authContext)
    const [approvedVolt, setApprovedVolt] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      const getVolunteers = async () => {
        try {
            setLoading(true)

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/${eventId}/attendance`, {withCredentials: true})
             setApprovedVolt(res?.data?.approvedVolunteers)

             setLoading(false)

             
        } catch (error) {
            console.log("ERROR: ",error)
            toast.error("Internal Server Error")
            setLoading(false)
        }
      }

      getVolunteers()
    }, [])

    const setAtendance = async (applicantId, attendance) => {
       setLoading(true)
      try {
         const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/event/attendance/${applicantId}`, {attendance}, {withCredentials: true})
         toast.success(res?.data?.message || "marked Present")
          
      } catch (error) {
        console.log("ERROR: ",error)
        toast.error("Something went wrong")
      }
    }
    const setAbsent = async () => {

    }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
       <Back />
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-white">Attendance</h1>
    <p className="text-zinc-400 mt-2">
      Mark attendance for approved volunteers.
    </p>
  </div>

  <div className="space-y-4">
    {approvedVolt.length > 0 ? (
      approvedVolt.map((volt, idx) => (
        <div
          key={`approvedVolt-${idx}`}
          className="group flex flex-col md:flex-row md:items-center md:justify-between gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-sm p-5 transition-all duration-300 hover:border-violet-600/40 hover:bg-zinc-900"
        >
          {/* Volunteer Info */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              {volt?.applicant?.name}
            </h2>

            <p className="text-sm text-zinc-400 mt-1">
              {volt?.applicant?.email}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-400 transition-all duration-300 hover:bg-emerald-500 hover:text-white"
              onClick={() => setAtendance(volt._id, "PRESENT")}
            >
              Present
            </button>

            <button
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
              onClick={() => setAtendance(volt._id, "ABSENT")}
            >
              Absent
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="flex h-60 items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900">
        <h1 className="text-zinc-500 text-lg">
          No approved volunteers found.
        </h1>
      </div>
    )}
  </div>
 </div>
  )
}

export default Attendance
