import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/profile/${user.email}`)

        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [user, axiosSecure]);

  if (loading || !userInfo) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl p-6 text-center">
      <img
        src={userInfo.image || "https://i.ibb.co/yV6h2Rp/user.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto border-4 border-primary mb-4"
      />
      <h2 className="text-2xl font-bold mb-1">{userInfo.name || "No Name"}</h2>
      <p className="text-gray-600 mb-2">{userInfo.email}</p>

      {userInfo.membership === "gold" && (
        <div className="flex items-center justify-center mt-2 text-yellow-500">
          <FaCrown className="mr-1" />
          <span className="font-semibold">Gold Member</span>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Posts</h3>
        <p className="text-sm text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
};

export default MyProfile;
