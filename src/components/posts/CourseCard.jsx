// import { useState } from "react";
// import { FaThumbsUp, FaCommentDots, FaEdit } from "react-icons/fa";
// import { MdOutlineUpdate } from "react-icons/md";
// import Swal from "sweetalert2";

// const CourseCard = ({ course, onUpdateComment }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [newComment, setNewComment] = useState(course?.comment || "");

//   const handleUpdate = () => {
//     onUpdateComment(course?._id, newComment);
//     setEditMode(false);
//     Swal.fire("Updated!", "Your comment has been updated.", "success");
//   };

//   return (
//     <div className="bg-base-100 text-gray-700 p-5 rounded-xl shadow-md space-y-3 w-full md:w-[300px]">
//       <img
//         src={course?.image}
//         alt={course?.title}
//         className="rounded-md w-full h-40 object-cover"
//       />
//       <h2 className="text-xl font-bold">{course?.title}</h2>
//       <p className="text-sm text-gray-500">
//         {course?.description?.slice(0, 60)}...
//       </p>

//       <div className="flex justify-between items-center mt-2">
//         <span className="flex items-center gap-1 text-sm text-blue-500">
//           <FaThumbsUp /> {course?.votes}
//         </span>
//         <button
//           className="text-blue-500 flex items-center gap-1 text-sm hover:underline"
//           onClick={() => setShowModal(true)}
//         >
//           <FaCommentDots /> Comments
//         </button>
//       </div>

//       <p className="text-xs text-gray-400">
//         Published: {new Date(course?.date).toLocaleString()}
//       </p>

//       {/* Comment Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="bg-white text-gray-800 rounded-lg w-11/12 max-w-md p-5 space-y-3 relative">
//             <button
//               className="absolute top-2 right-2 text-red-500"
//               onClick={() => setShowModal(false)}
//             >
//               ✖
//             </button>
//             <h3 className="text-lg font-bold mb-2">Your Comment</h3>

//             {editMode ? (
//               <>
//                 <textarea
//                   className="w-full border p-2 rounded-md"
//                   rows={4}
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                 />
//                 <button
//                   onClick={handleUpdate}
//                   className="mt-2 bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700"
//                 >
//                   <MdOutlineUpdate className="inline" /> Update
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p className="bg-gray-100 text-gray-600 p-3 rounded">
//                   {newComment || "No comment yet."}
//                 </p>
//                 <button
//                   onClick={() => setEditMode(true)}
//                   className="text-blue-600 flex items-center gap-1 hover:underline"
//                 >
//                   <FaEdit /> Edit Comment
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseCard;
