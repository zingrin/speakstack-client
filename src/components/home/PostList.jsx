import PostCard from "../posts/PostCard";

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center py-10 text-gray-500">No posts found.</p>;
  }

  return (
    <section className="grid gap-4 px-4 py-6 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>
  );
};

export default PostList;
