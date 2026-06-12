import React, { useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import style from "./Cartpages.module.css";
import { useNavigate } from "react-router-dom";

export default function Cartpages() {
  const { cart, setcart } = useCart();
  const navigate = useNavigate();

  // ✅ Calculate total price dynamically based on quantity
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setcart(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Remove item from cart with a detailed toast message
  const removeItem = (id, name) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setcart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // 🎉 Show a toast notification with item name
    toast.success(`items removed successfully from cart!`, {
      duration: 3000, // Display for 3 seconds
      position: "top-right", // Show in the top-right corner
    });
  };

  // ✅ Increment item quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setcart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Decrement item quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
        : item
    );
    setcart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout title="Your Cart">
      <div className={style.tp}>
        <div className="container mt-5 pt-5">
          <h2 className={`text-center p-2 mb-3 ${style.tt}`}>
            <marquee behavior="scroll" direction="left" scrollamount="15">
              <p>
                <b className={style.location}>Your Shopping Cart.....</b>
              </p>
            </marquee>
          </h2>

          {cart.length > 0 ? (
            <>
              <h4 className="text-center">
                You have {cart.length} items in your cart
              </h4>

              <div className="row">
                {/* Cart Items */}
                <div className={`col-md-9 `}>
                  {cart.map((p) => (
                    <div
                      key={p._id}
                      className="row mb-3 p-4 m-3 border rounded"
                    >
                      <div className={`col-md-4 ${style.im}`}>
                        <img
                          src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="400px"
                          height="auto"
                        />
                      </div>

                      <div className="col-md-6">
                        <h5>{p.name}</h5>
                        <p>{p.description.substring(0, 50)}...</p>
                        <p>
                          <strong>Price:</strong> ${p.price}
                        </p>
                        <div className="d-flex align-items-center">
                          <button
                            className={` ${style.btn}`}
                            onClick={() => decreaseQuantity(p._id)}
                          >
                            -
                          </button>
                          <span className="mx-2">{p.quantity || 1}</span>
                          <button
                            className={` ${style.btn}`}
                            onClick={() => increaseQuantity(p._id)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <button
                          className={` ${style.btn}`}
                          onClick={() => removeItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Price & Checkout */}
                <div className={`col-md-3 mb-3 ${style.cd}`}>
                  <h4>Total Price: {totalPrice()}</h4>
                </div>
              </div>
            </>
          ) : (
            <h4 className="text-center text-danger">Your Cart Is Empty</h4>
          )}
        </div>
      </div>
    </Layout>
  );
}
