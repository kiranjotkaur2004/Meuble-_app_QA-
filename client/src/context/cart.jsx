import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) {
      try {
        setcart(JSON.parse(existingCartItem));
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setcart([]);
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setcart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
