import React from "react";

const Profile = () => {
  // TODO: Replace these with actual user data from context or API
  const user = {
    name: "Jerin Loncheu",
    email: "jerin@example.com",
    photoURL: "https://i.ibb.co/3FfR4yL/user1.png",
    badges: ["Bronze"], // or ["Gold"] if member
    recentPosts: [
      { id: 1, title: "How to start with React?" },
      { id: 2, title: "Firebase auth issues" },
      { id: 3, title: "Understanding MongoDB" },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 rounded shadow-md">
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={user.photoURL}
          alt={user.name}
          className="w-24 h-24 rounded-full border-2 border-primary"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-800">{user.email}</p>
          <div className="mt-2 flex space-x-2">
            {user.badges.includes("Bronze") && (
              <span className="badge badge-warning">Bronze Badge</span>
            )}
            {user.badges.includes("Gold") && (
              <span className="badge badge-success">Gold Badge</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Recent Posts</h3>
        <ul className="list-disc list-inside space-y-1">
          {user.recentPosts.map((post) => (
            <li key={post.id} className="hover:text-primary cursor-pointer">
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
