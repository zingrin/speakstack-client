import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // debounce timer ref
  const debounceRef = useRef(null);

  // Fetch users (filtered from server) with debounce
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/apy/users?search=${searchTerm}`);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [axiosSecure, searchTerm]);

  // Handle make admin
  const handleMakeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/apy/users/admin/${id}`);
        if (res.data.modifiedCount > 0) {
          setUsers((prev) =>
            prev.map((user) =>
              user._id === id ? { ...user, role: "admin" } : user
            )
          );
          Swal.fire("Success!", "User is now an Admin!", "success");
        } else {
          Swal.fire("Info", "No changes were made.", "info");
        }
      } catch (error) {
        console.error("Admin update failed:", error);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-base-100 rounded shadow-md p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        👥 Manage Users
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:w-64"
          aria-label="Search users"
        />
      </div>

      {loading ? (
        <div className="text-center py-6 text-gray-600">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[600px] md:min-w-full">
            <thead>
              <tr>
                <th className="whitespace-nowrap">#</th>
                <th className="whitespace-nowrap">Name</th>
                <th className="whitespace-nowrap">Email</th>
                <th className="whitespace-nowrap">Role</th>
                <th className="whitespace-nowrap">Membership</th>
                <th className="whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="whitespace-nowrap">{index + 1}</td>
                    <td className="whitespace-nowrap">{user?.name || "Unknown"}</td>
                    <td className="whitespace-nowrap break-all">{user?.email}</td>
                    <td className="capitalize font-medium whitespace-nowrap">{user?.role || "user"}</td>
                    <td className="whitespace-nowrap">
                      {user?.membership === "member" || user?.membership === true
                        ? "✅ Member"
                        : "❌ Non-Member"}
                    </td>
                    <td className="whitespace-nowrap">
                      {user?.role !== "admin" ? (
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="btn btn-sm btn-primary"
                        >
                          Make Admin
                        </button>
                      ) : (
                        <span className="text-green-600 font-semibold">Admin</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
