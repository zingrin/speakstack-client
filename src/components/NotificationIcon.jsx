import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const NotificationIcon = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get("https://your-server-url/announcement-count").then((res) => {
      setCount(res.data.count);
    });
  }, []);

  return (
    <div className="relative">
      <FaBell className="text-xl" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
