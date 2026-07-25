import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../navbar/Footer";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`
          min-h-screen
          flex
          flex-col
          transition-all
          duration-300

          pt-14

          md:pt-0
          md:ml-16

          lg:${collapsed ? "ml-16" : "ml-72"}
        `}
      >
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;