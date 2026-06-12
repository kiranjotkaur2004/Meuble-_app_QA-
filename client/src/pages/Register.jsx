import { useState } from "react";
import React from "react";
import Layout from "../components/Layout/Layout";
import style from "./RegisterLogin.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");

  const [password, setpassword] = useState("");
  const [answer, setanswer] = useState("");
  const [phone, setphone] = useState("");
  const navigate = useNavigate();
  //form function
  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some issues");
    }
  };

  return (
    <Layout title={"Register"}>
      <div className={style.register}>
        <form onSubmit={submit} className={`card  p-4 ${style.form}`}>
          <h2 className={style.registers}> SignUp</h2>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={` ${style.input}`}
              id="exampleInputname"
              aria-describedby="emailHelp"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className={` ${style.input}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter e-mail"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className={` ${style.input}`}
              id="exampleInputPassword1"
              placeholder="Enter password"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              className={`${style.input}`}
              id="exampleInputphone"
              placeholder="Enter phone.no.:"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              className={` ${style.input}`}
              id="exampleInputaddress"
              aria-describedby="emailHelp"
              placeholder="Enter address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setanswer(e.target.value)}
              className={` ${style.input}`}
              id="exampleInputanswer"
              aria-describedby="emailHelp"
              placeholder="Do you like to achieve goals"
              required
            />
          </div>

          <button type="submit" className={` ${style.btn}`}>
            SignUp
          </button>
          <button
            type="button"
            className={` ${style.btn2}`}
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
