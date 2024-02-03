import React, { useEffect, useRef } from "react";
import "./header.scss";

import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoBagHandleOutline } from "react-icons/io5";
// import { FaRegHeart } from "react-icons/fa";

import { IoMdMenu } from "react-icons/io";

import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";

import { TReducers } from "../../redux/rootReducer";

const logo = require("../../assets/images/eco-logo.png");
const user = require("../../assets/images/user-icon.png");



const nav__Links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {

  // Kiểm tra trạng thái đăng nhập từ localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const totalQuantity = useSelector(
    (state: TReducers) => state.cart.totalQuantity
  );

  const totalHeart = useSelector(
    (state: TReducers) => state.heart.totalQuantity
  )


  const headerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const profileActionRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const stickyHeaderFunc = () => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  };

  useEffect(() => {
    stickyHeaderFunc();
  });

  const menuToggle = () => menuRef.current?.classList.toggle("active__menu");
  const toggleProfileActions = () =>
    profileActionRef.current?.classList.toggle("show__profileActions");

  const navigateToCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const currentUser = false;
  const userImage = localStorage.getItem('userImage') || user; // 'user' là ảnh mặc định
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>
                  <Link to={"home"} className="link">
                    Anks
                  </Link>
                </h1>
                {/* <p>Since 1998</p> */}
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__Links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={
                        navClass => navClass.isActive ? "nav__active link" : "link"
                      }

                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fav__icon">
                <CiHeart className="icon-item" />
                <span className="badge">{totalHeart}</span>
              </span>
              <span className="cart__icon">
                <IoBagHandleOutline
                  className="icon-item"
                  onClick={navigateToCart}
                />
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <span onClick={toggleProfileActions}>
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={userImage}
                    alt="User Avatar"

                  />
                </span>

                <div
                  className="profile__action"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {isLoggedIn ? (
                    <span onClick={handleLogout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to={"/signup"} className="link">Sign up</Link>
                      <Link to={"/login"} className="link">Login</Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <IoMdMenu className="menu-icon" />
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
