import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../Global/AuthProvider'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import Back from '../Global/Back'

const DashboardVolunteer = () => {
    const {user} = useContext(authContext)
    const { id } = useParams()

    const [appliedEvents, setAppliedEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [stats, setStats] = useState({
       daysVolunteered: 0,
       pendingEvents: [],
    })

    // useEffect(() => {
    //         const getEvents = async (id) => {
    //             try { 
    //                 setLoading(true)
    
    //                 const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/my-applications`, {withCredentials: true})
    //                 console.log(res.data)
    //                 setAppliedEvents(res.data.applicationsOfVolunteer)
    
    //                 setLoading(false)
    //             } catch (error) {
    //                 console.log("ERROR: ",error)
    //                 setLoading(false)
    //             }
    //         }
    
    //         getEvents()
    //    }, [])

       const formatDate = (rawDate) => {
        return new Date(rawDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }
     
    const status = {
        PENDING: 'bg-yellow-500/20 text-yellow-400',
        Approved: 'bg-green-500/20 text-green-400',
        rejected: 'bg-red-500/20 text-red-400',
    }

    useEffect(() => {
       const getStats = async () => {
        const stats = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/stats`, {withCredentials: true})
         setStats(stats?.data)
       }
       getStats()
    }, [stats])

  //   useEffect(() => {
  //     if (!currentUser?._id) return

  //     // join your own room
  //     Socket.emit("join-user-room", currentUser._id)

  //     // listen for attendance update
  //     Socket.on("stats-updated", (data) => {
  //         console.log("Stats updated!", data)

  //         // update ONLY daysVolunteered — don't refetch everything
  //         setStats(prev => ({
  //             ...prev,
  //             daysVolunteered: data.daysVolunteered
  //         }))
  //     })

  //     return () => socket.off("stats-updated")

  // }, [currentUser])
    

  return (
    <div className='px-5cls px-6
     py-3 w-full min-h-screen bg-zinc-800'>
      <div className='px-15 mb-5 mt-2'><Back /></div> 
       <div className='ml-17 flex flex-col'>
        <h1 className='font-semibold text-2xl md:text-3xl '>Hi, {user?.name}</h1>
       <h1 className='font-medium text-md mt-1'> Here's what's happening with your volunteering </h1>

       <div className='mt-3 w-full grid grid-rows-1 md:grid-rows-1 md:grid-cols-3 justify-between md:flex-row px-3 py-1 gap-6 '>
         {/* <div className=' bg-zinc-700 flex flex-col justify-center p-2 py-5 rounded-2xl'> 
           <h1 className='text-md font-semibold text-zinc-400'> Upcoming events </h1>
           <h1 className='font-medium text-3xl py-1'> {stats?.} </h1>
         </div> */}
         <div className=' bg-zinc-700 flex flex-col justify-center p-2 rounded-2xl'> 
           <h1 className='text-md font-semibold text-zinc-400'> Days volunteering </h1>
           <h1 className='font-medium text-3xl py-1'> {stats?.daysVolunteered} </h1>
         </div>
         {/* <div className=' bg-zinc-700 flex flex-col justify-center p-2 rounded-2xl'> 
           <h1 className='text-md font-semibold text-zinc-400'> Applications pending </h1>
           <h1 className='font-medium text-3xl py-1'> {stats?.pendingEvents} </h1>
         </div> */}
         
       </div>

       <div className='py-2 w-full'>
          <h1 className='ml-2 font-light text-xl'>Your Applications </h1>
           <div className='mt-3 w-full grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 md:flex-row px-3 py-1 gap-5 rounded-xl'>
             {appliedEvents?.map((applications, idx) => {
                return <div className='bg-zinc-700 flex flex-col rounded-xl px-4 w-full py-3'>
                          <div className='text-xl font-semibold w-full '> {applications?.event?.title} <span className='text-sm tracking-wider font-light'>{formatDate(applications?.event?.date)}</span> </div>
                           <div className='mt-3'>
                             {applications?.event?.description} 
                           </div>
                           <div className={`mt-5 px-3 py-2 rounded-full text-sm font-medium w-fit ${status[applications?.status] || 'bg-zinc-500 text-zinc-300'}`}>{applications?.status}</div>
                       </div>
             })}  
           </div>
       </div>
       </div>
    </div>
  )
}

export default DashboardVolunteer
