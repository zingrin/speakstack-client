import { useState } from "react";
import { FaComments, FaBars, FaTimes } from "react-icons/fa";
import { Outlet, NavLink, Link } from "react-router";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar on mobile
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between bg-gray-800 text-blue-600 p-4">
        <Link to="/" className="flex items-center gap-2">
          <FaComments />
          <h2 className="text-xl font-bold">SpeakStack</h2>
        </Link>

        <button onClick={toggleSidebar} aria-label="Toggle Menu" className="text-blue-600 focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-gray-800 text-blue-600 p-6
          transform md:transform-none
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0
        `}
      >
        {/* Logo + Project Name */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-8 text-blue-600 hover:text-yellow-400"
          onClick={() => setIsOpen(false)}
        >
          <FaComments />
          <h2 className="text-xl font-bold">SpeakStack</h2>
        </Link>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-6">
          <NavLink
            to="user/profile"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-300 transition-colors"
            }
          >
            User Dashboard
          </NavLink>
          <NavLink
            to="admin/users"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-300 transition-colors"
            }
          >
            Admin Dashboard
          </NavLink>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
