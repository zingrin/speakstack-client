import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showList, setShowList] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch notifications from backend API
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications"); // তোমার API এন্ডপয়েন্ট সেট করো
        setNotifications(res.data);
        const unread = res.data.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();

    // Optionally poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowList((prev) => !prev);
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(`/api/notifications/${id}/read`); // তোমার API অনুযায়ী চেঞ্জ করো
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="btn btn-ghost btn-circle relative"
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <FaBell size={20} />
        {unreadCount > 0 && (
          <div className="badge badge-secondary badge-sm absolute top-0 right-0">
            {unreadCount}
          </div>
        )}
      </button>

      {showList && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded shadow-lg z-50 overflow-auto max-h-80">
          <h4 className="font-semibold p-3 border-b">Notifications</h4>
          {notifications.length === 0 && (
            <p className="p-3 text-center text-gray-500">No notifications</p>
          )}

          <ul>
            {notifications.map((n) => (
              <li
                key={n._id}
                className={`p-3 cursor-pointer border-b hover:bg-gray-100 ${
                  !n.read ? "bg-blue-50 font-semibold" : ""
                }`}
                onClick={() => markAsRead(n._id)}
                title={n.message}
              >
                <p className="truncate">{n.message}</p>
                <small className="text-xs text-gray-400">
                  {new Date(n.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;
