import React from "react";
import { useLoaderData, Link } from "react-router";

const ProductDetails = () => {
  const product = useLoaderData();

  const {
    _id,
    title,
    price_min,
    price_max,
    category,
    created_at,
    image,
    location,
    seller_image,
    seller_name,
    condition,
    usage,
    description,
    seller_contact,
    email,
    status,
  } = product;

  return (
    <div className="w-11/12 mx-auto my-10">
      {/* Back Button */}
      <Link to="/products" className="text-gray-500 mb-4 inline-block">
        ← Back To Products
      </Link>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {/* Product Image */}
          <div className="border-2 border-blue-400 rounded-xl p-4">
            <img
              src={image}
              alt={title}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          {/* Description Section */}
          <div className="bg-gray-100 p-6 rounded-lg mt-10">
            <h3 className="font-semibold mb-3">Product Description</h3>

            <div className="flex gap-6 text-sm mb-3">
              <p>
                <span className="text-purple-600 font-medium">Condition:</span>{" "}
                {condition}
              </p>
              <p>
                <span className="text-purple-600 font-medium">Usage Time:</span>{" "}
                {usage}
              </p>
            </div>

            <p className="text-gray-600">{description}</p>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>

          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
            {category}
          </span>

          {/* Price */}
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h2 className="text-green-600 text-xl font-semibold">
              ${price_min} - ${price_max}
            </h2>
            <p className="text-sm text-gray-500">Price starts from</p>
          </div>

          {/* Product Details */}
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <p className="text-sm">Product ID: {_id}</p>
            <p className="text-sm">
              Posted: {new Date(created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">Seller Information</h3>

            <div className="flex items-center gap-3 mb-2">
              <img
                src={seller_image}
                alt={seller_name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{seller_name}</p>
                <p className="text-sm text-gray-500">{email}</p>
              </div>
            </div>

            <p className="text-sm">Location: {location}</p>
            <p className="text-sm">Contact: {seller_contact}</p>

            <span className="inline-block mt-2 px-3 py-1 text-xs bg-yellow-200 rounded-full">
              {status}
            </span>
          </div>

          {/* Button */}
          <button className="w-full mt-6 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 cursor-pointer">
            I Want Buy This Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
