import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { TbBrandProducthunt } from "react-icons/tb";


const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: <MdDashboard /> },
    { name: 'Manage Users', href: '/admin/users', icon: <LuUsersRound /> },
    // { name: 'Manage Pets', href: '/admin/pets', icon: '🐾' },
    { name: 'Manage Products', href: '/admin/products', icon: <TbBrandProducthunt /> },
    // { name: 'Manage Appointments', href: '/admin/appointments', icon: '📅' },
    // { name: 'Manage Adoptions', href: '/admin/adoptions', icon: '🏠' },
    // { name: 'Health Records', href: '/admin/health-records', icon: '🩺' },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* forMobileHeader */}
      <div className="md:hidden p-4 flex justify-between items-center bg-blue-800 text-white">
        <h1 className="text-xl font-bold">FurShield</h1>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 rounded-lg hover:bg-blue-700 focus:outline-none text-2xl"
        >
          {isMobileSidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      {/* forMobile */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isSidebarOpen ? 'w-64' : 'w-16'}
          bg-gradient-to-b from-blue-800 to-blue-900 text-white 
          transition-all duration-300 ease-in-out overflow-y-auto flex-shrink-0`}
      >
        {/* Sidebar header */}
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          <h1 className="text-xl font-bold">{isSidebarOpen ? 'FurShield' : 'FS'}</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:block p-2 rounded-lg hover:bg-blue-700 focus:outline-none text-xl"
          >
            {isSidebarOpen ? '«' : '»'}
          </button>
        </div>

        {/*  links */}
        <nav className="mt-6 flex-1">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 
                    ${location.pathname === item.href ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* lg-screen Header */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Admin
            </h2>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* <span className="hidden sm:inline text-sm text-gray-600">Admin User</span> */}
              <button className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 focus:outline-none">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* mainContent */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminSidebar;
