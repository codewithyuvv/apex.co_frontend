// import React, { useContext, useEffect, useRef, useState } from "react";
// import { navItems } from "./Navitems";
// import { Navigate, NavLink, useNavigate } from "react-router-dom";
// import { authContext } from "../Global/AuthProvider";
// import { ArrowLeft, Power, PowerIcon } from "lucide-react";

// const Navbar = () => {
//    const navigate = useNavigate()

//   const {user, loading, logout} = useContext(authContext)
//   const [collapsed, setCollapsed] = useState(true);
//   const [ isOpen, setIsOpen ] = useState(false)
//   const lastScroll = useRef(0);

//   // if(loading) return null
//   const isLoggedIn = !!user
//   const isAdmin = user?.role === 'ADMIN'
//   const isOrganizer = user?.role ==='ORGANIZER'

//   const visibleItems = navItems.filter((item) => {
//     if(!item.name) return false
//     if(item.isAdmin) return isAdmin
//     if(item.isOrganizer) return isOrganizer
//     if(item.isProtected) return isLoggedIn
//     if(isLoggedIn && (item.path === '/login' || item.path === 'register')) return false

//     return true
//   })

//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     const currentScrollY = window.scrollY;

//   //     if (
//   //       currentScrollY > lastScroll.current &&
//   //       currentScrollY > 0
//   //     ) {
//   //       setCollapsed(true);
//   //     } else {
//   //       setCollapsed(false);
//   //     }

//   //     lastScroll.current = currentScrollY;
//   //   };

//   //   window.addEventListener("scroll", handleScroll);

//   //   return () => {
//   //     window.removeEventListener("scroll", handleScroll);
//   //   };
//   // }, []);

//   return (
//     <div className="">
//       <nav
//        className={`z-50 flex flex-col fixed left-0 top-0 h-screen
//         backdrop-blur-md border-r border-zinc-800/60
//        transition-all duration-300 ease-out py-4 
//        ${collapsed ? "w-16 px-2 bg-zinc-800/90" : "w-35 px-4"}`}
//     >
//   {/* Logo */}
//   <div className={`flex  items-center mb-8 ${collapsed ? "justify-center" : "px-2"}`}>
//     <h1 className="text-xl font-bold text-white cursor-pointer" onClick={() => navigate('/')} onDoubleClick={() => setCollapsed(true)}>
//       {collapsed ? "A" : "apex.co"}
//     </h1>
//     <div className={`flex w-full mt-2  ml-5 cursor-pointer ${collapsed? 'hidden':'block'}`}> <ArrowLeft className="flex" size={17} onClick={() => setCollapsed(true)}/> </div>
//   </div>

//   {/* Nav links */}
//   <div className="flex flex-col gap-1 flex-1" >
//     {visibleItems.map((route, idx) => {
//       const isActive = window.location.pathname === route.path; // see note below

//     if(route?.children){
//         return <div className="group"> 
//          <div className={`flex  gap-2.5 rounded-lg py-2.5 cursor-pointer items-center
//                ${collapsed ? "justify-center px-0" : "px-3 justify-center"}
//                text-zinc-400 hover:bg-zinc-800 hover:text-white`}
//                >
//                 {route.icon && <route.icon size={20} className="shrink-0"/> }
//                 {!collapsed && <span className="">{route.name}</span>}

//           </div>
          
//            <div className=" flex flex-col top-0 backdrop-blur-xl md:hidden group-hover:block rounded-lg shadow-lg">
//              {route?.children?.map((item, idx) => {
//                return <NavLink
//                className={`block md: md:py-2 text-purple-800 hover:bg-zinc-800 hover:text-white rounded-lg self-center-safe ${collapsed ? 'text-xs' : 'text-sm px-5'}`} 
//                to={item.path}
//                key={`children-${idx}`}
//                >
//                   {item?.name}
//                </NavLink>
//              })}
//            </div>
//         </div>
//     } else {
//         return (
//           // <NavLink
//           //   key={`Navlinks-${idx}`}
//           //   to={route.path}
//           //   className={({ isActive }) =>
//           //     `group relative flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium
//           //      transition-colors duration-200
//           //      ${collapsed ? "justify-center px-0" : "px-3"}
//           //      ${isActive
//           //        ? "bg-violet-800/10 text-violet-700"
//           //        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`
//           //   }
//           // >
//           //   {route.icon && <route.icon size={20} className="shrink-0" />}
//           //   {!collapsed && <span className="truncate">{route.name}</span>}
//           // </NavLink>

