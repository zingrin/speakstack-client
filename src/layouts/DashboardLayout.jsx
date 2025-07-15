import { FaComments } from "react-icons/fa";
import { Outlet, NavLink, Link } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-blue-600 p-4">
        {/* Logo + Project Name */}
        <Link to="/" className="flex items-center gap-2 mb-6">
          <FaComments></FaComments>
          <h2 className="text-xl font-bold">SpeakStack</h2>
        </Link>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-4">
          <NavLink
            to="user/profile"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-medium" : "hover:text-yellow-300"
            }
          >
            User Dashboard
          </NavLink>
          <NavLink
            to="admin/users"
            className={({ isActive }) =>
              isActive ? "text-yellow-400 font-medium" : "hover:text-yellow-300"
            }
          >
            Admin Dashboard
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
