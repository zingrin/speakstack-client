import React from 'react';
import { FaPaw } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router'; 

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>

        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>

        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <div className="navbar-start mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-green-600"
            >
              <FaPaw className="text-2xl text-green-900" /> PawTrack
            </Link>
          </div>

          <li><NavLink to="/">🏠 Home</NavLink></li>
          <li><NavLink to="/dashboard">📊 Dashboard Home</NavLink></li>
          <li><NavLink to="/dashboard/myParcels">📦 My Parcels</NavLink></li>
          <li><NavLink to="/dashboard/make-announcement">📢 Make Announcement</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
