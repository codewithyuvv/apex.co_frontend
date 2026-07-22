import React, { useContext, useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, Users, Calendar, Clock, PenBox, Delete } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../Global/AuthProvider'
import axios from 'axios'
import toast from 'react-hot-toast'



const statusStyles = {
    pending: 'bg-amber-500/15 text-amber-400',
    approved: 'bg-emerald-500/15 text-emerald-400',
    rejected: 'bg-red-500/15 text-red-400',
}

const DashboardOrganizer = () => {
    const navigate = useNavigate()

     const { user } = useContext(authContext)
     const [event, setEvent] = useState([])
     const [activeTab, setIsActiveTab] = useState('event')
     const [users, setUsers] = useState('users')
     
    // const [events] = useState(sampleEvents)
    // const [applications] = useState(sampleApplications)

    const deleteEvent = async (eventId) => {    
        if(!window.confirm("Are you sure, you want to delete this event")) return
          try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/event/events/${eventId}`, {
              withCredentials: true
            })
    
            toast.success(res.data.message)
            setEvent(prev => prev.filter(item => item._id !== eventId))
          } catch (error) {
            console.log("ERROR HERE: ",error)
            const errMessage = error?.response?.data?.message
            toast.error(errMessage)
          }
    
      }
    
      const handleUpdate = async(eventId) => {
        // setSelectEventID(eventId)
        navigate(`/dashboard/update-event/${eventId}`)
      }
    
      useEffect(() => {
        const getEvents = async () => {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/my-events`, {withCredentials: true})
           setEvent(res.data.myEvents)
        }
        getEvents()
      }, [])
    
      // useEffect(() => {
      //   const getAllUsers = async () => {
      //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/users`)
      //       setUsers(res.data.users)
      //      ('Event', res.data)
      //   }
      //   getAllUsers()
      // }, [])

    return (
        <div className='py-2 px-3 flex flex-col ml-19'>
        <section className='flex flex-col '>
          <div className='flex flex-col py-2 px-4 bg-black rounded-xl '>
            <h1 className='text-2xl font-bold'> hello, {user?.name} </h1>
  
            <div className='flex flex-col md:flex-row justify-between mt-4'>
              <div>
                <h1 className='text-3xl tracking-wide font-semibold'>Organizer's Dashboard</h1>
                <p className='tracking-wider text-sm '>Manage events and approve Volunteers </p>
              </div>
               
  
              <div className='border rounded-xl px-2 py-2 gap-4 flex mt-4 md:mt-0 justify-between'>
                <button className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                       activeTab === 'event'? 'bg-violet-600 text-white'      
                               : 'bg-zinc-800 text-zinc-400 hover:text-white' 
                        }`}
                  onClick={() => setIsActiveTab('event')}
                   >Event Management</button>  
              
              </div>  

            </div>
            <button className='justify-center items-center flex py-1 px-3 self-end bg-violet-800 rounded mt-2 cursor-pointer     gap-1'
            onClick={() => {navigate('/dashboard/create-event')}}
            >
                <Plus size={19}/> Event
              </button>
              
          </div>
        </section>
  
        <section className='py-2 flx flex-col min-h-screen w-full bg-zinc-950 rounded'>
          <div className=''>
             {activeTab === 'event'? (
                 <div className="w-full overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-md">
      
                 <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                   <table className="w-full min-w-200 text-left border-collapse">
                     <thead>
                       <tr className="border-b border-zinc-800/80 text-xs font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-900/60">
                         <th className="py-4 px-6 w-20 text-center">#</th>
                         <th className="py-4 px-6">Events</th>
                         <th className="py-4 px-6">Date</th>
                         <th className="py-4 px-6">Location</th>
                         <th className="py-4 px-6 text-right">Actions</th>
                       </tr>
                     </thead>
           
                     <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                       {event && event.length > 0 ? (
                         event.map((items, idx) => {
                           return (
                             <tr 
                               key={items._id || idx} 
                               className="hover:bg-zinc-900/50 transition-all duration-200 group"
                             >
                               <td className="py-4 px-6 text-center font-mono text-xs text-zinc-500">
                                 {String(idx + 1).padStart(2, '0')}
                               </td>
           
                               <td className="py-4 px-6 font-semibold text-zinc-100 group tracking-tight flex flex-col">                             
                                 {items?.title || "Untitled Event"}
                                 <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 justify-between gap-10 flex mt-2'>
                                     <button className='text-zinc-500 cursor-pointer hover:text-zinc-300' 
                                     onClick={() => {navigate(`/events/applications/${items._id}`)}}> See Applications </button>

                                     <button className='text-zinc-500 cursor-pointer hover:text-zinc-300' 
                                     onClick={() => {navigate(`/${items._id}/attendance`)}}> mark attendance </button>
                                 </div>
                               </td>
           
                               <td className="py-4 px-6 text-sm text-zinc-400">
                                 {items.date? new Date(items.date).toLocaleDateString('en-US', {
                                   month: 'short',
                                   day: 'numeric',
                                   year: 'numeric'
                                 }) : "Date Unspecified"}
                               </td>
           
                               <td className="py-4 px-6 text-sm text-zinc-400">
                                 <div className="flex items-center gap-1.5">
                                   <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                                   {items.location || "Remote / Online"}
                                 </div>
                               </td>
           
                               <td className="py-4 px-6 text-right">
                                 <div className="flex justify-end items-center gap-1">
                                   <button 
                                     onClick={() => handleUpdate(items._id)}
                                     className="p-2 rounded-lg text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 active:scale-95 transition-all duration-150"
                                     title="Edit Event"
                                   >
                                     <PenBox />
                                   </button>
                                   
                                   <button 
                                     onClick={() => deleteEvent(items._id)}
                                     className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 active:scale-95 transition-all duration-150"
                                     title="Delete Event"
                                   >
                                     <Delete />
                                   </button>
                                 </div>
                               </td>
                             </tr>
                           );
                         })
                       ) : (
                         <tr>
                           <td colSpan={5} className="py-16 text-center text-sm text-zinc-500 font-medium tracking-wide">
                             No managed events found. Create one to get started.
                           </td>
                         </tr>
                       )}
                     </tbody>
                   </table>
                 </div>
               </div>
             ) : (
                <div>
                    
                </div>
             )
            }
          </div>
        </section>
      </div>
    )
}

export default DashboardOrganizer