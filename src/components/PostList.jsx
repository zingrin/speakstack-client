import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PostCard from "./PostCard";

const POSTS_PER_PAGE = 5;

const PostList = () => {
  const axiosSecure = useAxiosSecure();
  const [sortBy, setSortBy] = useState("newest");

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["posts", sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get("/posts", {
        params: {  limit: POSTS_PER_PAGE, sortBy },
      });
      return res.data;
    },
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts.</p>;

  
  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          className={`btn ${sortBy === "newest" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setSortBy("newest")}
        >
          Sort by Newest
        </button>
        <button
          className={`btn ${sortBy === "popularity" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setSortBy("popularity")}
        >
          Sort by Popularity
        </button>
      </div>

      <div className="space-y-6">
        {data.posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

    </div>
  );
};

export default PostList;
