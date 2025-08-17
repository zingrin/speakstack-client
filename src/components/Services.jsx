import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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

  // Direct image URLs
  const images = [
    {
      url: "https://i.ibb.co.com/HpHvZHTt/images-q-tbn-ANd9-Gc-Tj-QWkfunc-LASQHEm-Ak-DM9-lgcwi1xk-LJJ9-Ov-KGKfkfw-DNKk-V3-CSKU-c-Ko-IJw-Pp-PTv.jpg",
      title: "Post Discussions",
      desc: "Share your thoughts and questions with the community."
    },
    {
      url: "https://i.ibb.co.com/CKqVzzX5/group-of-high-school-students-sitting-in-classroom-and-writing-in-notebooks-back-to-school-video.jpg",
      title: "Real-Time Comments",
      desc: "Engage instantly with live comments."
    },
    {
      url: "https://i.ibb.co.com/BVkh8rwF/istockphoto-1481646363-612x612.jpg",
      title: "Member Perks",
      desc: "Unlock badges, unlimited posts, and more benefits."
    },
  ];

  return (
    <section className="bg-gray-200 py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Service Text */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Our Services
          </h2>
          {services.map((service, idx) => (
            <div key={idx} className="space-y-2 flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 text-2xl shadow-md">
                {service.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Image Slider with title/description */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            spaceBetween={20}
            slidesPerView={1}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx} className="relative">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-md max-w-xs">
                  <h4 className="font-bold text-lg">{img.title}</h4>
                  <p className="text-sm">{img.desc}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Services;
