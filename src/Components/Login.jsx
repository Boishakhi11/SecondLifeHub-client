import React, { useContext, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext, googleProvider } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeDropper } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

const Login = () => {
  const { signInUser, googleSingIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Welcome to reUse Hub");
        //navigating user to route they requested otherwise homepage
        navigate(`${location.state ? location.state : "/"}`);
        form.reset();
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const handleGoogleLogin = () => {
    googleSingIn(googleProvider)
      .then((result) => {
        toast.success("Successfully logged In");
        navigate(`${location.state ? location.state : "/"}`);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // create user in database
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json)
          .then((data) => {
            console.log("saved in database", data);
          });
      })
      .catch((error) => {
        toast.error("Something went wrong");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-15">
      <div className="space-y-3">
        <h1 className="font-bold text-3xl text-center">Login</h1>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleLogin} className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
              />
              <span
                className="absolute top-3 right-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
              </span>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            <div>
              <p className="text-gray-500 text-center">
                Do not have an account?{" "}
                <Link
                  to="/auth/register"
                  className="link link-hover text-purple-500"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
          <p className="text-center"> or</p>
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-black"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
