import { FaFacebook, FaGithub, FaInstagram, FaPaw } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-4 mt-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo and Description */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-green-600">
            <FaPaw className="text-3xl" />
            PawTrack
          </Link>
          <p className="mt-2 text-sm text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} PawTrack. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-green-600 transition-colors duration-300 cursor-pointer">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-green-600 transition-colors duration-300 cursor-pointer">
            <FaInstagram />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-green-600 transition-colors duration-300 cursor-pointer">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
