import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../Global/AuthProvider'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import DashboardVolunteer from '../Dashboards/DashboardVolunteer'
import DashboardOrganizer from '../Dashboards/DashboardOrganizer'

const Dashboard = () => {
    const { user } = useContext(authContext)
    const { id } = useParams()

    const [appliedEvents, setAppliedEvents] = useState([])
    const [loading , setLoading] = useState(false)

    useEffect(() => {
    })

     if(loading){
        return <div className='bg-zinc-900/50 p-4 w-40 h-48 animate-pulse'>

         </div>
     }

  return (
    <div className='bg-zinc-950 min-h-screen w-full flex flex-col'>
      {user?.role === 'VOLUNTEER' ?
         (<div>
          <DashboardVolunteer />
           </div>)  
             :
          (<div>
          <DashboardOrganizer />
          </div>)   
      }
    </div>
  )
}

export default Dashboard
