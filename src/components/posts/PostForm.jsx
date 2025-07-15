import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const PostForm = ({ onSubmit, existingPost }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: existingPost || {
      title: "",
      tags: "",
      content: ""
    }
  });

  useEffect(() => {
    if (existingPost) {
      setValue("title", existingPost.title);
      setValue("tags", existingPost.tags.join(", "));
      setValue("content", existingPost.content);
    }
  }, [existingPost, setValue]);

  const submitHandler = (data) => {
    const tagsArray = data.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSubmit({
      ...data,
      tags: tagsArray
    });
  };

  return (
    <div className="card bg-base-100 shadow-lg max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">
          {existingPost ? "Edit Post" : "Create New Post"}
        </h2>
        
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered"
              placeholder="Enter post title"
            />
            {errors.title && (
              <span className="text-error text-sm">{errors.title.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tags (comma separated)</span>
            </label>
            <input
              type="text"
              {...register("tags")}
              className="input input-bordered"
              placeholder="react, javascript, webdev"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              {...register("content", { required: "Content is required" })}
              className="textarea textarea-bordered h-40"
              placeholder="Write your post content here..."
            />
            {errors.content && (
              <span className="text-error text-sm">{errors.content.message}</span>
            )}
          </div>

          <div className="card-actions justify-end">
            <button 
              type="button" 
              className="btn btn-ghost"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {existingPost ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;