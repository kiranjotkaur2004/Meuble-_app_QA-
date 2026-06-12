import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Productdetails.module.css";
import { useAuth } from "../context/auth";
import style from "./Pc.module.css";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

export default function Productdetails() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setcart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Fetch product details
  const getProduct = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(
        `http://localhost:8080/api/product/get-product/${slug}`
      );

      if (data.success) {
        setProduct(data.product);
        getSimilarProducts(data.product._id, data.product.category?._id);
      } else {
        setError("Product not found.");
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to load product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch similar products
  const getSimilarProducts = async (productId, categoryId) => {
    if (!categoryId) return;

    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/similar-products/${categoryId}`
      );

      if (data.success) {
        const filteredProducts = data.products.filter(
          (item) => item._id !== productId
        );
        setSimilarProducts(filteredProducts);
      } else {
        console.error("Failed to fetch similar products:", data.message);
      }
    } catch (err) {
      console.error(
        "Error fetching similar products:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    getProduct();
  }, [slug]);

  const isInCart = cart.some((item) => item._id === product?._id);

  const handleCartAction = () => {
    if (!auth?.user) {
      toast.error("Please log in to manage your cart!");
      navigate("/login");
      return;
    }

    if (!Array.isArray(cart)) {
      console.error("Cart is not an array. Resetting cart state:", cart);
      setcart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      return;
    }

    if (isInCart) {
      const updatedCart = cart.filter((item) => item._id !== product._id);
      setcart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart!");
    } else {
      const updatedCart = [...cart, product];
      setcart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item added to cart!");
    }
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="container text-center m-5 p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Error">
        <div className="container text-center mt-5 pt-5">
          <h2>{error}</h2>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="container text-center mt-5 pt-5">
          <h2>Product not found.</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <div
        style={{ backgroundImage: "linear-gradient(#ffffff, #854836)" }}
        className="mb-0"
      >
        <div className={`container mt-5 pt-5`}>
          <div className="row mt-3 pt-3">
            <div
              className={`col-md-6 text-center mb-4 pt-5 pb-5 ${styles.productdetail}`}
            >
              <img
                src={`http://localhost:8080/api/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                style={{ width: "100%", maxWidth: "500px", height: "400px" }}
              />
            </div>

            <div className="col-md-6">
              <h1 className="text-center">{product.name}</h1>
              <h6>Description: {product.description}</h6>
              <h6>Price: ${product.price}</h6>
              <h6>Category: {product.category?.name || "N/A"}</h6>
              <h6>
                Shipping: {product.shipping ? "Available" : "Not Available"}
              </h6>
              <button
                className={`btn ${style.bt} m-2`}
                onClick={handleCartAction}
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
          <h2
            className="text-center mt-5"
            style={{ backgroundColor: "#653700", color: "#ffffff" }}
          >
            Similar Products
          </h2>
          <div className=" ">
            {similarProducts.length > 0 && (
              <div className=" p-5">
                <div className="row">
                  {similarProducts.map((sp) => (
                    <div key={sp._id} className="col-md-3">
                      <div className="card mb-3">
                        <img
                          src={`http://localhost:8080/api/product/product-photo/${sp._id}`}
                          className="card-img-top"
                          alt={sp.name}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{sp.name}</h5>
                          <p className="card-text">${sp.price}</p>
                          <button
                            className={`btn ${style.bt} m-2`}
                            onClick={() => navigate(`/product/${sp.slug}`)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
