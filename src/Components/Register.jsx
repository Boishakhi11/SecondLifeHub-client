import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser } = use(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo, email, password);
    form.reset();

    createUser(email, password).then((userCredential) => {
      const user = userCredential.user;
      toast.success("Account Created Succesfully").catch((error) => {
        toast.error("Something Went wrong");
      });
    });
  };
  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-15">
      <div className="space-y-3">
        <h1 className="font-bold text-3xl text-center">Register Now!</h1>
        <p className="text-l text-center">
          {" "}
          Are you not registered yet? <br /> Register today and start recycling
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegister} className="fieldset">
            <label className="label">Name</label>
            <input
              name="name"
              type="name"
              className="input"
              placeholder="Name"
            />
            <label className="label">Photo</label>
            <input
              name="photo"
              type="url"
              className="input"
              placeholder="Photo"
            />
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
          </form>
          <p className="text-center"> or</p>

          <div>
            <p className="text-gray-500 text-center">
              Already Registered?{" "}
              <Link
                to="/auth/login"
                className="link link-hover text-purple-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
