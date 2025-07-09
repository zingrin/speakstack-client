import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaMedal } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [userInfo, setUserInfo] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // Fetch user profile info
      axiosSecure.get(`/users/profile/${user.email}`).then((res) => {
        setUserInfo(res.data);
      });

      // Fetch user's recent posts (limit 3)
      axiosSecure.get(`/posts?userEmail=${user.email}&limit=3`).then((res) => {
        setRecentPosts(res.data.posts || []);
      });
    }
  }, [user, axiosSecure]);

  const getBadge = () => {
    if (userInfo?.membership === "gold") {
      return (
        <div className="flex items-center gap-2 text-yellow-500">
          <FaMedal className="text-2xl" />
          <span>Gold Member</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 text-amber-600">
          <FaMedal className="text-2xl" />
          <span>Bronze Member</span>
        </div>
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* User Info Section */}
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-24 h-24 mx-auto rounded-full border-4 border-blue-500"
        />
        <h2 className="text-xl font-bold mt-4">{user?.displayName}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <div className="mt-4">{getBadge()}</div>
      </div>

      {/* Recent Posts Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">My Recent Posts</h3>
        {recentPosts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentPosts.map((post) => (
              <li
                key={post._id}
                className="border-b pb-3 border-dashed border-gray-300"
              >
                <h4 className="text-blue-700 font-medium">{post.title}</h4>
                <p className="text-sm text-gray-500">
                  {post.tags?.join(", ")} | Votes:{" "}
                  {post.upVote - post.downVote}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
