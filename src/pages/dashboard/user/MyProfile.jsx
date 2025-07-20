import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import bronzeBadge from "../../../assets/bronzeBadge.jpg";
import goldBadge from "../../../assets/goldBadge.jpg";

const MyProfile = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isMember, setIsMember] = useState(false); // membership status
  const [loading, setLoading] = useState(true);
  const axiosSecure =useAxiosSecure();
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Check if user is a member
        const memberRes = await axiosSecure.get(`/users/membership-status?email=${user.email}`);
        setIsMember(memberRes.data.isMember);

        // Get recent 3 posts of the user
        const postsRes = await axiosSecure.get(`/posts/recent?userEmail=${user.email}&limit=3`);
        setPosts(postsRes.data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.photoURL || "https://via.placeholder.com/100"}
          alt={user.displayName}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{user.displayName}</h1>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex gap-4 mt-2">
            {/* Badges */}
            <img src={bronzeBadge} alt="Bronze Badge" title="Bronze Badge - Registered User" className="w-8 h-8" />
            {isMember && (
              <img src={goldBadge} alt="Gold Badge" title="Gold Badge - Member" className="w-8 h-8" />
            )}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">My Recent Posts</h2>
      <ul className="space-y-4">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <li key={post._id} className="p-4 border rounded">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500 mt-1">
                Created on: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MyProfile;
