import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

function Product() {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/product/get-product"
      );
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Some issues occurred. Please try again.");
    }
  };

  // useEffect hook to fetch products on component mount
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="Dashboard - All Products">
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Products List</h1>
            <div className="row">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="col-md-4 mb-3">
                    <Link
                      to={`http://localhost:8080/dashboard/admin/product/${product._slug}`}
                      className="text-decoration-none"
                    >
                      <div className="card">
                        <img
                          src={`http://localhost:8080/api/product/product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{product.description}</p>
                          <p className="card-text">
                            <strong>Price:</strong> ${product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;
