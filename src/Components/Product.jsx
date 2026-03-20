import React from "react";
import { Link } from "react-router";

const Product = ({ product }) => {
  const { _id, title, usage, price_min, price_max, image } = product;
  return (
    <div className="card bg-base-100 w-96 border-b-0 shadow-xl rounded-2xl">
      <figure>
        <img className="w-full h-60 object-cover" src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {" "}
          {title} [{usage}]
        </h2>
        <p>
          {" "}
          Price: {price_min} kr - {price_max} kr{" "}
        </p>
        <Link
          to={`/productDetails/${_id}`}
          className="btn bg-purple-500 text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Product;
