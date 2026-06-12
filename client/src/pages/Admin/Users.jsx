import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import style from "./CreateCategory.module.css";

export default function Users() {
  const [users, setUsers] = useState([]); // State for storing users

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/auth/users"); // Correct API
      if (data.success) {
        setUsers(data.users); // Ensure correct response key
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Some issues occurred. Please try again.");
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title="Dashboard - All Users">
      <div className="container-fluid mt-5 pt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8" style={{ color: "#6f4e37" }}>
            <h1>All Users</h1>
            <div className="row">
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user._id} className={`col-md-4 mb-3 `}>
                    <div className={`${style.us} card`}>
                      <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p className="card-text">
                          <strong>Role:</strong> {user.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No users found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
