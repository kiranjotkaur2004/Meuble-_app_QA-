import React from "react";
import Layout from "./../components/Layout/Layout";
import style from "./About.module.css";

export default function About() {
  const handleOpenFile = () => {
    const fileUrl = "/aboutus.txt";

    window.open(fileUrl, "_blank");
  };
  return (
    <Layout title={"About - Meuble"}>
      <div className="row mt-5 p-5 pt-5 ">
        <div className="col-lg-6 pt-5">
          <img
            src="videos/about.gif"
            className={style.image}
            alt="About Meuble"
          />
        </div>

        <div className="col-lg-6 pt-5">
          <div className="me-5 pe-5">
            <h1 className={style.abtxtstart}>About Us - Meuble</h1>
            <b className={style.abtxt}>
              Welcome to Meuble, where craftsmanship meets elegance! We
              specialize in premium furniture designed to bring comfort, style,
              and functionality into your home.
            </b>
            <p className={style.txt}>
              At Meuble, we believe that furniture is more than just decor—it's
              a reflection of your lifestyle. Whether you’re furnishing a cozy
              home, a modern office, or a luxury space, our handcrafted pieces
              are built with quality, durability, and timeless design in mind.
            </p>

            <button
              type="button"
              className={style.btn}
              onClick={handleOpenFile}
            >
              Read More
            </button>
          </div>
        </div>

        <div className="col-lg-6 mt-5">
          <h2 className={style.abtxtstart}>Why Choose Meuble?</h2>
          <b className={style.abtxt}>
            Quality, Innovation, and Exceptional Service
          </b>
          <ul className={style.txt}>
            <li>
              <b>Premium Craftsmanship:</b> Each piece is made with high-quality
              materials for durability and style.
            </li>
            <li>
              <b>Wide Selection:</b> From modern minimalism to classic elegance,
              we have furniture for every taste.
            </li>
            <li>
              <b>Customized Solutions:</b> Tailored designs to fit your unique
              space and preferences.
            </li>
            <li>
              <b>Customer Satisfaction:</b> Secure payments, fast delivery, and
              exceptional after-sales support.
            </li>
          </ul>
        </div>

        <div className="col-lg-6">
          <img
            src="videos/ab.gif"
            className={style.image}
            alt="Furniture Collection"
          />
        </div>
      </div>
    </Layout>
  );
}
