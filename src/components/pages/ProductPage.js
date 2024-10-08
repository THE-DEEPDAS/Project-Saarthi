import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ui/ProductPage.css";

const ProductPage = ({ addToCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedBook, allBooks } = location.state || {};
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState({
    eBook: false,
    physicalCopy: false
  });

  const books = allBooks || [
    {
      id: 1,
      title: "Class 12 Board Physics",
      description: "Comprehensive guide for Class 12 Board Physics",
      eBookPrice: "₹449",
      physicalPrice: "₹599",
      images: ["/placeholder.svg?height=400&width=300"]
    },
    {
      id: 2,
      title: "Class 12 Board Chemistry",
      description: "In-depth study material for Class 12 Board Chemistry",
      eBookPrice: "₹499",
      physicalPrice: "₹649",
      images: ["/placeholder.svg?height=400&width=300"]
    },
    {
      id: 3,
      title: "Class 12 Board Biology",
      description: "Complete solution for Class 12 Board Biology",
      eBookPrice: "₹549",
      physicalPrice: "₹699",
      images: ["/placeholder.svg?height=400&width=300"]
    }
  ];

  useEffect(() => {
    if (selectedBook) {
      const index = books.findIndex(book => book.id === selectedBook.id);
      setCurrentBookIndex(index !== -1 ? index : 0);
    }
  }, [selectedBook, books]);

  const currentBook = books[currentBookIndex];

  useEffect(() => {
    setSelectedTypes({ eBook: false, physicalCopy: false });
  }, [currentBookIndex]);

  const handleNext = () => {
    setCurrentBookIndex((prevIndex) =>
      prevIndex === books.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentBookIndex((prevIndex) =>
      prevIndex === 0 ? books.length - 1 : prevIndex - 1
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
    if (selectedTypes.eBook) total += parseFloat(currentBook.eBookPrice.replace('₹', ''));
    if (selectedTypes.physicalCopy) total += parseFloat(currentBook.physicalPrice.replace('₹', ''));
    return total === 0 ? currentBook.eBookPrice : `₹${total}`;
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
            ...currentBook, 
            type: selectedTypes.eBook ? 'Both' : 'Physical Copy',
            price: calculatePrice()
          } 
        } 
      });
    } else {
      addToCart({ ...currentBook, type: 'E-Book', price: currentBook.eBookPrice });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/cart');
      }, 2000);
    }
  };

  const handleTryForFree = () => {
    console.log("Try it out for free clicked for", currentBook.title);
  };

  return (
    <div className="container">
      {showMessage && (
        <div className={`popup-message ${showMessage ? "show" : "hide"}`}>
          {selectedTypes.eBook || selectedTypes.physicalCopy ? "E-Book added to cart!" : "Please select a book type"}
        </div>
      )}

      <div className="image-carousel">
        <img
          src={currentBook.images[0]}
          alt={currentBook.title}
          className="carousel-image"
        />
        <div className="buttons-container">
          <button className="prev" onClick={handlePrev} aria-label="Previous book">
            ❮
          </button>
          <button className="next" onClick={handleNext} aria-label="Next book">
            ❯
          </button>
        </div>
      </div>

      <div className="product-details">
        <h1>{currentBook.title}</h1>
        <p>{currentBook.description}</p>
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