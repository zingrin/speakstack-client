import React, { useState } from "react";

const TagFilter = ({ onChange, initialTag = "", initialSort = "newest" }) => {
  const [activeTag, setActiveTag] = useState(initialTag);
  const [sortBy, setSortBy] = useState(initialSort);
  const [input, setInput] = useState("");

  // Apply changes: lowercase tag & call parent
  const applyChange = (nextTag = activeTag, nextSort = sortBy) => {
    const tagToSend = nextTag.trim().toLowerCase();
    setActiveTag(tagToSend);
    setSortBy(nextSort);
    onChange?.({ tag: tagToSend, sort: nextSort });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyChange(input, sortBy);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col md:flex-row gap-4 items-center justify-center">
      {/* Search Input + Button */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search by tag..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input input-bordered input-sm w-full md:w-48"
        />
        <button type="submit" className="btn btn-sm btn-secondary">
          Search
        </button>
      </form>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => applyChange(activeTag, e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="newest">Newest Post</option>
          <option value="oldest">Oldest Post</option>
        </select>
      </div>
    </div>
  );
};

export default TagFilter;
