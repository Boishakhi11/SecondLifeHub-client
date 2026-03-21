import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const [bids, setBids] = useState([]);
  const modalRef = useRef();
  const { user } = use(AuthContext);

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

  useEffect(() => {
    fetch(`http://localhost:3000/product/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => setBids(data));
  }, [_id]);

  const handleModal = () => {
    modalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const contact = form.contact.value;
    const bid = form.bid.value;
    //console.log(_id, name, email, contact, bid);

    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      buyer_contact: contact,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          modalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          //add new bid item to the state so user dont need to refresh ui
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
    //form.reset();
  };

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
              {price_min}kr - {price_max}kr
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
          <button
            onClick={handleModal}
            className="w-full mt-6 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 cursor-pointer"
          >
            I Want Buy This Product
          </button>

          {/* modal bid form*/}
          <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Give Seller Your Price!</h3>
              <p className="py-4">Offer Something that Seller Can't Resist</p>
              <form onSubmit={handleBidSubmit} className="fieldset">
                <label className="label">Name</label>
                <input
                  type="name"
                  name="name"
                  className="input"
                  defaultValue={user?.displayName}
                  readOnly
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  defaultValue={user?.email}
                  readOnly
                />
                <label className="label">Contacts</label>
                <input
                  type="tel"
                  name="contact"
                  className="input"
                  placeholder="+47 XXXXXXXX"
                  required
                />
                <label className="label">Bid</label>
                <input
                  type="text"
                  name="bid"
                  className="input"
                  placeholder="Your Bid"
                  required
                />

                <button type="submit" className="btn bg-purple-500 mt-4">
                  Place Your Bid
                </button>
              </form>
              <div className="modal-action"></div>
              <form
                className="flex justify-center items-center"
                method="dialog"
              >
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </dialog>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mt-20">
          Bids for this products :{" "}
          <span className="text-purple-500"> {bids.length} </span>
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No</th>
                <th>Seller</th>
                <th>Buyer</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={seller_image} alt={seller_name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{seller_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={bid.buyer_image} alt={bid.buyer_name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {bid.buyer_email}
                      <br />
                    </td>
                    <td>{bid.bid_price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
