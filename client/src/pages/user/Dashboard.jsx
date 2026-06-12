import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";

function Dashboard() {
  const { auth } = useAuth();
  const [profileImage, setProfileImage] = useState(() => {
    return (
      localStorage.getItem("profileImage") || "https://via.placeholder.com/120"
    );
  });

  const cloudinaryRef = useRef(null);
  const widgetRef = useRef(null);
  useEffect(() => {
    if (window.cloudinary && !cloudinaryRef.current) {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dbwmdlt5o",
          uploadPreset: "ml_default",
        },
        (error, result) => {
          if (error) {
            console.error("Upload Error:", error);
            toast.error("Profile image not successfully updated");
          } else if (result?.event === "success") {
            console.log("Upload Success:", result.info.secure_url);
            toast.success("Profile image successfully uploaded");
            setProfileImage(result.info.secure_url);
            localStorage.setItem("profileImage", result.info.secure_url);
          } else if (result?.event === "close") {
            console.log("Upload Canceled by User");
          }
        }
      );
    }
  }, []);

  return (
    <Layout title="User Dashboard">
      <div
        className="container-fluid mt-5 pt-5"
        style={{ backgroundColor: "#6f4e37" }}
      >
        <div className="row mt-5 pt-5 text-light  ">
          <div className="col-md-4 mt-5">
            <UserMenu />
          </div>
          <div className="col-md-8 mb-2">
            <div className="card w-50 text-center d-flex justify-content-center align-items-center p-4">
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "2px solid #007bff",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/120";
                }}
              />

              <div
                className="mb-3 d-flex justify-content-center align-items-center "
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
                onClick={() => widgetRef.current?.open()}
              >
                <CgProfile size={80} className="text-primary" />
              </div>

              <div className="container row text-start bg-secondary bg-gradient">
                <div className="col-md-4 ">
                  <h5>Name:</h5>
                  <h5>Email:</h5>
                  <h5>Address:</h5>
                </div>
                <div className="col-md-8">
                  <h5>{auth?.user?.name || "Guest User"}</h5>
                  <h5>{auth?.user?.email || "No Email Provided"}</h5>
                  <h5>{auth?.user?.address || "No Address Available"}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
