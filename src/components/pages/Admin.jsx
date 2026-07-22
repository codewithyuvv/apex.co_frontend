import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../Global/AuthProvider'
import axios from 'axios'
import { Delete } from 'lucide-react'
import toast from 'react-hot-toast'
import AllUsers from '../User/AllUsers'

const Admin = () => {
  const { user } = useContext(authContext)
  const [event, setEvent] = useState([])
  const [activeTab, setIsActiveTab] = useState('event')
  const [users, setUsers] = useState([])
  const [kyc, setKyc] = useState([])

  // const deleteUser = async (userId) => {
  //   if (!window.confirm("Are you sure to delete this User")) return
  //   try {
  //     const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/delete/${userId}`, {
  //       withCredentials: true
  //     })
  //     toast.success(res.data.message)
  //     setUsers(prev => prev.filter(item => item._id !== userId))
  //   } catch (error) {
  //     console.log("ERROR HERE: ", error)
  //     toast.error(error?.response?.data?.message)
  //   }
  // }

  useEffect(() => {
    const getEvents = async () => {
      // Admin oversight view — all events across all organizers, read-only
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/all-events`, { withCredentials: true })
      setEvent(res.data.allEvent)
    }
    getEvents()
  }, [])

  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/users`, { withCredentials: true })
  //     setUsers(res?.data?.users)
  //   }
  //   getAllUsers()
  // }, [])

  return (
    <div className='py-2 px-6 ml-17 flex flex-col'>
      <section className='flex flex-col'>
        <div className='flex flex-col py-2 px-4 bg-black rounded-xl'>
          <h1 className='text-2xl font-bold'> hello, {user?.name} </h1>

          <div className='flex flex-col md:flex-row justify-between mt-4'>
            <div>
              <h1 className='text-3xl tracking-wide font-semibold'>Admin Dashboard</h1>
              <p className='tracking-wider text-sm'>Oversee platform users and events</p>
            </div>

            <div className='border rounded-xl px-2 py-2 gap-4 flex mt-4 md:mt-0 justify-between'>
              <button
                className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'event' ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
                onClick={() => setIsActiveTab('event')}
              >
                All Events
              </button>
              <button
                className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'users' ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
                onClick={() => setIsActiveTab('users')}
              >
                Users
              </button>
              <button
                className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'kyc' ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
                onClick={() => setIsActiveTab('KYC')}
              >
                KYC
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='py-2 flex flex-col min-h-screen w-full bg-zinc-950 rounded'>
        <div>
          {activeTab === 'event' ? (
            <div className="w-full overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-md">
              <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                <table className="w-full min-w-200 text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800/80 text-xs font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-900/60">
                      <th className="py-4 px-6 w-20 text-center">#</th>
                      <th className="py-4 px-6">Event</th>
                      <th className="py-4 px-6">Organizer</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                    {event && event.length > 0 ? (
                      event.map((items, idx) => (
                        <tr key={items._id || idx} className="hover:bg-zinc-900/50 transition-all duration-200">
                          <td className="py-4 px-6 text-center font-mono text-xs text-zinc-500">
                            {String(idx + 1).padStart(2, '0')}
                          </td>
                          <td className="py-4 px-6 font-semibold text-zinc-100 tracking-tight">
                            {items.title || "Untitled Event"}
                          </td>
                          <td className="py-4 px-6 text-sm text-zinc-400">
                            {items.organizer?.name || "Unknown"}
                          </td>
                          <td className="py-4 px-6 text-sm text-zinc-400">
                            {items.date
                              ? new Date(items.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : "Date Unspecified"}
                          </td>
                          <td className="py-4 px-6 text-sm text-zinc-400">
                            <div className="flex items-center gap-1.5">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                              {items.location || "Remote / Online"}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-sm text-zinc-500 font-medium tracking-wide">
                          No events found on the platform yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className=''>
               <AllUsers />
            </div>
          )
           }
        </div>
      </section>
    </div>
  )
}

export default Admin