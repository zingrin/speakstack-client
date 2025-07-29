import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/profile/${user.email}`)
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

  const roleDisplay =
    userInfo.role === "admin"
      ? "Admin"
      : userInfo.role === "member"
      ? "Gold Member"
      : "Regular User";

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl p-6 text-center">
      <img
        src={
          userInfo.image ||
          "https://ibb.co/RG2S55jJ"
        }
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto border-4 border-primary mb-4"
      />
      <h2 className="text-2xl font-bold mb-1">{userInfo.name || "No Name"}</h2>
      <p className="text-gray-600 mb-2">{userInfo.email}</p>

      <span className="inline-block mt-2 px-4 py-1 bg-primary text-white rounded-full">
        {roleDisplay}
      </span>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recent Posts</h3>
        <p className="text-sm text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
};

export default MyProfile;
