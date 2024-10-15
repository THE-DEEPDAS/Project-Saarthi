import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import class_12_board_physics from './images/class 12 board physics.png'
import class_12_board_chemistry from './images/class 12 board chemistry.png'
import class_12_board_biology from './images/class 12 board biology.png'
import './ui/ProductPage.css'

export default function ProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId } = useParams();
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
      images: [class_12_board_physics]
    },
    {
      id: 2,
      title: "Class 12 Board Chemistry",
      description: "In-depth study material for Class 12 Board Chemistry",
      eBookPrice: "₹499",
      physicalPrice: "₹649",
      images: [class_12_board_chemistry]
    },
    {
      id: 3,
      title: "Class 12 Board Biology",
      description: "Complete solution for Class 12 Board Biology",
      eBookPrice: "₹549",
      physicalPrice: "₹699",
      images: [class_12_board_biology]
    }
  ];

  useEffect(() => {
    if (bookId) {
      const index = books.findIndex(book => book.id === parseInt(bookId));
      setCurrentBookIndex(index !== -1 ? index : 0);
    } else if (selectedBook) {
      const index = books.findIndex(book => book.id === selectedBook.id);
      setCurrentBookIndex(index !== -1 ? index : 0);
    }
  }, [selectedBook, books, bookId]);

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

  const addToCart = () => {
    if (!selectedTypes.eBook && !selectedTypes.physicalCopy) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      return;
    }

    const bookType = selectedTypes.eBook && selectedTypes.physicalCopy ? 'Both' :
                     selectedTypes.eBook ? 'E-Book' : 'Physical Copy';

    const cartItem = { 
      id: currentBook.id,
      title: currentBook.title,
      description: currentBook.description,
      image: currentBook.images[0],
      type: bookType, 
      price: calculatePrice(),
      status: 'In Cart'
    };

    // Check if physical copy is selected
    if (selectedTypes.physicalCopy) {
      // Redirect to address form
      navigate('/address-form');
      return; // Prevent adding to cart
    }

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new item to cart
    const updatedCart = [...existingCart, cartItem];
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      navigate('/cart');
    }, 2000);
  };

  const handleTryForFree = () => {
    if (currentBook.id === 1) {
      navigate(`/try-for-free/${currentBook.id}`);
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  };

  return (
    <div className="container">
      {showMessage && (
        <div className={`popup-message ${showMessage ? "show" : "hide"}`}>
          {selectedTypes.eBook || selectedTypes.physicalCopy 
            ? "Added to cart!" 
            : currentBook.id === 1 
              ? "Redirecting to try for free page..." 
              : "Try for free is only available for Physics book"}
        </div>
      )}

      <div className="image-carousel">
        <img
          src={currentBook.images[0]}
          alt={currentBook.title}
          className="carousel-image"
        />
      </div>

      <div className="product-details">
        <h1>{currentBook.title}</h1>
        <p>{currentBook.description}</p>
        <h2>{calculatePrice()}</h2>
        <div className="type-selection">
          <button 
            className={`type-button ${selectedTypes.eBook ? 'selected' : 'deselected'}`}
            onClick={() => handleTypeSelect('eBook')}
          >
            <span className="dot"></span>
            E-BOOK
          </button>
          <button 
            className={`type-button ${selectedTypes.physicalCopy ? 'selected' : 'deselected'}`}
            onClick={() => handleTypeSelect('physicalCopy')}
          >
            <span className="dot"></span>
            PHYSICAL COPY
          </button>
        </div>
        <div className="button-container">
          <button className="grab-button" onClick={addToCart}>
            BUY NOW
          </button>
          <button className="try-button" onClick={handleTryForFree}>
            Try it out for free
          </button>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-button prev" onClick={handlePrev} aria-label="Previous book">
          ❮ Previous
        </button>
        <button className="nav-button next" onClick={handleNext} aria-label="Next book">
          Next ❯
        </button>
      </div>
    </div>
  );
}
