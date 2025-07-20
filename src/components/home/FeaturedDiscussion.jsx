import { Link } from "react-router";
import { FaFire } from "react-icons/fa";

const FeaturedDiscussion = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#3b82f6] via-[#2563eb] to-[#1e40af] py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
          <FaFire className="text-yellow-400 text-5xl animate-pulse" />
          Featured Discussion of the Week
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
          Join the heated debate on
          <span className="font-semibold underline decoration-yellow-300 decoration-2">
            "Is AI Empowering or Replacing Creativity?"
          </span>
          and let your voice be heard in the community.
        </p>
        <Link
          to="/posts/:id"
          className="btn bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full text-lg shadow-md transition"
        >
          Read & Comment
        </Link>
      </div>
    </section>
  );
};

export default FeaturedDiscussion;
