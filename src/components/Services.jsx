const Services = () => {
  const services = [
    {
      title: "Post Discussions",
      desc: "Share your thoughts, questions, and knowledge with the developer community.",
      icon: "💬",
    },
    {
      title: "Real-Time Comments",
      desc: "Engage with others instantly using our live comment and reply system.",
      icon: "🧠",
    },
    {
      title: "Member Perks",
      desc: "Upgrade to a member to get a gold badge, unlimited post limit, and more.",
      icon: "⭐",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-primary via-blue-500 to-secondary text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white text-dark rounded-xl shadow-lg p-6 space-y-4"
            >
              <div className="text-5xl">{service.icon}</div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
