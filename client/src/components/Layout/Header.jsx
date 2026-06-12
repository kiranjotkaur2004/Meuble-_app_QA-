import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../form/Searchinput";
import { Badge, Popover } from "antd";
import { useCart } from "../../context/cart";

export default function Header() {
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();

  const content = (
    <div>
      <p>Products to be sHopped</p>
    </div>
  );

  const contents = (
    <div>
      <p>Register to buy</p>
    </div>
  );
  const cont = (
    <div>
      <p>Products in Cart</p>
    </div>
  );
  const conten = (
    <div>
      <p> Meuble best materails</p>
    </div>
  );
  const contentss = (
    <div>
      <p> Login to buy</p>
    </div>
  );

  const contentsss = (
    <div>
      <p> Credentials to be viewed</p>
    </div>
  );
  const contentssss = (
    <div>
      <p> Logout safely</p>
    </div>
  );

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  return (
    <nav
      className={`navbar w-100  navbar-expand-lg position-fixed z-1 ${style.navbar}`}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            className={style.logo}
            style={{ height: "80px", width: "80px" }}
            src="/logo.jpg"
            alt="Logo"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${style.menu}`}>
            <li>
              <SearchInput />
            </li>
            <li>
              <Popover content={conten}>
                <NavLink className={style.navbartxt} to="/">
                  Home
                </NavLink>
              </Popover>
            </li>

            <li>
              <Popover content={content}>
                <NavLink className={style.navbartxt} to="/cate">
                  Shop_now
                </NavLink>
              </Popover>
            </li>

            {!auth?.user ? (
              <>
                <li>
                  <Popover content={contents}>
                    <NavLink className={style.navbartxt} to="/register">
                      SignUp
                    </NavLink>
                  </Popover>
                </li>
                <li>
                  <Popover content={contentss}>
                    <NavLink className={style.navbartxt} to="/login">
                      Login
                    </NavLink>
                  </Popover>
                </li>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <NavLink
                    className={`btn btn-secondary dropdown-toggle ${style.us}`}
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <Popover content={contentsss}>
                        <NavLink
                          className={`dropdown-item ${style.dashboard}`}
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </Popover>
                    </li>
                    <li>
                      <Popover content={contentssss}>
                        <NavLink
                          className={`${style.dashboard}`}
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </Popover>
                    </li>
                  </ul>
                </div>
              </>
            )}

            <li>
              <Popover content={cont}>
                <Badge count={cart?.length} className="me-4 " offset={[10, 10]}>
                  <NavLink className={`${style.navbartxt}`} to="/cart">
                    <FaCartShopping />
                  </NavLink>
                </Badge>
              </Popover>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
