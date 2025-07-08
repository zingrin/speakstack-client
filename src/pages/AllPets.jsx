import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/pets")
      .then(res => {
        setPets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load pets:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading pets...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Available Pets</h2>

      {pets.length === 0 ? (
        <p className="text-center text-gray-500">No pets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="card shadow-md border hover:shadow-lg transition duration-300"
            >
              <figure>
                <img src={pet.image} alt={pet.name} className="w-full h-60 object-cover" />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-bold">{pet.name}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Type:</span> {pet.type}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Breed:</span> {pet.breed}
                </p>
                <p className="text-gray-700 my-2">
                  {pet.description?.slice(0, 100)}...
                </p>
                <p className="text-xs text-gray-400">
                  Posted on: {new Date(pet.postedAt).toLocaleDateString()}
                </p>

                <div className="mt-2">
                  <Link to={`/pet/${pet._id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPets;
