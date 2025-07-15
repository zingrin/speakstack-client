import { useState } from "react";
import Banner from "../components/home/Banner";
import TagFilter from "../components/home/TagFilter";
import AnnouncementList from "../components/home/AnnouncementList";
import SortControl from "../components/home/SortControl";
import PostList from "../components/home/PostList";
import Pagination from "../components/home/Pagination";
import WhyChooseUs from "../components/WhyChooseUs";


const Home = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  // Assume fetched via React Query
  const posts = []; // replace with real data
  const tags = ["React", "MERN", "Auth"];
  const announcements = [];

  return (
    <>
      <Banner onSearch={setSearch} />
      <TagFilter tags={tags} onTagClick={setSearch} />
      <AnnouncementList announcements={announcements} />
      <SortControl sortBy={sortBy} setSortBy={setSortBy} />
      <PostList posts={posts} />
      <Pagination page={page} totalPages={5} onPageChange={setPage} />
      <WhyChooseUs></WhyChooseUs>
    </>
  );
};

export default Home;
