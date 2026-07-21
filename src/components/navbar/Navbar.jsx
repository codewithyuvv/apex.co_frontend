import React, { useContext, useEffect, useRef, useState } from "react";
import { navItems } from "./Navitems";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Global/AuthProvider";
import { ArrowLeft, Power, PowerIcon } from "lucide-react";

const Navbar = () => {
   const navigate = useNavigate()

  const {user, loading, logout} = useContext(authContext)
  const [collapsed, setCollapsed] = useState(true);
  const [ isOpen, setIsOpen ] = useState(false)
  const lastScroll = useRef(0);

  // if(loading) return null
  const isLoggedIn = !!user
  const isAdmin = user?.role === 'ADMIN'
  const isOrganizer = user?.role ==='ORGANIZER'

  const visibleItems = navItems.filter((item) => {
    if(!item.name) return false
    if(item.isAdmin) return isAdmin
    if(item.isOrganizer) return isOrganizer
    if(item.isProtected) return isLoggedIn
    if(isLoggedIn && (item.path === '/login' || item.path === '/register/organizer' || item.path === '/register/volunteer')) return false

    return true
  })

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (
        currentScrollY > lastScroll.current &&
        currentScrollY > 0
      ) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }

      lastScroll.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <nav
       className={`z-50 flex flex-col fixed left-0 top-0 h-screen
        backdrop-blur-md border-r border-zinc-800/60
       transition-all duration-300 ease-out py-4 
       ${collapsed ? "w-16 px-2 bg-zinc-800/90" : "w-35 px-4"}`}
    >
  {/* Logo */}
  <div className={`flex  items-center mb-8 ${collapsed ? "justify-center" : "px-2"}`}>
    <h1 className="text-xl font-bold text-white cursor-pointer" onClick={() => navigate('/')} onDoubleClick={() => setCollapsed(true)}>
      {collapsed ? "A" : "apex.co"}
    </h1>
    <div className={`flex w-full mt-2  ml-5 cursor-pointer ${collapsed? 'hidden':'block'}`}> <ArrowLeft className="flex" size={17} onClick={() => setCollapsed(true)}/> </div>
  </div>

  {/* Nav links */}
  <div className="flex flex-col gap-1 flex-1" >
    {visibleItems.map((route, idx) => {
      const isActive = window.location.pathname === route.path; // see note below

    if(route?.children){
        return <div className="group"> 
         <div className={`flex  gap-2.5 rounded-lg py-2.5 cursor-pointer items-center
               ${collapsed ? "justify-center px-0" : "px-3 justify-center"}
               text-zinc-400 hover:bg-zinc-800 hover:text-white`}
               >
                {route.icon && <route.icon size={20} className="shrink-0"/> }
                {!collapsed && <span className="">{route.name}</span>}

          </div>
          
           <div className=" flex flex-col top-0 backdrop-blur-xl md:hidden group-hover:block rounded-lg shadow-lg">
             {route?.children?.map((item, idx) => {
               return <NavLink
               className={`block md: md:py-2 text-purple-800 hover:bg-zinc-800 hover:text-white rounded-lg self-center-safe ${collapsed ? 'text-xs' : 'text-sm px-5'}`} 
               to={item.path}
               key={`children-${idx}`}
               >
                  {item?.name}
               </NavLink>
             })}
           </div>
        </div>
    } else {
        return (
          <NavLink
            key={`Navlinks-${idx}`}
            to={route.path}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium
               transition-colors duration-200
               ${collapsed ? "justify-center px-0" : "px-3"}
               ${isActive
                 ? "bg-violet-800/10 text-violet-700"
                 : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`
            }
          >
            {route.icon && <route.icon size={20} className="shrink-0" />}
            {!collapsed && <span className="truncate">{route.name}</span>}
          </NavLink>
        );
      }     
    })}
  </div>

  {/* User / logout */}
  {isLoggedIn && (
    <div className={`flex items-center gap-2 pt-4 border-t border-zinc-800/60 ${collapsed ? "justify-center" : "px-2"}`}>
      <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-semibold shrink-0 cursor-pointer"
      onClick={() => navigate('/user')}>
        <img 
        className="profile h-full w-full rounded-2xl object-cover"
        src={user?.profileImage}/>
      </div>
      {!collapsed && (
        <span className="text-sm text-zinc-300 truncate flex-1 cursor-pointer"
        onClick={() => navigate('/user')}>{user?.name}</span>
      )}
      <Power
        className="text-zinc-500 hover:text-red-400 cursor-pointer shrink-0 transition-colors"
        size={17}
        onClick={logout}
      />
    </div>
  )}
</nav>
    </div>
  );
};

export default Navbar;
