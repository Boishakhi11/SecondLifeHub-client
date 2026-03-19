import React from "react";

const Product = ({ product }) => {
  const { title, usage, price_min, price_max, image } = product;
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
        <button className="btn bg-purple-500 text-white">View Details</button>
      </div>
    </div>
  );
};

export default Product;
