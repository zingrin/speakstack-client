import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import AuthContext from '../contexts/AuthContexts';

const MembershipPage = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const handlePayment = async () => {
    try {
      // Fake payment success
      const res = await axiosSecure.patch(`/users/membership/${user?.email}`, {
        membership: 'gold',
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire('Success!', 'You are now a Gold Member!', 'success');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Payment failed.', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center p-10">
      <h2 className="text-2xl font-bold mb-4">Become a Gold Member</h2>
      <p className="mb-6">Pay ৳500 to unlock unlimited posts and Gold badge!</p>
      <button onClick={handlePayment} className="btn btn-warning text-white px-6">
        Pay ৳500
      </button>
    </div>
  );
};

export default MembershipPage;
