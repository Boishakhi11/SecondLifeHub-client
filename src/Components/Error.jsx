import React from "react";
import Img from "../assets/error.jpg";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img className="h-[80vh]" src={Img} alt="404 Error" />
      <Link to="/" className="btn btn-primary">
        {" "}
        Return Home{" "}
      </Link>
    </div>
  );
};

export default Error;
