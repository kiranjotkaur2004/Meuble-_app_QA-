import { useState } from "react";
import React from "react";
import Layout from "../components/Layout/Layout";
import style from "./RegisterLogin.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  // Form submission handler
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Layout title="Login">
      <div className={style.register}>
        <form onSubmit={submit} className={`card  p-4 ${style.form}`}>
          <h2 className={style.registers}>Login</h2>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={style.input}
              id="exampleInputEmail1"
              placeholder="Enter e-mail"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={style.input}
              id="exampleInputPassword1"
              autoComplete="current-password"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className={style.btn}>
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/forgot-password");
            }}
            className={` ${style.btn2}`}
          >
            Forgot
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
