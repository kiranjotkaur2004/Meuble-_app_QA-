import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";

export default function Orders() {
  return (
    <Layout title={"Your orders"}>
      <div className="constainer-fluid p-5 m-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}
