import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Back from '../Global/Back'

const AllEvents = () => {
    const navigate = useNavigate()

    const [submittingEventId, setSubmittingEventId] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    const handleApplyEvent = async (event) => {
        try {
            setSubmittingEventId(event._id)

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/event/apply/${event._id}`, {},
                { withCredentials: true }
            )
            toast.success(res?.data?.message || "Successfully applied to event")
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Unable to Apply"
            toast.error(errMsg)
        } finally {
            setSubmittingEventId(null) // Ensures the button unlocks whether request succeeds or fails
        }
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/all-events`)
                // Fall back to [] if allEvent is missing/null so `events` is never undefined
                setEvents(response?.data?.allEvent || [])
            } catch (error) {
                console.log("ERROR: ", error.message)
                setEvents([]) // Keep events as an array even when the request fails
            } finally {
                setLoading(false)
            }
        }
        fetchEvents()
    }, [])

    return (
        <div className=' min-h-screen py-6 px-5 md:p-12 w-full text-zinc-100 bg-zinc-950 font-sans selection:bg-indigo-500/30 selection:text-indigo-200'>
            <div className='mb-6 md:mx-[]'> <Back /> </div>
            <div className='max-w-7xl mx-auto'>
                
                {/* Header Section */}
                <div className="mb-12 border-b border-zinc-900 pb-6">
                    <h1 className='text-4xl font-extrabold tracking-tight bg-linear-to-r from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text text-transparent'> 
                        Explore Events 
                    </h1>
                    <p className="text-zinc-500 text-sm mt-2 font-medium tracking-wide">
                        Discover and apply to premier volunteer opportunities.
                    </p>
                </div>

                {loading ? (
                    <div className='flex items-center justify-center min-h-75 text-zinc-500 font-medium tracking-wider animate-pulse text-sm'>
                        LOADING DISCOVERIES...
                    </div>
                 ) : events.length === 0 ? (
                    <div className='flex items-center justify-center min-h-75 text-zinc-600 border border-dashed border-zinc-900 rounded-2xl font-medium text-sm'> 
                        No scheduled events found at this time. 
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {events.map((event, idx) => {
                            const isCurrentSubmitting = submittingEventId === event._id;

                            return (
                                <div
                                    key={event._id || event.id || idx}
                                    className='group relative bg-zinc-900/20 border border-zinc-900/80 backdrop-blur-md p-6 flex flex-col justify-between hover:border-zinc-800/80 transition-all duration-500 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden'>

                                    {/* Subtle Ambient Glow on Hover */}
                                    <div className="absolute inset-0 bg-linear-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                    <div>
                                        {/* Meta Badges */}
                                        <div className="flex items-center justify-between gap-2 mb-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                                            <span className="flex items-center gap-1.5 text-zinc-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                                {event.location || "Remote"}
                                            </span>
                                            <span>{event.date? new Date(event.date).toLocaleString("en-IN", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                                //   hour: "2-digit",
                                                //   minute: "2-digit",
                                            }) : "TBD"}
                                                 
                                                <div className='justify-between flex mt-1'>
                                                  <span className=''> {event?.fromTime}</span>
                                                    -
                                                  <span className=''>{event?.toTime}</span>
                                                </div>
                                            
                                             </span>

                                            
                                        </div>

                                        {/* Title & Description */}
                                        <h2 className='text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors duration-300 mb-2'> 
                                            {event.title} 
                                        </h2>
                                        <p className='text-sm text-zinc-400 leading-relaxed font-normal mb-8 line-clamp-3' > 
                                            {event.description} 
                                        </p>
                                    </div>

                                    <button 
                                        className='w-full relative mt-auto bg-zinc-100 text-zinc-950 font-medium text-sm rounded-xl py-3 hover:bg-white active:scale-[0.98] disabled:active:scale-100 transform transition-all duration-300 cursor-pointer disabled:bg-zinc-900 disabled:text-zinc-600 disabled:border disabled:border-zinc-800/60 disabled:cursor-not-allowed shadow-lg shadow-black/10'
                                        disabled={isCurrentSubmitting}
                                        onClick={() => handleApplyEvent(event)}>

                                        <span className="flex items-center justify-center gap-2">
                                            {isCurrentSubmitting && (
                                                <svg className="animate-spin h-4 w-4 text-zinc-600" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            )}
                                            {isCurrentSubmitting ? "Processing..." : "Request Seat"}
                                        </span>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllEvents