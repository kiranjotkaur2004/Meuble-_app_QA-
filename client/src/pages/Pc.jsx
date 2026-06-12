import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Select, Popover } from "antd";
import style from "./Pc.module.css";
import AOS from "aos";
import toast from "react-hot-toast";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";

const { Option } = Select;

export default function Pc() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const { cart, setcart } = useCart();
  const { auth } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    AOS.init({ duration: 2000 });
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedPrice]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/product/get-product"
      );
      setProducts(data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/category/get-category"
      );
      setCategories(data.categories || []);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const filterProducts = async () => {
    try {
      if (!selectedCategory && selectedPrice.length === 0) {
        getAllProducts();
        return;
      }

      const filters = {
        checked: selectedCategory ? [selectedCategory] : [],
        radio: selectedPrice.length > 0 ? selectedPrice : [],
      };

      const { data } = await axios.post(
        "http://localhost:8080/api/product/product-filters",
        filters
      );
      setProducts(data.products || []);
    } catch (error) {
      toast.error("Failed to apply filters.");
    }
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedPrice([]);
    getAllProducts();
    toast.success("Filters reset successfully");
  };

  const toggleCart = (product) => {
    if (!auth?.user) {
      toast.error("Please log in to add items to your cart!");
      navigate("/login");
      return;
    }

    const existingItem = cart.find((item) => item._id === product._id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.filter((item) => item._id !== product._id);
      toast.success("Item removed from cart!");
    } else {
      updatedCart = [...cart, product];
      toast.success("Item added to cart!");
    }

    setcart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const toggleWishlist = (product) => {
    if (!auth?.user) {
      toast.error("Please log in to add items to your wishlist!");
      navigate("/login");
      return;
    }

    const existingItem = wishlist.find((item) => item._id === product._id);
    let updatedWishlist;

    if (existingItem) {
      updatedWishlist = wishlist.filter((item) => item._id !== product._id);
      toast.success("Item removed from wishlist!");
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success("Item added to wishlist!");
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <Layout title="All Products">
      <div
        className="mt-5 pt-5 p-2"
        style={{ backgroundImage: "linear-gradient(#ffffff, #854836)" }}
      >
        <h4 className="text-center">Filter Products</h4>
        <div className="d-flex justify-content-center mt-3 gap-3">
          <Select
            placeholder="Select Category"
            className="w-25"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value || null)}
            allowClear
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <button className={style.btnbtn} onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      <div
        className="container-fluid row ms-3 me-3 mt-2 mb-5"
        style={{ backgroundImage: "linear-gradient(#ffffff, #854836)" }}
      >
        <div className="col-md-12">
          <h2 className="text-center">Explore Our Collection</h2>
          <div className="d-flex flex-wrap">
            {products.length === 0 ? (
              <p className="text-center w-100">No products found.</p>
            ) : (
              products.map((product, index) => (
                <div
                  key={product._id}
                  data-aos="zoom-in-down"
                  className={`card m-3 ${style.sd}`}
                  style={{ width: "18rem", maxHeight: "500px" }}
                >
                  <img
                    src={`http://localhost:8080/api/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      <strong>Price:</strong> ${product.price}
                    </p>
                    <div className="d-flex justify-content-center">
                      <button
                        className={style.btnbtnbtn}
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        <TbListDetails />
                      </button>
                      <button
                        className={style.btnbtnbtn}
                        onClick={() => toggleCart(product)}
                      >
                        <FaShoppingCart />
                      </button>
                      <button
                        className={style.btnbtnbtn}
                        onClick={() => toggleWishlist(product)}
                      >
                        <FaHeart
                          color={
                            wishlist.some((item) => item._id === product._id)
                              ? "red"
                              : "black"
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
