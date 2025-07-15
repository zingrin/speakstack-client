import { Outlet, NavLink } from "react-router";

const UserDashboardLayout = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
      <nav className="flex gap-4 mb-6">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="add-post"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"
          }
        >
          Add Post
        </NavLink>
        <NavLink
          to="my-posts"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-bold" : "hover:text-blue-500"
          }
        >
          My Posts
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default UserDashboardLayout;
