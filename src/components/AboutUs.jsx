import React from "react";

const teamMembers = [
  {
    name: "Ayesha Akter",
    role: "Founder & CEO",
    img: "https://i.pravatar.cc/150?img=10",
    bio: "Passionate about pet welfare and community building.",
  },
  {
    name: "Shamim Hossain",
    role: "Lead Developer",
    img: "https://i.pravatar.cc/150?img=20",
    bio: "Full-stack dev crafting smooth user experiences.",
  },
  {
    name: "Rafiul Islam",
    role: "Community Manager",
    img: "https://i.pravatar.cc/150?img=15",
    bio: "Connecting pet lovers and growing our vibrant community.",
  },
];

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 md:p-12">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-12 text-center">
        About PawTrack
      </h1>

      {/* Mission & Vision (same as before) */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 mb-16">
        <div className="flex-shrink-0 w-full md:w-1/3 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80"
            alt="About PawTrack"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            At PawTrack, we’re dedicated to connecting pet lovers and providing
            a safe, engaging space to share stories, knowledge, and love for
            our furry friends...
          </p>
          {/* Mission & Vision */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Our Mission</h2>
            <p className="text-gray-700">
              To build a trusted platform where pet enthusiasts can learn, share, and grow together.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">Our Vision</h2>
            <p className="text-gray-700">
              To be the leading community for pet lovers worldwide...
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className="text-3xl font-bold text-blue-700 mb-10 text-center">
          Meet Our Team
        </h2>

        <div className="space-y-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-6 bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-1">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
