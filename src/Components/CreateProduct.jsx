import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import DataLoading from "../Components/DataLoading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price_min: "",
    price_max: "",
    condition: "brand new",
    usage: "",
    image: "",
    seller_name: user?.displayName || "",
    email: user?.email || "",
    seller_contact: "",
    seller_image: user?.photoURL || "",
    location: "",
    description: "",
  });

  const [dataLoading, setDataLoading] = useState(false);

  const categories = [
    "Electronics",
    "Furniture",
    "Fashion",
    "Books",
    "Home Appliances",
    "Sports",
    "Vehicles",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      price_min: Number(formData.price_min),
      price_max: formData.price_max
        ? Number(formData.price_max)
        : Number(formData.price_min),
      created_at: new Date().toISOString(),
      status: "pending",
    };

    try {
      setDataLoading(true);

      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/products");
      } else {
        toast("Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast("Something went wrong");
    } finally {
      setDataLoading(false);
    }
  };

  if (loading || dataLoading) {
    return <DataLoading />;
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-lg font-medium text-slate-700 hover:text-purple-600"
          >
            ← Back To Products
          </Link>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold text-slate-900">
            Create <span className="text-purple-500">A Product</span>
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Yamaha Fz Guitar for Sale"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Category</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Select a Category
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Min Price You want to Sale
                  </span>
                </label>
                <input
                  type="number"
                  name="price_min"
                  value={formData.price_min}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Max Price You want to Sale
                  </span>
                </label>
                <input
                  type="number"
                  name="price_max"
                  value={formData.price_max}
                  onChange={handleChange}
                  placeholder="Optional(must be greater than minimum price)"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Product Condition
                  </span>
                </label>

                <div className="border rounded-lg px-4 py-3 flex items-center gap-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="condition"
                      value="brand new"
                      checked={formData.condition === "brand new"}
                      onChange={handleChange}
                      className="radio radio-primary"
                    />
                    <span>Brand New</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="condition"
                      value="used"
                      checked={formData.condition === "used"}
                      onChange={handleChange}
                      className="radio radio-primary"
                    />
                    <span>Used</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Product Usage time
                  </span>
                </label>
                <input
                  type="text"
                  name="usage"
                  value={formData.usage}
                  onChange={handleChange}
                  placeholder="e.g. 1 year 3 month"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Your Product Image URL
                </span>
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Seller Name</span>
                </label>
                <input
                  type="text"
                  name="seller_name"
                  value={formData.seller_name}
                  onChange={handleChange}
                  placeholder="e.g. Artisan Roasters"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Seller Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Seller Contact</span>
                </label>
                <input
                  type="text"
                  name="seller_contact"
                  value={formData.seller_contact}
                  onChange={handleChange}
                  placeholder="e.g. +47 XXXXXXXX"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">
                    Seller Image URL
                  </span>
                </label>
                <input
                  type="url"
                  name="seller_image"
                  value={formData.seller_image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Location</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">
                  Simple Description about your Product
                </span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time..."
                className="textarea textarea-bordered w-full h-32"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full text-white border-none text-lg bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600"
            >
              {loading ? "Creating..." : "Create A Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
