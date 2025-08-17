import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  // Public folder থেকে images load
  const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
  ];

  return (
    <section className="relative text-white overflow-hidden">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        loop={true}
        className="h-[250px] md:h-[500px] w-full relative"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="relative w-full h-full">
            <img
              src={img}
              alt={`Slide ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-opacity-20 flex flex-col justify-center items-center text-center space-y-6 px-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Explore Conversations
        </h1>
        <p className="text-base md:text-lg text-gray-200">
          Discover the most engaging discussions and trending topics
        </p>
        {/* Call-to-Action Button */}
        <button className="btn btn-primary btn-md mt-2 hover:scale-105 transition-transform">
          Start Exploring Now
        </button>
      </div>
    </section>
  );
};

export default Banner;
