import {
  FaEnvelope,
  FaFacebookF,
  FaHome,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import { FaPaw } from "react-icons/fa";

const Footer = () => {
  const socialIcons = [
    { icon: FaFacebookF, url: "https://facebook.com" },
    { icon: FaLinkedinIn, url: "https://linkedin.com" },
  ];

  return (
    <div className="bg-[#F0F8FF] text-gray-800">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo */}
        <div className="md:col-span-1 flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <FaPaw className="text-4xl text-blue-700" />
            <h2 className="text-3xl font-bold text-blue-800">PawTrack</h2>
          </div>
          <p className="text-base text-gray-600 max-w-xs">
            Connecting pet lovers with a purpose — explore, share, and care for
            your furry friends with PawTrack.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-2xl font-bold mb-2 text-blue-700">
            | Navigation
          </h4>
          <ul className="space-y-1">
            {["/", "/about", "/services", "/blog", "/contact"].map(
              (path, i) => (
                <li key={i}>
                  <Link
                    to={path}
                    className="hover:text-blue-800 transition-colors duration-200 block text-xl"
                  >
                    {
                      [
                        ">Home",
                        ">About Us",
                        ">Services",
                        ">Blog",
                        ">Contact Us",
                      ][i]
                    }
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Info + Social Media */}
        <div>
          <div className="flex justify-between items-start flex-wrap gap-4">
            {/* Contact Info */}
            <div>
              <h4 className="text-2xl font-bold mb-2 text-blue-700">
                | Get In Touch
              </h4>
              <div className="flex items-center gap-2 mb-2 cursor-pointer group">
                <FaPhoneAlt className="text-blue-600 group-hover:text-blue-800 transition duration-300" />
                <p className="text-xl text-blue-600 group-hover:text-blue-800 transition duration-300">
                  (303) 378-8273
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2 cursor-pointer group">
                <FaEnvelope className="text-blue-600 group-hover:text-blue-800 transition duration-300" />
                <p className="text-xl text-blue-600 group-hover:text-blue-800 transition duration-300">
                  support@pawtrack.com
                </p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer group">
                <FaHome className="text-blue-600 group-hover:text-blue-800 transition duration-300" />
                <p className="text-xl text-blue-600 group-hover:text-blue-800 transition duration-300">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-start">
              <h4 className="text-2xl font-bold mb-2 text-blue-700">
                | Social Media
              </h4>
              <div className="flex items-center gap-4">
                {socialIcons.map(({ icon: Icon, url }, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-blue-300 text-blue-700 hover:text-blue-900 transition-all duration-300 shadow transform hover:-translate-y-1"
                  >
                    <Icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-blue-700 text-white text-center py-4 text-sm">
        © Copyright 2025 PawTrack - All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
