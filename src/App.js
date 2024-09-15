import React, { useState } from "react";
import "./globals.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./components/pages/Home";
import ProductPage from "./components/pages/ProductPage";
import ContactPage from "./components/pages/ContactPage";
import Cart from "./components/pages/Cart";
import Allproducts from "./components/pages/AllProducts";
import AuthPages from './components/pages/AuthPages';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/product" 
          element={<ProductPage addToCart={addToCart} />} 
        />
        <Route 
          path="/contact" 
          element={<ContactPage />} 
        />
        <Route 
          path="/allproducts" 
          element={<Allproducts addToCart={addToCart} />} 
        />
        <Route 
          path="/product_individual" 
          element={<ProductPage addToCart={addToCart} />} 
        />
        <Route 
          path="/cart" 
          element={<Cart cart={cart} />} 
        />
        <Route 
          path='/login' 
          element={<AuthPages />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
