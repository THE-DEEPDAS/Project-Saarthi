import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ui/ProductPage.css';

const ProductPage = () => {
  const location = useLocation();
  const { book } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="container">
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
        <button className="prev" onClick={handlePrev}>❮</button>
        <button className="next" onClick={handleNext}>❯</button>
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h1>{book.title}</h1>
        <p>{book.description}</p>
        <h2>{book.price}</h2>
        <button className="grab-button">GRAB A COPY!</button>
        <button className="try-button">TRY IT OUT FOR FREE!</button>
      </div>
    </div>
  );
};

export default ProductPage;