import React, { useState } from 'react';
import './ui/ProductPage.css';
import image1 from './images/book1.webp'; 
import image2 from './images/book1.webp';
import image3 from './images/book1.webp';

const ProductPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image1, image2, image3]; 

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
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
          {images.map((image, index) => (
            <img
              src={image}
              alt={`Book ${index + 1}`}
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
        <h1>Physics</h1>
        <p>Small summary if needed</p>
        <h2>PRICE</h2>
        <button className="grab-button">GRAB A COPY!</button>
        <button className="try-button">TRY IT OUT FOR FREE!</button>
      </div>
    </div>
  );
};

export default ProductPage;
