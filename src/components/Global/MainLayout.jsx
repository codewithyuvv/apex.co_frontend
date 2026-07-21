import { useState } from "react"
import { Outlet } from "react-router-dom"  // ← add this import!
import Navbar from "../navbar/Navbar"
import Footer from "../navbar/Footer"

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(true)

    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">

            <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className={`flex-1 flex flex-col transition-all duration-300
                ${collapsed ? "ml-13" : "ml-70"}`}>
                
                <main className="flex-1 overflow-y-auto">
                    <Outlet />  {/* ← replace {children} with this! */}
                </main>

                <Footer />
            </div>

        </div>
    )
}

export default MainLayout