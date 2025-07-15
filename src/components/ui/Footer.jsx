import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaComments } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10">
        {/* Left side: Logo + Tag */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <FaComments className="text-yellow-600 text-4xl" />
          <div>
            <h2 className="text-3xl font-bold text-primary">SpeakStack</h2>
            <p className="text-sm max-w-xs mt-1">
              A community-driven forum to share ideas, raise voices, and spark meaningful conversations.
            </p>
          </div>
        </div>

        {/* Right side: Links, Social Icons, Contact */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 flex-grow justify-end w-full md:w-auto">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", to: "/" },
                { name: "About Us", to: "/about" },
                { name: "Services", to: "/services" },
                { name: "Contact Us", to: "/contact" },
                { name: "Membership", to: "/membership" },
                { name: "Join Us", to: "/join" },
                { name: "Dashboard", to: "/dashboard" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-primary transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-5 text-primary text-xl">
              <a href="#" className="hover:text-yellow-500 transition" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-yellow-500 transition" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-yellow-500 transition" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-yellow-500 transition" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: support@speakstack.com</p>
            <p className="text-sm mt-2">Address: Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-300 text-center py-4 text-sm bg-blue-600 text-white">
        &copy; {new Date().getFullYear()} SpeakStack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
