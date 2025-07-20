
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const trendingCourses = [
  {
    title: "Fullstack MERN Bootcamp",
    discount: "45% OFF",
    image: "https://i.ibb.co/Lqw5W4x/images-q-tbn-ANd9-Gc-T4-Cg8-I01r4w-MRjsvb-14-GBW0rk-DYx-GHIh-K2-Grspwfl0u-DEKx-Ev1-Xp-LCa-Vjmj-Vd-Yr.jpg",
  },
  {
    title: "Data Science with Python",
    discount: "35% OFF",
    image: "https://i.ibb.co/fGY4xTSS/What-is-data-science-2.jpg",
  },
  {
    title: "Frontend Mastery",
    discount: "30% OFF",
    image: "https://i.ibb.co/TDfrnnT1/images-q-tbn-ANd9-Gc-QD7-ZQd-Yl24-Hqvbb-Iz7-Oa-SL-Ao-GU4-B0-SLi-ATkv9-U1-Hx-YCkg7-Hs1-Gi-Vr1-IJTL6b.jpg",
  },
  {
    title: "Backend with Node.js",
    discount: "40% OFF",
    image: "https://i.ibb.co/zVjdq67q/images-q-tbn-ANd9-Gc-Ss-Ts-J3hd-Diovlx-Ce-S18-LAM36zq4-0-M9o1j-VUZKHoho-Po184t-X3v5-ZPx1-Ip-SVKTC9-L.png",
  },
];

const TrendingCourses = () => {
  return (
    <section className="my-12 px-4 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary">
        🎯 Trending Courses with Discount!
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500 }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {trendingCourses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition">
              <img
                src={course.image}
                alt={course.title}
                className="h-48 w-full object-cover group-hover:scale-105 duration-300"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-green-600 font-bold mt-1">
                  🔥 {course.discount}
                </p>
                <button className="mt-4 btn btn-sm btn-primary rounded-full">
                  Enroll Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TrendingCourses;
