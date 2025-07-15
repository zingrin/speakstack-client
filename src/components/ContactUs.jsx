const ContactUs = () => {
  return (
    <section className="bg-base-200 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">Contact Us</h2>
        <p className="text-gray-600">
          Got a question or feedback? Reach out to us anytime – we’re here to help.
        </p>
        <form className="grid grid-cols-1 gap-4">
          <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
          <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
            rows="5"
          ></textarea>
          <button type="submit" className="btn btn-primary w-fit mx-auto">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
