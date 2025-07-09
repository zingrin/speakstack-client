import { Link, NavLink } from "react-router";
import { FaBell, FaBars, FaPaw } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import NotificationIcon from "./NotificationIcon";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="rounded-lg">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allPets" className="rounded-lg">
          All Pets
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="rounded-lg">
          Dashboard
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink to="/announcements">Announcements</NavLink>
      </li>

      <li>
        <NavLink to="/membership" className="rounded-lg">
          Membership
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* Start: Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          <FaPaw className="text-2xl text-blue-900" /> {/* 🐾 paw icon */}
          PawTrack
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">{navLinks}</ul>
      </div>

      {/* End: Buttons & Avatar */}
      <div className="navbar-end flex items-center gap-2">
        {/* Notification icon */}
        <button className="btn btn-ghost btn-circle text-blue-800">
          <NotificationIcon></NotificationIcon>
        </button>

        {/* Avatar or Join Us */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "/avatar.png"} alt="User" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <p className="text-gray-600">{user.displayName}</p>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>  
        ) : (
          <Link
            to="/join-us"
            className="btn btn-sm btn-outline text-blue-600 border-blue-500"
          >
            Join Us
          </Link>
        )}

        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full right-4 mt-2 bg-base-100 shadow rounded-box z-50 w-48">
          <ul className="menu p-2 space-y-1">{navLinks}</ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
