import React from "react";

const AnnouncementCard = ({ announcement }) => {
  const { authorName, authorImage, title, description, date } = announcement;

  // date কে সুন্দর readable format এ convert করবো
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card bg-base-100 shadow-md p-4 rounded-md mb-4">
      <div className="flex items-center space-x-4 mb-3">
        <img
          src={authorImage || "https://i.ibb.co/3FfR4yL/user1.png"}
          alt={authorName}
          className="w-12 h-12 rounded-full border border-gray-300"
        />
        <div>
          <h4 className="font-semibold text-lg">{authorName}</h4>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default AnnouncementCard;
