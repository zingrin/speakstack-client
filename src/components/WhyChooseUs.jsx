import { FaBolt, FaShieldAlt, FaUsers, FaCrown } from "react-icons/fa";

const features = [
  {
    title: "Fast & Intuitive",
    desc: "Enjoy a smooth posting and commenting experience with a real-time interface.",
    icon: <FaBolt className="text-4xl text-secondary" />,
  },
  {
    title: "Secure & Private",
    desc: "We prioritize your privacy and data security with Firebase Auth and secure APIs.",
    icon: <FaShieldAlt className="text-4xl text-secondary" />,
  },
  {
    title: "Community Powered",
    desc: "Thousands of developers engage daily, sharing and growing together.",
    icon: <FaUsers className="text-4xl text-secondary" />,
  },
  {
    title: "Membership Perks",
    desc: "Unlock gold badges, post limits, and advanced features with membership.",
    icon: <FaCrown className="text-4xl text-secondary" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-base-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Why Choose SpeakStack?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A developer-first platform built for meaningful conversations, collaboration, and growth.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition duration-300 text-center space-y-4 border border-primary"
          >
            <div className="flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-dark">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
