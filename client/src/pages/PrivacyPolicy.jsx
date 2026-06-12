import React from "react";
import Layout from "./../components/Layout/Layout";
import style from "./PrivacyPolicy.module.css";

export default function PrivacyPolicy() {
  return (
    <Layout title={"Privacy_policy"}>
      <div className="row   mt-5  p-5">
        <div className="col-lg-4  mt-4 pt-5 pe-5">
          <img src="videos/ab.gif" className={style.image} alt="not found" />
        </div>
        <div className="col-lg-8 ps-5 ">
          <div className="me-5 ms-5 p-4 ps-5">
            <h3 className={`${style.abtxtstart} mt-5`}>
              Welcome to Meuble ("we," "our," or "us"). Your privacy is
              important to us.
            </h3>
            <b className={style.abtxt}>
              This Privacy Policy explains how we collect, use, and protect your
              personal information when you visit our website, [Meuble.com].
            </b>
            <span className={style.txt}>
              This Privacy Policy explains how we collect, use, and protect your
              personal information when you visit our website,
              [Lover's_Court.com].
              <ul>
                <li>
                  Information We Collect We may collect the following types of
                  information: Personal Information: Name, email address, phone
                  number, shipping address, and payment details when you place
                  an order. Non-Personal Information: Browser type, IP address,
                  and usage data to improve our website. Cookies and Tracking
                  Technologies: We use cookies to enhance user experience and
                  track website traffic.
                </li>
                <li>
                  How We Use Your Information We use your information to:
                  Process and fulfill orders Improve our website and services
                  Send promotional emails (only with your consent) Respond to
                  customer service inquiries Comply with legal obligations
                </li>
                <li>
                  Sharing Your Information We do not sell or rent your personal
                  information. However, we may share your data with: Payment
                  Processors (e.g., Stripe, Razorpay) to process transactions
                  securely Shipping Partners to deliver your orders Legal
                  Authorities if required by law
                </li>
                <li>
                  Data Security We implement strict security measures to protect
                  your personal data. However, no online transmission is 100%
                  secure.
                </li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
