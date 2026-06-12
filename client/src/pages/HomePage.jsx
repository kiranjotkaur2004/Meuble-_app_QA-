import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/Layout/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./HomePage.module.css";
import { Carousel, Popover } from "antd";

export default function HomePage({ carousel }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
    AOS.init({ duration: 2000 });
  }, []);
  const content = (
    <div>
      <p>At MEUBLE, we believe that your home deserves the best.</p>
    </div>
  );
  const conten = (
    <div>
      <p>At MEUBLE, View details of product and similar products</p>
    </div>
  );

  const fetchData = async () => {
    try {
      const [productRes, categoryRes] = await Promise.all([
        axios.get("http://localhost:8080/api/product/get-product"),
        axios.get("http://localhost:8080/api/category/get-category"),
      ]);
      setProducts(productRes.data?.products || []);
      setCategories(categoryRes.data?.categories || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    }
  };

  const groupedProducts = categories
    .map((category) => ({
      category: category.name,
      products: products.filter(
        (product) => product.category?._id === category._id
      ),
    }))
    .filter(({ products }) => products.length > 0);

  const bestProducts = products.slice(0, 3);

  return (
    <Layout title="Products">
      {/* Background Section */}
      <div className="position-relative">
        <div
          className="b-im w-100 vh-100 position-absolute text-light"
          style={{ zIndex: -10 }}
        >
          <div className={`mt-5 ${styles.sett}`}>
            <div className={`${styles.location} text-center`}>
              <marquee behavior="scroll" direction="left">
                <p>
                  <b>
                    "At MEUBLE, we believe that your home deserves the best."
                  </b>
                </p>
              </marquee>
            </div>
          </div>
          <img src={carousel} className="img-fluid w-100" alt="Background" />
        </div>

        {/* Introduction Section */}
        <section
          className="introduction-section w-100"
          style={{ height: "120vh", zIndex: 2 }}
        >
          <div
            className="content position-relative w-100 vh-100 d-flex flex-column gap-2 justify-content-center align-items-center"
            data-aos="zoom-in-down"
          >
            <h1>MEUBLE</h1>
            <p className="fs-4">
              <Link to="/cate">
                <Popover content={content}>
                  <button className={styles.btnbtn}>Shop now!</button>
                </Popover>
              </Link>
            </p>
          </div>
        </section>
      </div>
      <div className={styles.bod}>
        {/* Best Products Section */}
        <div className={`container mt-5 ${styles.bod}`}>
          <h2 className="text-center">Our Best Products</h2>
          <div className={`row`}>
            {bestProducts.map((product, index) => (
              <div
                key={product._id}
                className="col-md-4 mb-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`card ${styles.cds}`}>
                  <img
                    src={`http://localhost:8080/api/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{
                      height: "200px",
                      Height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price}</p>
                    <Popover content={conten}>
                      <Link to={`/product/${product.slug}`}>
                        <button className={styles.btnbtn} data-aos="fade-left">
                          View Details
                        </button>
                      </Link>
                    </Popover>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Carousel */}

        <div className="container">
          <h2 className="text-center mb-2 mt-5">Shop Meuble</h2>
          <Carousel autoplay autoplaySpeed={1500}>
            {categories.map((category) => {
              const categoryProduct = products.find(
                (p) => p.category?._id === category._id
              );

              return (
                <div key={category._id} className="text-center">
                  <button className={styles.btnbtn}>
                    <h4>{category.name}</h4>
                  </button>
                  <div className="d-flex justify-content-center">
                    <img
                      src={
                        categoryProduct
                          ? `http://localhost:8080/api/product/product-photo/${categoryProduct._id}`
                          : "https://via.placeholder.com/300"
                      }
                      alt={category.name}
                      style={{
                        width: "800px",
                        height: "500px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        display: "block",
                        margin: "auto",
                      }}
                      className="p-5"
                    />
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>

        {/* Product Collection */}
        <div className="container mt-5">
          <h1 className="text-center">Explore Our Collection</h1>
          {groupedProducts.map(({ category, products }) => (
            <div key={category} className="mt-5">
              <h2 className="text-center">{category}</h2>
              <div className="row">
                {products.map((product, index) => (
                  <div
                    key={product._id}
                    className="col-md-4 mb-4"
                    data-aos="zoom-in-down"
                    data-aos-delay={index * 100}
                  >
                    <div className={`card ${styles.cds}`}>
                      <img
                        src={`http://localhost:8080/api/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">${product.price}</p>
                        <Link to={`/product/${product.slug}`}>
                          <button
                            className={styles.btnbtn}
                            data-aos="fade-left"
                          >
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
