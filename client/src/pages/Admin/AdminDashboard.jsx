import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import style from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const { auth } = useAuth();
  return (
    <Layout title={"Admin_Dashboard "} className="m-5 p-5">
      <div className="container-fluid  m-5 p-5">
        <div className={`row `}>
          <div className="col-md-4">
            <AdminMenu />
          </div>

          <div className="col-md-7 pt-5 mt-5 m-5">
            <div className={`card w-50 p-3 ${style.adm}`}>
              <h4>Admin Name:{auth?.user?.name}</h4>
              <h4>Admin Email:{auth?.user?.email}</h4>
              <h4>Admin Contact:{auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
