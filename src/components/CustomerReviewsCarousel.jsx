import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const CustomerReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const demoReviews = [
      {
        id: 1,
        name: "Nadia Rahman",
        photo: "https://i.ibb.co/4RStGgww/woman-photographer-working-23-2148503530.jpg",
        review: "PawTrack has helped me find answers to all my pet questions. The community is amazing!",
        rating: 5,
      },
      {
        id: 2,
        name: "Tanvir Alam",
        photo: "https://i.ibb.co/CK1sFLZL/professional-camera-with-external-display-shooting-young-man-1268-21876.jpg",
        review: "The expert Q&A sessions are gold! My dog training has improved a lot. Highly recommended.",
        rating: 4,
      },
      {
        id: 3,
        name: "Rini Akter",
        photo: "https://i.ibb.co/d4t54dQ4/cheerful-beautiful-young-asian-woman-feeling-happy-smiling-camera-while-traveling-street-downtown-ci.jpg",
        review: "Loved the badge perks after membership! Great UI and support.",
        rating: 5,
      },
      {
        id: 4,
        name: "Sajib Khan",
        photo: "https://i.ibb.co/F46tkKDH/pexels-photo-1121796.webp",
        review: "Moderator support is very helpful and quick. Great community vibes!",
        rating: 5,
      },
      {
        id: 5,
        name: "Rumana Akter",
        photo: "https://i.ibb.co/8LcNz3wz/images.jpg",
        review: "Great community and helpful moderators. Loving it here!",
        rating: 4,
      },
      {
        id: 6,
        name: "Farhan Hossain",
        photo: "https://i.ibb.co/tpYxhSGG/smiling-young-financial-manager-showing-charts-graphs-white-board-1098-19846.jpg",
        review: "The membership perks are really useful. Highly recommend!",
        rating: 5,
      },
      {
        id: 7,
        name: "Sadia Islam",
        photo: "https://i.ibb.co/4RStGgww/woman-photographer-working-23-2148503530.jpg",
        review: "I found my favorite pets here. Very user friendly!",
        rating: 5,
      },
      {
        id: 8,
        name: "Arif Hasan",
        photo: "https://i.ibb.co/7tgkg3Ls/high-angle-man-artist-painting-canvas-23-2148422150.jpg",
        review: "Love the monthly contests and giveaways. Keeps things exciting!",
        rating: 4,
      },
      {
        id: 9,
        name: "Mita Chowdhury",
        photo: "https://i.ibb.co/845Q7pHp/d3rzp-512.webp",
        review: "A fantastic platform for all pet lovers. Highly recommended!",
        rating: 5,
      },
    ];
    setReviews(demoReviews);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        💬 What Our Users Say
      </h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        spaceBetween={30}
        slidesPerView={3} 
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true} 
        grabCursor={true}
        breakpoints={{
          320: { slidesPerView: 1 }, 
          640: { slidesPerView: 2 }, 
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((rev) => (
          <SwiperSlide key={rev.id}>
            <div className="bg-white shadow-md rounded-2xl p-6 text-center border hover:shadow-xl transition cursor-default mx-3">
              <img
                src={rev.photo}
                alt={rev.name}
                className="w-16 h-16 mx-auto rounded-full mb-4 border-2 border-blue-500"
              />
              <h3 className="text-lg font-semibold text-gray-800">{rev.name}</h3>
              <p className="text-sm text-gray-600 mt-2 mb-4">"{rev.review}"</p>
              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl select-none">
                    {i < rev.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomerReviewsCarousel;
