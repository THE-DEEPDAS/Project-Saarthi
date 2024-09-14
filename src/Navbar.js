import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import Logo from './components/pages/images/Great Notes.jpg'

const Navbar = () => {
  return (
    <nav className="navbar">
      <img id="logo" src={Logo} alt="Logo" />
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/allproducts" className="navbar-link">Products</Link>
      <Link to="/contact" className="navbar-link">Contact</Link>
      <Link to="/product_individual" className="navbar-link">Return to individual Products</Link>
      <Link to="/cart" className="cart-link">🛒</Link>
    </nav>
  );
};

export default Navbar;
