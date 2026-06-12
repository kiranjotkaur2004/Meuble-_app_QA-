import { useState } from "react";
import React from "react";
import Layout from "../components/Layout/Layout";
import style from "./RegisterLogin.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // Form submission handler
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email, newPassword, answer }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Layout title="Forgot Password">
      <div className={style.register}>
        <form onSubmit={submit} className={style.form}>
          <h2 className={style.registers}>Forgot Password</h2>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={style.input}
              id="exampleInputEmail1"
              placeholder="Enter your e-mail"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={style.input}
              id="exampleInputAnswer"
              placeholder="What is your security answer?"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={style.input}
              id="exampleInputPassword1"
              autoComplete="new-password"
              placeholder="Enter your new password"
              required
            />
          </div>

          <button type="submit" className={style.btn2}>
            RESET PASSWORD
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Forgotpassword;
