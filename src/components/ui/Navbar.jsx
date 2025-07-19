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
            isActive ? "font-semibold text-primary" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-course"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : "hover:text-primary"
          }
        >
          All Course
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/membership"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : "hover:text-primary"
          }
        >
          Membership
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "font-semibold text-primary" : "hover:text-primary"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Mobile Drawer */}
        <div className="navbar-start lg:hidden">
          <div className="dropdown">
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

          {/* Logo with icon */}
          <Link
            to="/"
            className="btn btn-ghost normal-case flex items-center text-xl font-bold space-x-2"
          >
            <FaComments className="text-3xl text-yellow-400" />
            <span>SpeakStack</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <Link
            to="/"
            className="btn btn-ghost normal-case flex items-center text-2xl font-bold space-x-2"
          >
            <FaComments className="text-4xl text-yellow-400" />
            <span>SpeakStack</span>
          </Link>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <ul className="menu menu-horizontal px-1 hidden lg:flex">{navLinks}</ul>

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
              {/* Notification Icon */}
                <Notification />

              {/* Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.photoURL || "/default.png"}
                      alt="User Avatar"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white text-black rounded-box w-52"
                >
                  <li>
                    <p className="font-semibold">{user.displayName || "User"}</p>
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
