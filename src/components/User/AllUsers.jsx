import axios from 'axios'
import { Delete } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const AllUsers = () => {
  const navigate = useNavigate()
  const {userId} = useParams()
    const [users, setUsers] = useState([])

    useEffect( () => {
       const getAllUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/user/users`, {withCredentials: true})
             setUsers(res?.data?.users)
          } catch (error) {
            console.log("ERROR: ",error)
             toast.error
          }
       }
       getAllUsers()
    }, [])

    // const getKYCform = async (userId) => {
    //     try {
    //       // navigate(`/admin-panel/kyc/${userId}`)
    //         const res = await axios.get(`http://localhost:3000/api/user/admin-panel/kyc/${userId}`, {withCredentials: true})
    //          if(res){
    //            toast.success(res?.data?.message)
    //          } else {
    //            toast.error("Something went wrong")
    //          }
    //     } catch (error) {
    //         console.log("ERROR: ",error)
    //          toast.error("Internal Server Error")
             
    //     }
    // }
  return (
    <div>
        <div className="w-full overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-md">
              <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                <table className="w-full min-w-175 text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800/80 text-xs font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-900/60">
                      <th className="py-3.5 px-6 w-20 text-center">#</th>
                      <th className="py-3.5 px-4">Users</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
                    {users && users.length > 0 ? (
                      users.map((items, idx) => (
                        <tr key={items._id || idx} className="hover:bg-zinc-900/50 transition-all duration-200 group">
                          <td className="py-4 px-6 text-center font-mono text-xs text-zinc-500">
                            {String(idx + 1).padStart(2, '0')}
                          </td>
                          <td className="py-4 px-4 font-medium text-zinc-100">
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-zinc-800 border group border-zinc-700/50 flex items-center justify-center text-[10px] font-bold text-zinc-400 uppercase">
                                {items.name ? items.name.substring(0, 2) : "??"}
                              </div>
                              <div className='group flex flex-col justify-between  px-1'>
                              <span className=''>{items.name || "Anonymous User"} <button className='md:opacity-0 group-hover:opacity-90 group-hover:text-zinc-400 transition-all duration-200 cursor-pointer' onClick={() => {navigate(`/admin-panel/volunteer/kyc/${items._id}`)}}>See Kyc</button></span>    
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/40 capitalize">
                              {items.role || "Volunteer"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end items-center">
                              <button
                                className="p-2 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 active:scale-95 transition-all duration-150"
                                onClick={() => deleteUser(items._id)}
                                title="Delete User"
                              >
                                <Delete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-16 text-center text-sm text-zinc-500 font-medium tracking-wide">
                          No active users found.
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

export default AllUsers
