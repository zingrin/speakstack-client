import { useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import TagFilter from "../components/TagFilter";
import Pagination from "../components/home/Pagination";
import WhyChooseUs from "../components/WhyChooseUs";
import PostCard from "../components/PostCard";
import FeaturedDiscussion from "../components/home/FeaturedDiscussion";
import TrendingCourses from "./TrendngCourses";
import AnnouncementsSection from "../components/ui/AnnouncementsSection";

const POSTS_PER_PAGE = 5;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFiltered(data);
      });
  }, []);

  const handleTagSearch = (tag = "", sortBy = "newest") => {
    let url = "http://localhost:5000/posts";

    if (tag) url += `/tag/${tag}`;
    url += `?sort=${sortBy}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFiltered(data);
        setPage(1);
      });
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginatedPosts = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <>
      <Banner onSearch={handleTagSearch} />
      <TagFilter onTagClick={handleTagSearch} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No posts found for this tag.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
      <AnnouncementsSection></AnnouncementsSection>
      <FeaturedDiscussion></FeaturedDiscussion>
      <TrendingCourses></TrendingCourses>
      <WhyChooseUs />
    </>
  );
};

export default Home;
