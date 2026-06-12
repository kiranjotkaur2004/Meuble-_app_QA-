import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setAuth({
          user: parsedData.user,
          token: parsedData.token,
        });
      } catch (error) {
        console.error("Error parsing auth data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
