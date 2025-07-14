import { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceData = [
    {
      id: 1,
      title: "Expert Q&A Sessions",
      description: "Join weekly live sessions where experts answer your toughest questions about pet care, training, and health.",
      image: "https://i.ibb.co/LXg0xXhw/male2.jpg"
    },
    {
      id: 2,
      title: "Community Discussion Forums",
      description: "Engage with other pet lovers, share stories, tips, and experiences in a friendly moderated environment.",
      image: "https://i.ibb.co/HpHvZHTt/images-q-tbn-ANd9-Gc-Tj-QWkfunc-LASQHEm-Ak-DM9-lgcwi1xk-LJJ9-Ov-KGKfkfw-DNKk-V3-CSKU-c-Ko-IJw-Pp-PTv.jpg"
    },
    {
      id: 3,
      title: "Membership Badge Perks",
      description: "Unlock exclusive badges, vote power boosts, and visibility features by becoming a premium member.",
      image: "https://i.ibb.co/xqvgnwwY/images-q-tbn-ANd9-Gc-TXr0851d-UHJUGRm-THevy-Hrff-ALHmmn-KUn-Etg-s.jpg"
    },
    {
      id: 4,
      title: "Pet Adoption Directory",
      description: "Browse our curated list of pets available for adoption from trusted local organizations.",
      image: "https://i.ibb.co/sT2h70v/images-q-tbn-ANd9-Gc-RCM6-R-7a-Mr-W0reb253-Uvh-W9-Vta32zw0jvj-Xrs-Qby-I8-Nq-LWKo-IT-8jx04-Pz-XHAGs-Y.jpg"
    },
    {
      id: 5,
      title: "Monthly Contests & Giveaways",
      description: "Submit posts, earn upvotes, and stand a chance to win exciting prizes every month!",
      image: "https://i.ibb.co/C59fxsgB/images-q-tbn-ANd9-Gc-Se-HHHWu-JTYEiuvjjvid-Eq-Gj-YZUf-If-Ki-SAc-B7-Dln-My1-VB2-BLE6hb-Ri7r-Zos-SS955.jpg"
    },
    {
      id: 6,
      title: "Moderator Support",
      description: "Report inappropriate content or ask for help — our moderators are always ready to assist.",
      image: "https://i.ibb.co/SXpZDyS4/images-q-tbn-ANd9-Gc-Qtyr-GN03-F-Pkn4-CXQRrl-UNz2-GR3i-Ohb-Xcmeww-Hwk-SZ-hn7-RND477p8-NMpywzb-P4m3e.png"
    }
  ];

  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      setServices(serviceData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        🐾 Our Services
      </h2>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-start gap-4 group hover:bg-gray-50 p-3 rounded-xl transition cursor-pointer"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
