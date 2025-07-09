import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const RecentPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], isLoading, isError } = useQuery(
    ["recentPosts", user?.email],
    async () => {
      const res = await axiosSecure.get(`/posts?author=${user?.email}&limit=3&sort=desc`);
      return res.data;
    },
    {
      enabled: !!user?.email,
    }
  );

  if (isLoading) return <p>Loading recent posts...</p>;
  if (isError) return <p>Failed to load posts.</p>;
  if (posts.length === 0) return <p>No recent posts found.</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-3">Recent Posts</h3>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post._id} className="border-b pb-2">
            <a href={`/posts/${post._id}`} className="text-blue-600 hover:underline">
              {post.title}
            </a>
            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