//                     <NavLink
//             to={route.path}
//             className={({ isActive }) =>
//               `group relative flex items-center rounded-lg py-2.5
//                ${collapsed ? "justify-center" : "px-3"}`
//             }
//           >
//             <route.icon size={20} />
          
//             {!collapsed && (
//               <span className="ml-3">{route.name}</span>
//             )}
          
//             {collapsed && (
//               <div
//                 className="
//                 absolute left-14
//                 opacity-0 group-hover:opacity-100
//                 pointer-events-none
//                 transition-all duration-200
//                 bg-zinc-900
//                 border border-zinc-700
//                 text-white
//                 rounded-lg
//                 px-3 py-1.5
//                 whitespace-nowrap
//                 shadow-xl
//                 z-50"
//               >
//                 {route.name}
//               </div>
//             )}
//           </NavLink>
//         );
//       }     
//     })}
//   </div>

//   {/* User / logout */}
//   {isLoggedIn && (
//   <div
//     className={`flex items-center gap-2 pt-4 border-t border-zinc-800/60 ${
//       collapsed ? "justify-center" : "px-2"
//     }`}
//   >
//     {/* Profile */}
//     <div className="relative group">
//       <div
//         className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-semibold shrink-0 cursor-pointer overflow-hidden"
//         onClick={() => navigate("/user")}
//       >
//         <img
//           className="h-full w-full object-cover"
//           src={user?.profileImage}
//           alt={user?.name}
//         />
//       </div>

//       {collapsed && (
//         <div
//           className="
//             absolute left-12 top-1/2 -translate-y-1/2
//             opacity-0 group-hover:opacity-100
//             group-hover:translate-x-1
//             transition-all duration-200
//             pointer-events-none
//             whitespace-nowrap
//             rounded-lg
//             border border-zinc-700
//             bg-zinc-900
//             px-3 py-1.5
//             text-sm text-white
//             shadow-xl
//             z-50
//           "
//         >
//           {user?.name}
//         </div>
//       )}
//     </div>

//     {!collapsed && (
//       <span
//         className="text-sm text-zinc-300 truncate flex-1 cursor-pointer"
//         onClick={() => navigate("/user")}
//       >
//         {user?.name}
//       </span>
//     )}

//     {/* Logout */}
//     <div className="relative group">
//       <Power
//         className="text-zinc-500 hover:text-red-400 cursor-pointer shrink-0 transition-colors"
//         size={17}
//         onClick={logout}
//       />

//       {collapsed && (
//         <div
//           className="
//             absolute left-8 top-1/2 -translate-y-1/2
//             opacity-0 group-hover:opacity-100
//             group-hover:translate-x-1
//             transition-all duration-200
//             pointer-events-none
//             whitespace-nowrap
//             rounded-lg
//             border border-zinc-700
//             bg-zinc-900
//             px-3 py-1.5
//             text-sm text-white
//             shadow-xl
//             z-50
//           "
//         >
//           Logout
//         </div>
//       )}
//     </div>
//   </div>
// )}
// </nav>
//     </div>
//   );
// };

// export default Navbar;


