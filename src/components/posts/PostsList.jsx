import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">📭</div>
        <h3 className="text-xl font-semibold mb-2">No posts found</h3>
        <p className="text-gray-500 mb-4">Be the first to create a post!</p>
        <Link to="/posts/new" className="btn btn-primary">
          Create Post
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;