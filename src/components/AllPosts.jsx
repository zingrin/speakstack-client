// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAuth from "../hooks/useAuth";

// const AllPosts = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const axiosSecure = useAxiosSecure();

//   // 🔍 Search & Pagination State
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 6;

//   // 🔄 Fetch posts
//   const {
//     data,
//     isLoading,
//     refetch,
//     isError,
//   } = useQuery({
//     queryKey: ["all-posts", searchTerm, page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         // `/posts/all?search=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`
//       );
//       return res.data;
//     },
//     keepPreviousData: true,
//   });
//   console.log("Fetched Data:", data);


//   const posts = data?.posts || [];
//   const totalCount = data?.totalCount || 0;
//   const totalPages = Math.ceil(totalCount / limit);

  
//   // 🔼 Handle Upvote
//   const handleUpvote = async (post) => {
//     if (!user) return navigate("/login");
//     if (user?.email === post.ownerEmail) return;

//     try {
//       const res = await axiosSecure.put(`/posts/upvote/${post._id}`, {
//         voter: user.email,
//       });

//       if (res.data.modifiedCount > 0) {
//         refetch();
//         Swal.fire("Upvoted!", "Your vote has been counted.", "success");
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Something went wrong!", "error");
//     }
//   };

//   return (
//     <div className="px-4 py-8 max-w-6xl mx-auto">
//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search posts..."
//         className="input input-bordered w-full max-w-md mb-4"
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           setPage(1); // Reset page when searching
//         }}
//       />

//       {/* Loading / Error */}
//       {isLoading && <p>Loading...</p>}
//       {isError && <p>Failed to load posts.</p>}

//       {/* Post List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {posts.map((post) => (
//           <div key={post._id} className="border p-4 rounded shadow">
//             <h3 className="text-xl font-bold">{post.title}</h3>
//             <p>{post.content.slice(0, 100)}...</p>
//             <div className="mt-2 flex justify-between items-center">
//               <span>👍 {post.upvotes}</span>
//               <button
//                 className="btn btn-sm btn-primary"
//                 onClick={() => handleUpvote(post)}
//               >
//                 Upvote
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex justify-center gap-2">
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             className={`btn btn-sm ${i + 1 === page ? "btn-primary" : ""}`}
//             onClick={() => setPage(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllPosts;
