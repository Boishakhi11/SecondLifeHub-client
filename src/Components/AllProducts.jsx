import React from "react";
import { useLoaderData } from "react-router";
import Product from "./Product";

const AllProducts = () => {
  const data = useLoaderData();

  return (
    <div className="mb-20 mt-5 space-y-10">
      <h1 className="text-center text-4xl lg:text-6xl font-semibold">
        All <span className="text-purple-500">Products</span>
      </h1>
      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 space-y-4 ">
        {data.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
