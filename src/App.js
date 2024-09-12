import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Home from './components/pages/Home'; // Correct path to Home component
import About from './components/pages/About'; // Correct path to About component
import Contact from './components/pages/Contact'; // Correct path to Contact component
import Products from './components/pages/Products'; // Correct path to Products component
import Cart from './components/pages/Cart'; // Correct path to Cart component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
