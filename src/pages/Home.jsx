import Banner from "../components/home/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedDiscussion from "../components/home/FeaturedDiscussion";
import TrendingCourses from "./TrendngCourses";
import AnnouncementsSection from "../components/ui/AnnouncementsSection";
import Services from "../components/Services";
import AllPosts from "../components/AllPost";

const Home = () => {
  return (
    <>
      <Banner />

      <AllPosts />

      <AnnouncementsSection />
      <FeaturedDiscussion />
      <TrendingCourses />
      <WhyChooseUs />
      <Services />
    </>
  );
};

export default Home;