import React, { useContext, useRef, useState, useEffect } from "react";
import { navItems } from "./Navitems";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Global/AuthProvider";
import { ArrowLeft, Power, PowerIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, loading, logout } = useContext(authContext);
  const [collapsed, setCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lastScroll = useRef(0);

  // if(loading) return null
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "ADMIN";
  const isOrganizer = user?.role === "ORGANIZER";

  const visibleItems = navItems.filter((item) => {
    if (!item.name) return false;
    if (item.isAdmin) return isAdmin;
    if (item.isOrganizer) return isOrganizer;
    if (item.isProtected) return isLoggedIn;
    if (isLoggedIn && (item.path === "/login" || item.path === "register"))
      return false;

    return true;
  });

  return (
    <div className="">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/60 flex items-center justify-between px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="text-zinc-200 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>

        <h1
          className="text-lg font-bold text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          apex.co
        </h1>

        {isLoggedIn ? (
          <div
            className="h-8 w-8 rounded-full overflow-hidden cursor-pointer bg-violet-600 flex items-center justify-center"
            onClick={() => navigate("/user")}
          >
            <img
              src={user?.profileImage}
              alt={user?.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="w-8" />
        )}
      </div>

      {/* Mobile Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-60 h-full w-72 max-w-[85vw] bg-zinc-950 border-r border-zinc-800/60 backdrop-blur-md transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-14 px-4 flex items-center justify-between border-b border-zinc-800/60">
          <h1
            className="text-lg font-bold text-white cursor-pointer"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            apex.co
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-300 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-1 p-3 pt-4 overflow-y-auto h-[calc(100%-3.5rem)]">
          {visibleItems.map((route, idx) => {
            if (route?.children) {
              return (
                <div key={`mobile-group-${idx}`} className="space-y-1">
                  <div className="flex items-center gap-2.5 rounded-lg py-2.5 px-3 cursor-default text-zinc-400 bg-zinc-900/40">
                    {route.icon && <route.icon size={20} className="shrink-0" />}
                    <span className="">{route.name}</span>
                  </div>

                  <div className="ml-4 flex flex-col gap-1">
                    {route?.children?.map((item, cidx) => (
                      <NavLink
                        key={`mobile-child-${cidx}`}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-lg px-4 py-2 text-sm transition-colors ${
                            isActive
                              ? "bg-violet-800/10 text-violet-400"
                              : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                          }`
                        }
                      >
                        {item?.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={`mobile-nav-${idx}`}
                to={route.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg py-2.5 px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-violet-800/10 text-violet-400"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`
                }
              >
                {route.icon && <route.icon size={20} className="shrink-0" />}
                <span className="truncate">{route.name}</span>
              </NavLink>
            );
          })}

          {isLoggedIn && (
            <div className="mt-4 pt-4 border-t border-zinc-800/60 flex items-center gap-3 px-3">
              <div
                className="h-9 w-9 rounded-full overflow-hidden cursor-pointer bg-violet-600 flex items-center justify-center"
                onClick={() => {
                  navigate("/user");
                  setIsOpen(false);
                }}
              >
                <img
                  src={user?.profileImage}
                  alt={user?.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-sm text-zinc-200 truncate cursor-pointer"
                  onClick={() => {
                    navigate("/user");
                    setIsOpen(false);
                  }}
                >
                  {user?.name}
                </p>
                <p className="text-xs text-zinc-500 truncate">{user?.role}</p>
              </div>

              <Power
                className="text-zinc-500 hover:text-red-400 cursor-pointer shrink-0 transition-colors"
                size={17}
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <nav
        className={`hidden md:flex z-50 flex-col fixed left-0 top-0 h-screen
        backdrop-blur-md border-r border-zinc-800/60
       transition-all duration-300 ease-out py-4 
       ${collapsed ? "w-16 px-2 bg-zinc-800/90" : "w-35 px-4"}`}
      >
        {/* Logo */}
        <div
          className={`flex  items-center mb-8 ${
            collapsed ? "justify-center" : "px-2"
          }`}
        >
          <h1
            className="text-xl font-bold text-white cursor-pointer"
            onClick={() => navigate("/")}
            onDoubleClick={() => setCollapsed(true)}
          >
            {collapsed ? "A" : "apex.co"}
          </h1>
          <div
            className={`flex w-full mt-2  ml-5 cursor-pointer ${
              collapsed ? "hidden" : "block"
            }`}
          >
            <ArrowLeft
              className="flex"
              size={17}
              onClick={() => setCollapsed(true)}
            />
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-1 flex-1">
          {visibleItems.map((route, idx) => {
            const isActive = window.location.pathname === route.path; // see note below

            if (route?.children) {
              return (
                <div className="group" key={`desktop-group-${idx}`}>
                  <div
                    className={`flex  gap-2.5 rounded-lg py-2.5 cursor-pointer items-center
               ${collapsed ? "justify-center px-0" : "px-3 justify-center"}
               text-zinc-400 hover:bg-zinc-800 hover:text-white`}
                  >
                    {route.icon && <route.icon size={20} className="shrink-0" />}
                    {!collapsed && <span className="">{route.name}</span>}
                  </div>

                  <div className=" flex flex-col top-0 backdrop-blur-xl md:hidden group-hover:block rounded-lg shadow-lg">
                    {route?.children?.map((item, idx) => {
                      return (
                        <NavLink
                          className={`block md: md:py-2 text-purple-800 hover:bg-zinc-800 hover:text-white rounded-lg self-center-safe ${
                            collapsed ? "text-xs" : "text-sm px-5"
                          }`}
                          to={item.path}
                          key={`children-${idx}`}
                        >
                          {item?.name}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              return (
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    `group relative flex items-center rounded-lg py-2.5
               ${collapsed ? "justify-center" : "px-3"}`
                  }
                >
                  <route.icon size={20} />

                  {!collapsed && <span className="ml-3">{route.name}</span>}

                  {collapsed && (
                    <div
                      className="
                absolute left-14
                opacity-0 group-hover:opacity-100
                pointer-events-none
                transition-all duration-200
                bg-zinc-900
                border border-zinc-700
                text-white
                rounded-lg
                px-3 py-1.5
                whitespace-nowrap
                shadow-xl
                z-50"
                    >
                      {route.name}
                    </div>
                  )}
                </NavLink>
              );
            }
          })}
        </div>

        {/* User / logout */}
        {isLoggedIn && (
          <div
            className={`flex items-center gap-2 pt-4 border-t border-zinc-800/60 ${
              collapsed ? "justify-center" : "px-2"
            }`}
          >
            {/* Profile */}
            <div className="relative group">
              <div
                className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-semibold shrink-0 cursor-pointer overflow-hidden"
                onClick={() => navigate("/user")}
              >
                <img
                  className="h-full w-full object-cover"
                  src={user?.profileImage}
                  alt={user?.name}
                />
              </div>

              {collapsed && (
                <div
                  className="
            absolute left-12 top-1/2 -translate-y-1/2
            opacity-0 group-hover:opacity-100
            group-hover:translate-x-1
            transition-all duration-200
            pointer-events-none
            whitespace-nowrap
            rounded-lg
            border border-zinc-700
            bg-zinc-900
            px-3 py-1.5
            text-sm text-white
            shadow-xl
            z-50
          "
                >
                  {user?.name}
                </div>
              )}
            </div>

            {!collapsed && (
              <span
                className="text-sm text-zinc-300 truncate flex-1 cursor-pointer"
                onClick={() => navigate("/user")}
              >
                {user?.name}
              </span>
            )}

            {/* Logout */}
            <div className="relative group">
              <Power
                className="text-zinc-500 hover:text-red-400 cursor-pointer shrink-0 transition-colors"
                size={17}
                onClick={logout}
              />

              {collapsed && (
                <div
                  className="
            absolute left-8 top-1/2 -translate-y-1/2
            opacity-0 group-hover:opacity-100
            group-hover:translate-x-1
            transition-all duration-200
            pointer-events-none
            whitespace-nowrap
            rounded-lg
            border border-zinc-700
            bg-zinc-900
            px-3 py-1.5
            text-sm text-white
            shadow-xl
            z-50
          "
                >
                  Logout
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;