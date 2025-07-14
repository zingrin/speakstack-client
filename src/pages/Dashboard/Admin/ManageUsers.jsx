import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await axiosSecure.get(`/users?search=${search}`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleMakeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are making this user an admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, promote!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "User promoted to admin.", "success");
        fetchUsers(); 
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <input
        type="text"
        placeholder="Search by username"
        className="input input-bordered mb-4 w-full max-w-xs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Membership</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="badge badge-success">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {user.isMember ? (
                    <span className="badge badge-info">Member</span>
                  ) : (
                    <span className="badge">Free</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
