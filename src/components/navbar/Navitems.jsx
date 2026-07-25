import AllEvents from "../EventsPages/AllEvents";
import CreateEventForm from "../EventsPages/CreateEventForm";
import About from "../pages/About";
import Admin from "../pages/Admin";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateEvent from "../EventsPages/UpdateEvent"
import Dashboard from "../EventsPages/Dashboard";
import Message from "../EventsPages/Message";
import Applications from "../EventsPages/Applications";
import { Calendar, ContactIcon, HomeIcon, InfoIcon, PanelRight, PartyPopper, User, User2, UserPlus2 } from "lucide-react";
import UserConfig from "../User/UserConfig";
import { Children } from "react";
import Organizer from "../pages/Organizer";
import Attendance from "../Organizer functions/Attendance";
import RegisterOrganizer from "../pages/RegisterOrganizer";
import KYCForm from "../pages/KYCForm";
import KYCvalidation from "../Admin Functions/KYCvalidation";

export const navItems = [
    {
        name: 'Home',
        path: '/',
        element: <Home />,
        isProtected: false,
        isAdmin: false,
        icon: HomeIcon 
    },
    {
        name: 'About',
        path: '/about',
        element: <About />,
        isProtected: false,
        isAdmin: false,
        icon: InfoIcon 
    },
    {
        name: 'Contact',
        path: '/contact',
        element: <Contact />,
        isProtected: false,
        isAdmin: false,
        icon: ContactIcon 
    },
    {
        name: 'Register', path: 'register', 
        children: [
           { 
            name: 'Organizer',
            path: '/register/organizer',
            element: <RegisterOrganizer />
           },
           { 
            name: 'Volunteer',
             path: '/register/volunteer',
             element: <Register />
           },
        ],
        // element: <Register />,
        isProtected: false,
        isAdmin: false,
        icon: UserPlus2
    },
    {
        name: 'Login',
        path: '/login',
        element: <Login />,
        isProtected: false,
        isAdmin: false,
        icon: User2 
    },
    {
        name: 'Explore events',
        path: '/all-events',
        element: <AllEvents />,
        isProtected: false,
        isAdmin: false,
        isOrganizer: false,
        icon: PartyPopper 
    },
    {
        path: '/user/kyc',
        element: <KYCForm />,
        isProtected: true,
        isAdmin: false,
        isOrganizer: false,
    },
    {
        path: `/admin-panel/volunteer/kyc/:userId`,
        element: <KYCvalidation />,
        isProtected: true,
        isAdmin: true,
        isOrganizer: false,
    },
    {
        name: 'Admin Panel',
        path: '/admin-panel',
        element: <Admin />,
        isProtected: true,
        isOrganizer: true,
        isAdmin: true,        
        icon: PanelRight 
    },
    {
        path: '/dashboard/create-event',
        element: <CreateEventForm />,
        isProtected: true,
        isOrganizer: true,
    },
    {
        path: '/dashboard/update-event/:id',
        element: <UpdateEvent />,
        isProtected: true,
        isAdmin: false,
        isOrganizer: true,
    },
    {
        name: 'Dashhboard',
        path: '/dashboard',
        element: <Dashboard />,
        isProtected: true,
        isAdmin: false,
        icon: Calendar 
    },
    {
        path: '/fill-up-form',
        element: <Message />,
        isProtected: true,
        isAdmin : false,
    },
    {
        path: '/events/applications/:eventId',
        element: <Applications />,
        isProtected: true,
        isAdmin : false,
        isOrganizer: true,
    },
    {
        path: '/:eventId/attendance',
        element: <Attendance />,
        isProtected: true,
        isAdmin : false,
        isOrganizer: true,
    },
    {
        path: '/user',
        element: <UserConfig />,
        isProtected: true,
        isAdmin : false,
    },
    // {
    //     path: '/register/organizer',
    //     element: <Organizer />,
    //     isProtected: false,
    //     isAdmin : false,
    // },
    // {
    //     path: '/register/volunteer',
    //     element: <Register />,
    //     isProtected: false,
    //     isAdmin : false,
    // },
    // {
    //     path: '/register/volunteer',
    //     element: <Register />,
    //     isProtected: false,
    //     isAdmin : false,
    // }
    // {
    //     name: 'Explore events',
    //     path: '/all-events',
    //     element: <AllEvents />,
    //     isProtected: true,
    //     isAdmin: false
    // },
]


