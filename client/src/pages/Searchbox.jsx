import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import AOS from "aos";
import "aos/dist/aos.css";
import style from "./Pc.module.css";

export default function Searchbox() {
  const { search } = useSearch();
  const { cart, setcart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const results = search?.results || [];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Layout title="Search Results">
      <div className="container mt-4">
        <div className="text-center mt-5 pt-5">
          <h2 data-aos="fade-up">Search Results</h2>
          <h6 data-aos="fade-up">
            {results.length === 0
              ? "No products found"
              : `Found ${results.length} product${
                  results.length > 1 ? "s" : ""
                }`}
          </h6>
        </div>

        <div className="row">
          {results.map((product, index) => (
            <div
              key={product._id}
              className="col-md-4 mb-3"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
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
                  <p className="card-text">
                    {product.description
                      ? `${product.description.substring(0, 50)}...`
                      : "No description available"}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> $
                    {product.price ? product.price : "N/A"}
                  </p>
                  <button
                    className={`btn ${style.bt} m-2`}
                    data-aos="fade-left"
                    onClick={() => {
                      if (product.slug) {
                        navigate(`/product/${product.slug}`);
                      } else {
                        console.error("Product slug is missing");
                        toast.error("Product details are unavailable");
                      }
                    }}
                  >
                    <TbListDetails />
                  </button>
                  <button
                    className={`btn ${style.bt} m-2`}
                    data-aos="fade-right"
                    onClick={() => {
                      if (!auth?.user) {
                        toast.error("Please log in to add items to your cart!");
                        navigate("/login");
                        return;
                      }

                      if (!Array.isArray(cart)) {
                        console.error(
                          "Cart is not an array. Resetting cart state:",
                          cart
                        );
                        setcart([]);
                        localStorage.setItem("cart", JSON.stringify([]));
                        return;
                      }

                      const updatedCart = [...cart, product];
                      setcart(updatedCart);
                      localStorage.setItem("cart", JSON.stringify(updatedCart));

                      toast.success("Item added to cart!");
                    }}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center mt-4" data-aos="fade-in">
            <p>No products matched your search. Try different keywords.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
