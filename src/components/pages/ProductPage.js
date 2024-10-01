import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ui/ProductPage.css";

const ProductPage = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  if (!book) {
    return <div>No book selected</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === book.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? book.images.length - 1 : prevIndex - 1
    );
  };

  const handleEBookPurchase = () => {
    addToCart({ ...book, type: 'E-Book' });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handlePhysicalCopyPurchase = () => {
    navigate('/address-form', { state: { book: { ...book, type: 'Physical Copy' } } });
  };

  const handleTryForFree = () => {
    // Implement the "Try it out for free" functionality here
    console.log("Try it out for free clicked");
  };

  return (
    <div className="container">
      {showMessage && (
        <div className={`popup-message ${showMessage ? "show" : "hide"}`}>
          E-Book added to cart!
        </div>
      )}

      {/* Image Carousel */}
      <div className="image-carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {book.images.map((image, index) => (
            <img
              src={image}
              alt={`${book.title} ${index + 1}`}
              className="carousel-image"
              key={index}
            />
          ))}
        </div>
        <div className="buttons-container">
          <button className="prev" onClick={handlePrev}>
            ❮
          </button>
          <button className="next" onClick={handleNext}>
            ❯
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <h2>{book.price}</h2>
        <div className="button-container">
          <button className="grab-button" onClick={handleEBookPurchase}>
            E-BOOK
          </button>
          <button className="grab-button" onClick={handlePhysicalCopyPurchase}>
            PHYSICAL COPY
          </button>
          <button className="try-button" onClick={handleTryForFree}>
            Try it out for free
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
