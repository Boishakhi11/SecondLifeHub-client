import React, { useEffect, useState } from "react";
import { use } from "react";
import { AuthContext } from "../provider/AuthProvider";
import DataLoading from "../Components/DataLoading";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user, loading } = use(AuthContext);
  const [bids, setBids] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setDataLoading(true);
      fetch(`http://localhost:3000/bids?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBids(data);
          setDataLoading(false);
        });
    }
  }, [user?.email]);

  if (loading || dataLoading) {
    return <DataLoading />;
  }

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });
              const remainingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remainingBids);
            }
          });
    });
  };

  return (
    <div className="space-y-7">
      <h1 className="text-center text-4xl lg:text-6xl font-semibold">
        {" "}
        My Bids :<span className="text-purple-500"> {bids.length} </span>
      </h1>
      {bids.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">No bids found</p>
      ) : (
        <div className="overflow-x-auto w-10/12 mx-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No</th>

                <th>Bid Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>

                  <td>{bid.bid_price}</td>
                  <td>
                    {bid.status === "pending" ? (
                      <button className="btn btn-soft btn-warning">
                        {bid.status}
                      </button>
                    ) : (
                      <button className="btn btn-soft btn-success">
                        {bid.status}
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleDeleteBid(bid._id)}
                      className="btn btn-outline btn-xs"
                    >
                      Remove Bid
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBids;
