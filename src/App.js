import React from 'react';
import './globals.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Home from './components/pages/Home'; // Correct path to Home component
import ProductPage from './components/pages/ProductPage'; // Correct path to About component
import ContactPage from './components/pages/ContactPage'; // Correct path to Contact component
import Products from './components/pages/Products'; // Correct path to Products component
import Cart from './components/pages/Cart'; // Correct path to Cart component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
