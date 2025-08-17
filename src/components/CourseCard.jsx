import React, { useState } from "react";
import Swal from "sweetalert2";

const CourseCard = ({ course }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleEnroll = () => setShowPopup(true);

  const handleConfirm = () => {
    setShowPopup(false);
    Swal.fire({
      icon: "success",
      title: "Enrollment Successful!",
      text: `You have enrolled in ${course.title}`,
    });
  };

  const handleCancel = () => {
    setShowPopup(false);
    Swal.fire({
      icon: "error",
      title: "Enrollment Cancelled!",
      text: `You did not enroll in ${course.title}`,
    });
  };

  const discountPercentage = parseInt(course.discount); 
  const totalPrice = (course.price * (100 - discountPercentage)) / 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition">
      <img
        src={course.image}
        alt={course.title}
        className="h-48 w-full object-cover group-hover:scale-105 duration-300"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p className="text-green-600 font-bold mt-1">🔥 {course.discount}</p>
        <p className="text-gray-700 font-semibold mt-1">Price: ${course.price}</p>
        <button
          onClick={handleEnroll}
          className="mt-4 btn btn-sm btn-primary rounded-full"
        >
          Enroll Now
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
            <p className="mb-2">Original Price: ${course.price}</p>
            <p className="mb-4">
              Discount: {course.discount} → Total: ${totalPrice.toFixed(2)}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="btn btn-sm btn-secondary rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="btn btn-sm btn-primary rounded-full"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
