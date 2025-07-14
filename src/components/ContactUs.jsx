import { FaEnvelope, FaHome, FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire("Message Sent!", "We will get back to you shortly.", "success");
    e.target.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
      {/* Left - Contact Info */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">📞 Get in Touch</h2>
        <p className="text-gray-600 text-lg">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hi — drop us a message.
        </p>
        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-blue-600 text-xl" />
          <p className="text-lg text-gray-700">+880 1234 567 890</p>
        </div>
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-blue-600 text-xl" />
          <p className="text-lg text-gray-700">support@pawtrack.com</p>
        </div>
        <div className="flex items-center gap-4">
          <FaHome className="text-blue-600 text-xl" />
          <p className="text-lg text-gray-700">Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Right - Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Send a Message</h3>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        <button type="submit" className="btn bg-blue-700 text-white hover:bg-blue-800 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
