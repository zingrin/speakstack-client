const TagFilter = ({ tags, onTagClick }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <section className="py-6 px-4 max-w-6xl mx-auto">
      <h2 className="text-lg font-semibold mb-2">Browse Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="badge badge-outline badge-lg hover:bg-primary hover:text-white"
          >
            #{tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TagFilter;
