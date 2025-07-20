import React, { useContext, useEffect, useState } from 'react';
import { FaMedal } from 'react-icons/fa';
import AuthContext from '../../../contexts/AuthContexts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    // Get user info
    axiosSecure.get(`/users/${user?.email}`).then(res => {
      setUserInfo(res.data);
    });

    // Get 3 recent posts
    axiosSecure.get(`/posts?email=${user?.email}&limit=3&sort=desc`).then(res => {
      setRecentPosts(res.data);
    });
  }, [axiosSecure, user]);

  const { name, email, image, membership } = userInfo;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <img src={image} alt="User" className="w-24 h-24 rounded-full mx-auto" />
        <h2 className="text-2xl font-bold mt-2">{name}</h2>
        <p className="text-gray-600">{email}</p>

        {/* BADGES */}
        <div className="mt-4 flex justify-center gap-4">
          {membership === 'gold' && (
            <div className="badge badge-warning text-white">
              <FaMedal className="mr-1" /> Gold Member
            </div>
          )}
          {membership === 'bronze' && (
            <div className="badge badge-accent text-white">
              <FaMedal className="mr-1" /> Bronze Member
            </div>
          )}
        </div>
      </div>

      {/* RECENT POSTS */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">My Recent Posts</h3>
        {recentPosts.map(post => (
          <div key={post._id} className="bg-gray-100 p-4 rounded-lg mb-3">
            <h4 className="text-lg font-semibold">{post.title}</h4>
            <p className="text-sm text-gray-600">{post.description?.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
