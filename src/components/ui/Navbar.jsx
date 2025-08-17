import { Link, NavLink } from "react-router";
import { useContext } from "react";
import Notification from "../Notification";
import { FaBars, FaComments } from "react-icons/fa";
import AuthContext from "../../contexts/AuthContexts";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold text-secondary" : "hover:text-secondary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allPost"
          className={({ isActive }) =>
            isActive ? "font-semibold text-secondary" : "hover:text-secondary"
          }
        >
          All Post
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/membership"
              className={({ isActive }) =>
                isActive ? "font-semibold text-secondary" : "hover:text-secondary"
              }
            >
              Membership
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trendingCourses"
              className={({ isActive }) =>
                isActive ? "font-semibold text-secondary" : "hover:text-secondary"
              }
            >
              Trending Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "font-semibold text-secondary" : "hover:text-secondary"
              }
            >
              Services
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo (Left Side) */}
        <div className="flex items-center gap-3">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <FaBars className="text-xl" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white text-black rounded-box w-52"
            >
              {navLinks}
              {!user && (
                <li>
                  <NavLink
                    to="/join"
                    className={({ isActive }) =>
                      isActive ? "font-semibold text-primary" : "hover:text-primary"
                    }
                  >
                    Join Us
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 btn btn-ghost normal-case text-xl font-bold"
          >
            <FaComments className="text-3xl text-yellow-400" />
            <span>SpeakStack</span>
          </Link>
        </div>

        {/* Center Nav (Large screens only) */}
        <ul className="hidden lg:flex menu menu-horizontal px-1 gap-4">
          {navLinks}
        </ul>

        {/* Right Side (Profile, Notifications, Auth Buttons) */}
        <div className="flex items-center gap-4">
          {!user && (
            <Link
              to="/join"
              className="btn btn-outline btn-sm hidden lg:inline-block"
            >
              Join Us
            </Link>
          )}

          {user && (
            <>
              <Notification />

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.photoURL}
                      alt="profile"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white text-black rounded-box w-52"
                >
                  <li>
                    <p className="font-semibold">{user.displayName}</p>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
