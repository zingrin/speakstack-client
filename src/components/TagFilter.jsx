const TagFilter = ({ onTagClick }) => {
  const tags = ["React", "JavaScript", "MongoDB", "CSS"];

  return (
    <div className="flex gap-2 flex-wrap my-4">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag.toLowerCase())}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-blue-500 hover:text-white"
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
