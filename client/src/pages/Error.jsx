import React from "react";
import Layout from "../components/Layout/Layout";
import style from "./Error.module.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Layout title={"Error"}>
      <div className={`card text-center container-fluid  ${style.error}`}>
        <div>
          <b>Oops!.......Error!!!!!</b>
        </div>
        <div className="card-body">
          <h1 className="card-title">404 error</h1>
          <p className="card-text">Page not found</p>
          <Link to="/" className={`${style.btn} btn`}>
            Go back
          </Link>
        </div>
      </div>
    </Layout>
  );
}
