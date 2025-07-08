import React from 'react';
import { Link} from 'react-router';

const JoinUs = () => {
    return (
       <div className="flex flex-col items-center justify-center">
  <h2 className="text-xl font-bold mb-6">Join PawTrack</h2>
  <Link to="/login" className="btn btn-primary mb-4 w-40">Login</Link>
  <Link to="/register" className="btn btn-secondary mb-4 w-40">Register</Link>
  <button className="btn btn-primary w-40 ">
  <Link to="/">Back To Home</Link>
</button>
</div>

    );
};

export default JoinUs;