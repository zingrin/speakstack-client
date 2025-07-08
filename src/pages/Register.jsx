import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { register,handleSubmit,formState:errors} = useForm();
    const {createUser} = useAuth();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password)
    .then(result =>{
        console.log(result);
    })
    .catch(error =>{
        console.log(error);
    })
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Create An Account!</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email",{required:true})}
              className="input"
              placeholder="Email"
            />
            {
                errors.email?.type === 'required' && <p className="text-red-500">
                    Email is required
                </p>
            }
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password",{required:true,minLength:6})}
              className="input"
              placeholder="Password"
            />
            {
                errors.password?.type === 'minLength' && <p className="text-red-500">
                    Password must be 6 characters or longer
                      </p>
            }

            <button className="btn btn-primary text-black mt-4">Register</button>
          </fieldset>
          <p><small>Already have an account?<Link className="btn btn-link" to="/login">Login</Link></small></p>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;