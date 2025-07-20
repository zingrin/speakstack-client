import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search.trim());
    }
  };

  const images = [
    "https://i.ibb.co/XRy6dhR/images-q-tbn-ANd9-Gc-SVzb7z-Mf-MWArq-Wuic-Kqt-V-5td-PMMotv-MM-Kj-GUg-IBzt-HSIIHrs-Klv-TPb-X3z1dl5-LV.jpg",
    "https://i.ibb.co/JjFw75fk/images-q-tbn-ANd9-Gc-Q9l-OODpz9z-XUdp-Doe8-HU5-YKkd-ky-XQKd-Dz2-Pbh-Gt5-UIIq-Yy2qcx3uc8-UETRLT9n-Ky.jpg",
    "https://i.ibb.co/1fcNBYz8/1689166016117-e-2147483647-v-beta-t-LAcj-Bx-Dv3-C07v-NQNVVKij-PGWX3d-HAKNx2-DA50-XPEc-SU.png",
    "https://i.ibb.co/fdK2GZVy/images-q-tbn-ANd9-Gc-Q4-Qt-CNa-FYp-Li-Lm-UOdw-NO8io-TNXp-TOFr-NEQgv-CNHh-FPM5-Td-It-Z4-FOFS5-j0-Tl-Z.jpg",
    "https://i.ibb.co/SDy9HCQ7/images-q-tbn-ANd9-Gc-SIGQh-DR9ihj-Yl0yg-Ddkx-Kw-XF-6x-Vy-Nh-W0061-Bk-Awc-Hr-Od0xa-PWG-y-i-Fc-G6m-Vz.jpg",
    "https://i.ibb.co/h1725wM7/images-q-tbn-ANd9-Gc-Qv4r-Fi-Kxcc-GGl50ndhy-TSd-ZNYk5k-Ui4-T8-Or-D2-GY8nren-BY41-LLpk-GMn-Yc-Qh-H0-R.jpg",
  ];

  const tags = ["React", "JavaScript", "MongoDB", "CSS", "NodeJS", "Tailwind"];

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
      <div className="absolute inset-0 bg-opacity-60 flex flex-col justify-center items-center text-center space-y-6 px-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Explore Conversations
        </h1>
        <p className="text-base md:text-lg text-gray-200">
          Search discussions by tags and topics
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Search by tag..."
            className="input input-bordered w-full text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary w-full sm:w-auto">
            Search
          </button>
        </form>

        <div className="text-sm flex justify-center gap-3 flex-wrap">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="badge badge-outline cursor-pointer hover:badge-secondary transition"
              onClick={() => onSearch(tag.toLowerCase())}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
