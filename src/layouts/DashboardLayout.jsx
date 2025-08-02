import { useContext, useState } from "react";
import { FaComments, FaBars, FaTimes } from "react-icons/fa";
import { Outlet, NavLink, Link } from "react-router";
import AuthContext from "../contexts/AuthContexts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userRole = null, isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data?.role || null;
    },
  });

  const toggleSidebar = () => setIsOpen(!isOpen);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  // If no valid role, return only main content without sidebar
  const allowedRoles = ["user", "admin"];
  const showSidebar = allowedRoles.includes(userRole);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Topbar (only if sidebar is shown) */}
      {showSidebar && (
        <header className="md:hidden flex items-center justify-between  text-blue-600 p-4">
          <Link to="/" className="flex items-center gap-2">
            <FaComments />
            <h2 className="text-xl font-bold">SpeakStack</h2>
          </Link>

          <button
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
            className="text-blue-600 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </header>
      )}

      {/* Sidebar */}
      {showSidebar && (
        <aside
          className={`
            fixed top-0 left-0 z-30 h-full w-64  text-blue-600 p-6
            transform md:transform-none
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            md:relative md:translate-x-0
          `}
        >
          <Link
            to="/"
            className="flex items-center gap-2 mb-8 text-blue-600 hover:text-yellow-400"
            onClick={() => setIsOpen(false)}
          >
            <FaComments />
            <h2 className="text-xl font-bold">SpeakStack</h2>
          </Link>

          <nav className="flex flex-col gap-6">
            {userRole === "user" && (
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
            )}

            {userRole === "admin" && (
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
            )}

           
          </nav>
        </aside>
      )}

      {/* Overlay for mobile */}
      {isOpen && showSidebar && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100 overflow-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
