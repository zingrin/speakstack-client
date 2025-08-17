import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const TrendingCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/trending-courses/${id}`)
      .then(res => res.json())
      .then(data => setCourse(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!course) return <p className="text-center text-red-600 mt-10">Loading...</p>;

  const handleEnroll = () => {
    const discountPercentage = parseInt(course.discount);
    const totalPrice = (course.price * (100 - discountPercentage)) / 100;

    Swal.fire({
      title: `Enroll in ${course.title}?`,
      html: `
        <strong>Original Price:</strong> $${course.price} <br/>
        <strong>Discount:</strong> ${course.discount} <br/>
        <strong>Total Price:</strong> $${totalPrice.toFixed(2)}
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Enrollment Successful!",
          text: `You have enrolled in ${course.title}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Enrollment Cancelled",
          text: `You did not enroll in ${course.title}`,
        });
      }
    });
  };

  return (
    <div className="px-4 md:px-20 py-10">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-secondary mb-6"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-4 max-w-md mx-auto">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <h3 className="text-2xl font-bold">{course.title}</h3>
        <p className="text-green-600 font-bold mt-1">🔥 {course.discount}</p>
        <p className="text-gray-700 font-semibold mt-1">Price: ${course.price}</p>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <button
          onClick={handleEnroll}
          className="mt-4 btn btn-primary w-full rounded-full"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default TrendingCourseDetail;
