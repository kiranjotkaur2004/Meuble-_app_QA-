import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

export default function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      if (data.success && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        setCategories([]);
        toast.error("Invalid category data received");
      }
    } catch (error) {
      console.error("Error in getting categories:", error);
      toast.error("Error fetching categories. Please try again.");
      setCategories([]);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //create product function
  const handlecreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:8080/api/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product created successfully!");
        navigate(`http://localhost:8080/dashboard/admin/create-products`);
      } else {
        toast.error(data.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="container-fluid mt-5 pt-5 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 shadow border border-danger mb-4 mt-5">
            <h1 style={{ color: "#543a14" }}>Create Product</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary  col-md-10">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>
              <Select
                bordered={false}
                placeholder="Select a Shipping"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setShipping(value)}
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-success" onClick={handlecreate}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
