import React, { useEffect, useState } from "react";
import { Link } from "react-router"; 
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/pets")
      .then((res) => {
        setPets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load pets:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading)
    return <div className="text-center py-10">Loading pets...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Available Pets</h2>

      {pets.length === 0 ? (
        <p className="text-center text-gray-500">No pets found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <figure className="w-full aspect-[4/3]">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-xl font-bold text-blue-800">{pet.name}</h3>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Type:</span> {pet.type}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Breed:</span> {pet.breed}
                </p>
                <p className="text-gray-800 my-2">
                  {pet.description?.slice(0, 100)}...
                </p>
                <p className="text-xs text-gray-500">
                  Posted on: {new Date(pet.postedAt).toLocaleDateString()}
                </p>

                <div className="mt-4">
                  <Link to={`/pet/${pet._id}`} className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white">
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
