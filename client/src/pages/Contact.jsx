import React from "react";
import Layout from "../components/Layout/Layout";
import style from "./Contact.module.css";
import { FaTwitter, FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { HiLocationMarker } from "react-icons/hi";

export default function Contact() {
  return (
    <Layout title={"Contact Us"}>
      <div className="pt-5">
        <div
          className={`${style.location} col-md-12 mt-5 p-2 text-center d-flex align-items-center`}
        >
          <marquee behavior="scroll" direction="left">
            <p>
              <HiLocationMarker className={style.location} />
              <b className={style.location}> Location</b>
            </p>
          </marquee>
        </div>

        <div className={`m-3 p-5 ${style.box}`}>
          <div className="container-fluid">
            <div className="d-flex justify-content-center flex-column">
              <div className="carousel-item active">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13714.070562451072!2d76.74730805842512!3d30.76004804402327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed88ed5785a1%3A0xf2739da077dc86b0!2sPanjab%20University%2C%20Sector%2014%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1739720251206!5m2!1sen!2sin"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="d-block w-100"
                  title="Panjab University"
                ></iframe>
              </div>
              <div className="d-flex p-5 justify-content-center align-items-center">
                <a
                  href="mailto:example@email.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdAlternateEmail className={style.contactus} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className={style.contactus} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagramSquare className={style.contactus} />
                </a>
                <a
                  href="tel:+1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoIosCall className={style.contactus} />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className={style.contactus} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
