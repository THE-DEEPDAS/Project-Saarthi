import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ui/ProductPage.css";

const ProductPage = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({
    eBook: false,
    physicalCopy: false
  });

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

  const handleTypeSelect = (type) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const calculatePrice = () => {
    let total = 0;
    if (selectedTypes.eBook) total += parseFloat(book.eBookPrice.replace('₹', ''));
    if (selectedTypes.physicalCopy) total += parseFloat(book.physicalPrice.replace('₹', ''));
    return total === 0 ? book.eBookPrice : `₹${total}`;
  };

  const handlePurchase = () => {
    if (!selectedTypes.eBook && !selectedTypes.physicalCopy) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      return;
    }

    if (selectedTypes.physicalCopy) {
      navigate('/address-form', { 
        state: { 
          book: { 
            ...book, 
            type: selectedTypes.eBook ? 'Both' : 'Physical Copy',
            price: calculatePrice()
          } 
        } 
      });
    } else {
      addToCart({ ...book, type: 'E-Book', price: book.eBookPrice });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/cart');
      }, 2000);
    }
  };

  const handleTryForFree = () => {
    // Implement the "Try it out for free" functionality here
    console.log("Try it out for free clicked");
  };

  return (
    <div className="container">
      {showMessage && (
        <div className={`popup-message ${showMessage ? "show" : "hide"}`}>
          {selectedTypes.eBook || selectedTypes.physicalCopy ? "E-Book added to cart!" : "Please select a book type"}
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
        <h2>{calculatePrice()}</h2>
        <div className="type-selection">
          <button 
            className={`type-button ${selectedTypes.eBook ? 'selected' : ''}`}
            onClick={() => handleTypeSelect('eBook')}
          >
            <span className="dot"></span>
            E-BOOK
          </button>
          <button 
            className={`type-button ${selectedTypes.physicalCopy ? 'selected' : ''}`}
            onClick={() => handleTypeSelect('physicalCopy')}
          >
            <span className="dot"></span>
            PHYSICAL COPY
          </button>
        </div>
        <div className="button-container">
          <button className="grab-button" onClick={handlePurchase}>
            ADD TO CART
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