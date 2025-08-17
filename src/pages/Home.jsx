import Banner from "../components/home/Banner";
import TagFilter from "../components/TagFilter";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedDiscussion from "../components/home/FeaturedDiscussion";
import TrendingCourses from "./TrendngCourses";
import AnnouncementsSection from "../components/ui/AnnouncementsSection";
import Services from "../components/Services";
import AllPosts from "../components/AllPost";

const Home = () => {
  return (
    <>
      {/* Banner and Tag Filter */}
      <Banner />
      <TagFilter />

      {/* All Posts with Pagination handled inside */}
      <AllPosts />

      {/* Other sections */}
      <AnnouncementsSection />
      <FeaturedDiscussion />
      <TrendingCourses />
      <WhyChooseUs />
      <Services />
    </>
  );
};

export default Home;
