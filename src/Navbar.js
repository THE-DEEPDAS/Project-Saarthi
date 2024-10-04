import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./components/pages/images/Logo.jpeg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link" id="home">
        <img id="logo" src={Logo} alt="Logo" />
      </Link>
      <div className="navbar-right">
        <Link to="/" className="navbar-link" id="login">
          Home
        </Link>
        <Link to="/about" className="navbar-link" id="login">
          About
        </Link>
        <Link to="/allproducts" className="navbar-link" id="product">
          Products
        </Link>
        <Link to="/contact" className="navbar-link" id="contact">
          Contact
        </Link>
        <Link to="/cart" className="cart-link" id="cart">
          🛍️
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
