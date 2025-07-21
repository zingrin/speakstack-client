import { Outlet, NavLink } from "react-router";

const AdminDashboardLayout = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Admin Dashboard</h2>
      <nav className="flex gap-6 mb-8 border-b pb-2">
        <NavLink
          to="admin-profile"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold border-b-2 border-red-600 pb-1" : "hover:text-red-500"
          }
        >
          Admin Profile
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold border-b-2 border-red-600 pb-1" : "hover:text-red-500"
          }
        >
          Manage Users
        </NavLink>
        <NavLink
          to="reports"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold border-b-2 border-red-600 pb-1" : "hover:text-red-500"
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="announcement"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold border-b-2 border-red-600 pb-1" : "hover:text-red-500"
          }
        >
          Announcements
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminDashboardLayout;
