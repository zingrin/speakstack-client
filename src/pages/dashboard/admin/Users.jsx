// import React, { useEffect, useState } from "react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     // TODO: API কল দিয়ে ইউজার ডাটা নিয়ে আসবে
//     setUsers([
//       { id: 1, name: "Jerin", email: "jerin@example.com", isAdmin: false, isMember: true },
//       { id: 2, name: "Tonmoy", email: "tonmoy@example.com", isAdmin: true, isMember: false },
//     ]);
//   }, []);

//   const handleMakeAdmin = (id) => {
//     // TODO: API কল করে ইউজারকে অ্যাডমিন বানাবে
//     alert(`Make user with id ${id} admin`);
//     setUsers((prev) =>
//       prev.map((user) =>
//         user.id === id ? { ...user, isAdmin: true } : user
//       )
//     );
//   };

//   // সার্চ ফিল্টার
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="max-w-5xl mx-auto bg-white rounded shadow-md p-6">
//       <h3 className="text-xl font-semibold mb-4">Manage Users</h3>
//       <input
//         type="text"
//         placeholder="Search by username"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="input input-bordered w-full max-w-sm mb-4"
//       />

//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Admin</th>
//               <th>Membership</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map(({ id, name, email, isAdmin, isMember }) => (
//               <tr key={id}>
//                 <td>{name}</td>
//                 <td>{email}</td>
//                 <td>{isAdmin ? "Yes" : "No"}</td>
//                 <td>{isMember ? "Member" : "Non-Member"}</td>
//                 <td>
//                   {!isAdmin && (
//                     <button
//                       onClick={() => handleMakeAdmin(id)}
//                       className="btn btn-sm btn-primary"
//                     >
//                       Make Admin
//                     </button>
//                   )}
//                   {isAdmin && <span className="text-green-600 font-semibold">Admin</span>}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Users;
