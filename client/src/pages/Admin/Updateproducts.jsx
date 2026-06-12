import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Product Slug from URL:", params.slug);
  }, [params.slug]);

  const getSingleProduct = async () => {
    if (!params.slug) {
      toast.error("Product slug is missing!");
      return;
    }

    try {
      const { data } = await axios.get(
        `/api/product/get-product/${params.slug}`
      );
      console.log("Product Data:", data);
      if (data.success) {
        const product = data.product;
        setId(product._id);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setCategory(product.category?._id || "");
        setShipping(product.shipping ? "1" : "0");
      } else {
        toast.error("Product not found!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details.");
    }
  };

  useEffect(() => {
    console.log("Slug from URL:", params.slug);
    if (params.slug) {
      getSingleProduct();
    } else {
      toast.error("Product slug is missing!");
    }
  }, [params.slug]);
  // Fetch All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/category/get-category");
      console.log("Categories Data:", data);

      if (data.success) {
        setCategories(data.categories);
      } else {
        toast.error("Failed to fetch categories!");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !quantity || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/product/update-product/${id}`,
        productData
      );

      if (data.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Product Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "UPDATE PRODUCT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
