const AboutUs = () => {
  return (
    <section className="bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">About SpeakStack</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          SpeakStack is a modern discussion platform where developers can share ideas, ask questions,
          and connect with peers. Whether you're a beginner or a pro, this is your space to speak up.
        </p>
        <div className="flex justify-center gap-8 flex-wrap pt-4">
          <div className="stat">
            <div className="stat-title">Active Users</div>
            <div className="stat-value text-secondary">5K+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Posts Shared</div>
            <div className="stat-value text-secondary">12K+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Daily Discussions</div>
            <div className="stat-value text-secondary">800+</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
