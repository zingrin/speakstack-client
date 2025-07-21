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
    <div className="max-w-6xl mx-auto bg-white dark:bg-base-100 rounded shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Manage Users</h2>

      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full max-w-sm mb-4"
      />

      {loading ? (
        <div className="text-center py-6 text-gray-600">Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Membership</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users?.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    
                    <td>{user?.name || "Unknown"}</td>
                    <td>{user?.email}</td>
                    <td className="capitalize font-medium">{user?.role || "user"}</td>
                    <td>
                      {user?.membership === "member" || user?.membership === true
                        ? "✅ Member"
                        : "❌ Non-Member"}
                    </td>
                    <td>
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
                  <td colSpan="7" className="text-center py-4 text-gray-500">
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
