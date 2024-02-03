import React from "react";
import Header from "../header/Header";
import Routers from "../../routers/Routers";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";
import AdminNav from "../../Admin/AdminNav";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}

      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
