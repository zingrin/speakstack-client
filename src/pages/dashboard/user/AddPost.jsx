import React, { useState, useEffect } from "react";

const AddPost = () => {
  // ফেক ইউজার পোস্ট কাউন্ট (পরে API থেকে আনতে হবে)
  const [postCount, setPostCount] = useState(0);

  // ফেক মেম্বার স্টেট
  const [isMember, setIsMember] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  useEffect(() => {
    // এখানে API কল করে ইউজারের পোস্ট কাউন্ট ও মেম্বার স্ট্যাটাস আনবেন
    // উদাহরণ সরুপ:
    setPostCount(3);
    setIsMember(false);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: পোস্ট সাবমিট API কল করো এখানে
    alert("Post submitted: " + JSON.stringify(formData));
    // সাবমিটের পর ফর্ম ক্লিয়ার করতে পারো
    setFormData({
      title: "",
      description: "",
      tag: "",
    });
  };

  // যদি নরমাল ইউজার 5 এর বেশি পোস্ট করে থাকে তবে মেম্বার হওয়ার জন্য প্রম্পট দেখাবে
  if (!isMember && postCount >= 5) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Post Limit Reached</h2>
        <p className="mb-6">You have reached your 5 post limit. Become a member to add more posts.</p>
        <button
          onClick={() => {
            // Membership পেজে রিডাইরেক্ট (react-router এর useNavigate ব্যবহার করতে পারো)
            window.location.href = "/membership";
          }}
          className="btn btn-primary"
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add a New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Post Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Post Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
            placeholder="Write your post description"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tag</label>
          <select
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select a tag</option>
            <option value="react">React</option>
            <option value="firebase">Firebase</option>
            <option value="auth">Auth</option>
            <option value="mongodb">MongoDB</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
