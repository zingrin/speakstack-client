import React from 'react';

const JoinUs = () => {
    return (
       <div className="flex flex-col items-center justify-center">
  <h2 className="text-xl font-bold mb-4">Join PawTrack</h2>
  <Link to="/login" className="btn btn-primary mb-2 w-40">Login</Link>
  <Link to="/register" className="btn btn-secondary w-40">Register</Link>
</div>

    );
};

export default JoinUs;