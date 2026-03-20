import React from "react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="h-[50vh] bg-[url('/CurveLine.svg')] bg-cover bg-center space-y-4">
      <h1 className="text-4xl lg:text-6xl font-bold text-center">
        Deal Your <span className="text-purple-400">Products</span>
      </h1>
      <h1 className="text-4xl lg:text-6xl font-bold text-center">
        In A <span className="text-purple-400">Smart</span> Way!
      </h1>
      <p className="text-center text-gray-400">
        reUseHub helps you sell, resell and shop from trusted local sellers –
        all in one place!
      </p>
      {/* Centered Search Box */}
      <div className="flex justify-center w-full">
        <div className="flex w-full max-w-md">
          <input
            type="text"
            placeholder="Search by Products, Categories"
            className="w-full px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none"
          />

          <button className="cursor-pointer px-6 py-2 bg-purple-500 text-white rounded-r-lg hover:bg-purple-400 transition">
            Search
          </button>
        </div>
      </div>
      {/* buttons */}
      <div className="flex justify-center items-center gap-4">
        <Link to="/products" className="btn bg-purple-500 text-white">
          Watch All Products
        </Link>
        <Link
          to="/login"
          className="btn border border-purple-500 text-purple-500"
        >
          Post an Product
        </Link>
      </div>
    </div>
  );
};

export default Hero;
