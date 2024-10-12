import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import class_12_board_physics from './images/class 12 board physics.png'
import class_12_board_chemistry from './images/class 12 board chemistry.png'
import class_12_board_biology from './images/class 12 board biology.png'
import './ui/ProductPage.css'
export default function ProductPage({ addToCart }) {
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

  const handlePurchase = () => {
    if (!selectedTypes.eBook && !selectedTypes.physicalCopy) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
      return;
    }

    const bookType = selectedTypes.eBook && selectedTypes.physicalCopy ? 'Both' :
                     selectedTypes.eBook ? 'E-Book' : 'Physical Copy';

    addToCart({ 
      ...currentBook, 
      type: bookType, 
      price: calculatePrice()
    });

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
          <button className="grab-button" onClick={handlePurchase}>
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

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          background-color: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
        }

        .image-carousel {
          width: 100%;
          max-width: 300px;
          margin-bottom: 2rem;
        }

        .carousel-image {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .product-details {
          width: 100%;
          max-width: 600px;
          text-align: center;
        }

        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #8b5cf6;
        }

        p {
          margin-bottom: 1rem;
        }

        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #f43f5e;
        }

        .type-selection {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .type-button {
          padding: 0.5rem 1rem;
          border: 1px solid #8b5cf6;
          background-color: transparent;
          color: #8b5cf6;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .type-button.selected {
          background-color: #8b5cf6;
          color: #fff;
        }

        .type-button.deselected {
          background-color: #000;
          color: #8b5cf6;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: currentColor;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .grab-button, .try-button {
          padding: 1rem;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        .grab-button {
          background-color: #f97316;
          color: #fff;
        }

        .try-button {
          background-color: #4b5563;
          color: #fff;
        }

        .grab-button:hover, .try-button:hover {
          opacity: 0.9;
        }

        .navigation-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: auto;
          padding-top: 2rem;
          width: 100%;
        }

        .nav-button {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        .nav-button:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }

        .popup-message {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #4b5563;
          color: white;
          padding: 1rem;
          border-radius: 5px;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .popup-message.show {
          opacity: 1;
        }

        @media (min-width: 768px) {
          .container {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .image-carousel {
            margin-right: 2rem;
            margin-bottom: 0;
          }

          .product-details {
            text-align: left;
          }

          .type-selection, .button-container {
            justify-content: flex-start;
          }

          .navigation-buttons {
            position: absolute;
            bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default ProductPage;
>>>>>>> 17c0627488d422ffecc0289e47a23216690db81c
