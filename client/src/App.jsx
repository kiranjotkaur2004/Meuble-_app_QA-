import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import { AuthProvider } from "./context/auth";

// User Routes
import Dashboard from "./pages/user/Dashboard";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import PrivateRoute from "./components/Layout/Routes/PrivateRoute";

// Admin Routes
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Layout/Routes/AdminRoute";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";
import Users from "./pages/Admin/Users";
import Product from "./pages/Admin/Product";

import Updateproducts from "./pages/Admin/Updateproducts";

import Productdetails from "./pages/Productdetails";
import Cartpages from "./pages/Cartpages";
import Pc from "./pages/Pc";
import Searchbox from "./pages/Searchbox";

function App() {
  const logo = "/logo.jpg";
  const carousel = "/images/carousel.jpg";
  const carouselone = "/images/carouselone.jpg";
  const carouseltwo = "/images/carouseltwo.jpg";

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              carousel={carousel}
              carouselone={carouselone}
              carouseltwo={carouseltwo}
            />
          }
        />
        <Route path="/search" element={<Searchbox />} />
        <Route path="/product/:slug" element={<Productdetails />}></Route>
        <Route path="/cart" element={<Cartpages />} />
        <Route path="/cate" element={<Pc />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="*" element={<Error />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/product/:slug" element={<Updateproducts />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-users" element={<Users />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
