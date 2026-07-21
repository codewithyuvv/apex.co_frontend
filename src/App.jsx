import React from 'react'
import Navbar from './components/navbar/Navbar'
import { navItems } from './components/navbar/Navitems'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/navbar/Footer'
import NotFound from './components/pages/NotFound'
import ProtectedRoute from './components/Global/ProtectedRoute'
import AdminRoute from './components/Global/AdminRoute'
import { Toaster } from 'react-hot-toast'
import MainLayout from './components/Global/MainLayout'
import OrganizerRoute from './components/Global/OrganizerRoute'
// import Sidebar from './components/navbar/Sidebar'
// import { Sidebar } from 'lucide-react'

function App() {
  return (
    <div className='min-h-screen bg-zinc-950 text-white'>
      <Toaster
        position="top-right"
         toastOptions={{
         className:
         "bg-zinc-900/80 backdrop-blur-xl border border-white/10 text-white rounded-2xl shadow-2xl px-4 py-3",
       }}
      />
 
  {/* Navbar */}
   {/* <div className=''> 
     <Navbar />
   </div> */}
{/* 1. PUBLIC ROUTES */}
      <Routes>

         <Route element={<MainLayout />}>
              {navItems?.filter(item => !item.isAdmin && !item.isProtected && !item.isOrganizer)
                    .map((item, idx) => (
                      <Route key={`public-${idx}`} path={item.path} element={item.element} />
                     ))
                   }
              
      
              {/* 2. BASE PROTECTED ROUTES (Volunteers / All Authenticated) */}
                   <Route element={<ProtectedRoute />}>
                     {navItems?.filter(item => !item.isAdmin && item.isProtected && !item.isOrganizer)
                      .map((item, idx) => (
                        <Route key={`protected-${idx}`} path={item.path} element={item.element} />
                      ))
                       }
                   </Route>
      
              {/* 3. ADMIN PROTECTED ROUTES */}
                   <Route element={<AdminRoute />}>
                {navItems?.filter(item => item.isAdmin) // If it's an admin route, send it straight here
                  .map((item, idx) => (
                    
                        <Route key={`admin-${idx}`} path={item.path} element={item.element} />
                    
                  ))
                }
              </Route> 

                   <Route element={<OrganizerRoute />}>
                {navItems?.filter(item => item.isOrganizer) // If it's an organizer route, send it straight here
                  .map((item, idx) => (
                    
                        <Route key={`organizer-${idx}`} path={item.path} element={item.element} />
                    
                  ))
                }
              </Route> 
      
      
                 <Route path='*' element={<NotFound />}/>
            
      
               {/* <Footer /> */}
        </Route>  
           
     </Routes> 
    </div>
  )
}

export default App