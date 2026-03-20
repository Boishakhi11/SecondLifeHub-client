import React from "react";

import { use } from "react";
import Product from "./Product";
import { Link } from "react-router";

const RecentProducts = ({ latestProducts }) => {
  const productsdata = use(latestProducts);
  console.log(productsdata);
  return (
    <div className="space-y-7">
      <h1 className="text-center text-3xl lg:text-5xl font-semibold">
        {" "}
        Recent <span className="text-purple-400"> Products </span>
      </h1>
      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 space-y-4">
        {productsdata.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Link to="/products" className="btn bg-purple-500 text-white ">
          Show All
        </Link>
      </div>
    </div>
  );
};

export default RecentProducts;
