import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PetDetails = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/pets/${id}`) 
      .then((res) => {
        setPet(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load pet:", err);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  if (loading) {
    return <div className="text-center py-10">Loading details...</div>;
  }

  if (!pet) {
    return <div className="text-center py-10">Pet not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Pet Image */}
        <div>
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full rounded-xl shadow-lg object-cover aspect-[4/3]"
          />
        </div>

        {/* Pet Details */}
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">{pet.name}</h2>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Type:</span> {pet.type}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Breed:</span> {pet.breed}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Age:</span> {pet.age}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Gender:</span> {pet.gender}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Location:</span> {pet.location}
          </p>
          <p className="text-gray-800 mb-2">
            <span className="font-semibold">Posted On:</span>{" "}
            {new Date(pet.postedAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mt-4">{pet.description}</p>

          {/* Back Button */}
          <Link
            to="/allPets"
            className="inline-block mt-6 btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            ← Back to All Pets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
