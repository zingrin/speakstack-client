import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const TAG_OPTIONS = [
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "sports", label: "Sports" },
  { value: "health", label: "Health" },
];

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [postCount, setPostCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState(""); 

  const UPVOTE_DEFAULT = 0;
  const DOWNVOTE_DEFAULT = 0;

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        setLoadingCount(true);
        const res = await axiosSecure.get(`/posts/count?authorEmail=${user?.email}`);
        setPostCount(res.data.count);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch your post count", "error");
      } finally {
        setLoadingCount(false);
      }
    };

    if (user?.email) fetchPostCount();
  }, [user?.email, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !tag) {
      Swal.fire("Validation Error", "Please fill all the required fields", "warning");
      return;
    }

    const postData = {
      authorImage: user.photoURL || "",
      authorName: user.displayName || "Anonymous",
      authorEmail: user.email,
      title: title.trim(),
      description: description.trim(),
      tag: tag, 
      upVote: UPVOTE_DEFAULT,
      downVote: DOWNVOTE_DEFAULT,
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/posts", postData);
      Swal.fire("Success", "Post added successfully", "success");
      setTitle("");
      setDescription("");
      setTag("");
      setPostCount((c) => c + 1);
    } catch (error) {
      Swal.fire("Error", "Failed to add post", "error");
    }
  };

  const handleBecomeMember = () => {
    navigate("/membership");
  };

  if (loadingCount) return <p>Loading...</p>;

  // Limit 5 posts for normal users
  const isLimitExceeded = postCount >= 5 && (!user?.role || user.role === "user");

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Add Post</h2>

      {isLimitExceeded ? (
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-red-600">
            You have reached the limit of 5 posts.
          </p>
          <button className="btn btn-primary" onClick={handleBecomeMember}>
            Become a Member
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Author Image</label>
            <input
              type="text"
              value={user?.photoURL || ""}
              disabled
              className="input input-bordered w-full cursor-not-allowed bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Author Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              disabled
              className="input input-bordered w-full cursor-not-allowed bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Author Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="input input-bordered w-full cursor-not-allowed bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Post Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Post Description</label>
            <textarea
              placeholder="Write post description"
              className="textarea textarea-bordered w-full"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="input input-bordered w-full"
              required
            >
              <option value="" disabled>
                Select a tag
              </option>
              {TAG_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* UpVote and DownVote are default 0, no inputs */}

          <button type="submit" className="btn btn-primary w-full mt-4">
            Submit Post
          </button>
        </form>
      )}
    </div>
  );
};

export default AddPost;
