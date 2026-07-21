import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Back from '../Global/Back'

const Applications = () => {
   const navigate = useNavigate() 
    const { eventId } = useParams()

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchApplications = async () => {
        try {
            setLoading(true)

            const res = await axios.get(`http://localhost:3000/api/event/events/applications/${eventId}`,
                { withCredentials: true })

                console.log("DATA: ",res.data.getApplicants[0])
                setApplications(res?.data?.getApplicants)

        } catch (error) {
            console.log("ERROR: ",error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (applicationId, status) => {
        try {
            setLoading(true)
            const res = await axios.patch(`http://localhost:3000/api/event/all-applications/${applicationId}`, { status }, {
                withCredentials: true
            })
            console.log(res.data)
            
            // Pro Optimization: Refresh data locally so the status tags update instantly on screen
            fetchApplications()
        } catch (error) {
            console.log("ERROR: ",error)
        } finally {
             setLoading(false)
        }
    }

    useEffect(() => {
        fetchApplications()
    }, [])

    return ( 
        <div className="bg-zinc-950 min-h-screen w-full text-zinc-100 p-6 flex flex-col gap-6">
            <Back /> 
            {/* Header Area */}
            <div className="w-full bg-zinc-900/20 border border-zinc-900 p-6 rounded-2xl flex flex-col gap-1">
                <h1 className="font-bold text-3xl tracking-tight text-white">Volunteer Applications</h1>
                <p className="text-zinc-400 text-sm font-medium">Review, approve, or reject incoming volunteer submissions for this event.</p>
            </div>

            {/* Main Responsive Table Section */}
            <div className="w-full overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-md">
                <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800">
                    <table className="w-full min-w-200 text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800/80 text-xs font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-900/60">
                                <th className="py-4 px-6 w-16 text-center">#</th>
                                <th className="py-4 px-6">Applicant</th>
                                <th className="py-4 px-6">Email Address</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-right">Management Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                            {applications.length > 0 ? (
                                applications.map((items, idx) => {
                                    // Preserving your exact structural safety gate
                                    if (!items.applicant) return null;

                                    return (
                                        <tr key={items._id} className="hover:bg-zinc-900/50 transition-all duration-200">
                                            {/* Numeric Index */}
                                            <td className="py-4 px-6 text-center font-mono text-xs text-zinc-500">
                                                {String(idx + 1).padStart(2, '0')}
                                            </td>

                                            {/* Profile Name & Initial Circle */}
                                            <td className="py-4 px-6 font-semibold text-zinc-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-xs font-bold text-zinc-300 uppercase">
                                                        {items.applicant.name?.substring(0, 2) || "??"}
                                                    </div>
                                                    <span>{items.applicant.name}</span>
                                                </div>
                                            </td>

                                            {/* Email Address */}
                                            <td className="py-4 px-6 text-sm text-zinc-400 font-medium font-mono">
                                                {items.applicant.email}
                                            </td>

                                            {/* Beautiful Translucent Status Tag */}
                                            <td className="py-4 px-6">
                                                <span className={`
                                                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide
                                                    ${items.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                                                    ${items.status === 'Pending' || !items.status ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                                                    ${items.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : ''}
                                                `}>
                                                    {items.status || 'Pending'}
                                                </span>
                                            </td>

                                            {/* Decision Control Buttons */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <button 
                                                        onClick={() => updateStatus(items._id, "Approved")}
                                                        disabled={loading || items.status === "Approved"}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        onClick={() => updateStatus(items._id, "Rejected")}
                                                        disabled={loading || items.status === "Rejected"}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                /* Safe Empty State Row block */
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-sm text-zinc-500 font-medium tracking-wide">
                                        {loading ? "Fetching submissions..." : "No volunteer applications submitted yet for this event."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Applications