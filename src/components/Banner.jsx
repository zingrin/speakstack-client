import React, { useState } from "react";
import axios from "axios";

const Banner = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!keyword) return;
    try {
      const { data } = await axios.get(
        `https://http://localhost:5000/posts/search?keyword=${keyword}`
      );
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <section className=" bg-[url('https://i.ibb.co/VnfS7Vg/images-q-tbn-ANd9-Gc-SEPp-HS01-LQi1s-H2-MNr-Ev7515yzt7-Ei2-Zs-KQ-s.jpg')] bg-cover bg-center py-16 px-6">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Search by Tags</h1>
        <div className="flex items-center gap-2 justify-center">
          <input
            type="text"
            placeholder="Search posts by tag..."
            className="input input-bordered w-full max-w-xs text-black"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>

        {/* Display Search Results Below */}
        <div className="mt-10">
          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((post) => (
                <div key={post._id} className="bg-white p-4 rounded shadow text-black">
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.description.slice(0, 100)}...</p>
                  <div className="mt-2 text-xs text-primary">#{post.tags.join(" #")}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
