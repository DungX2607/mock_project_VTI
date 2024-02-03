import React from "react";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AllProducts from "../Admin/AllProducts";
import AddProducts from "../Admin/AddProducts";
import Dashboard from "../Admin/Dashboard";
import User from "../Admin/User";
import Order from "../Admin/Order";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route path="/*" element={<ProtectedRoute />}>
        {/* <Route path="checkout" element={<Checkout />} /> */}

        <Route path="dashboard/" element={<Dashboard />} />
        <Route path="dashboard/all-products" element={<AllProducts />} />
        <Route path="dashboard/edit-product/:id" element={<AddProducts />} />
        <Route path="dashboard/add-product" element={<AddProducts />} />
        <Route path="dashboard/users" element={<User/>} />
        <Route path="dashboard/order" element={<Order/>} />
      </Route>

      {/* <Route path="checkout" element={
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>
        }/> */}
    </Routes>
  );
};

export default Routers;
