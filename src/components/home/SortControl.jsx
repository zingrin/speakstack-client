const SortControl = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex justify-end items-center gap-2 px-4 max-w-6xl mx-auto mt-4">
      <span className="text-sm">Sort By:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="select select-sm select-bordered"
      >
        <option value="newest">Newest</option>
        <option value="popular">Popularity</option>
      </select>
    </div>
  );
};

export default SortControl;
