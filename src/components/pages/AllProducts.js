import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ui/AllProducts.css';
import class_12_board_physics from './images/class 12 board physics.png'
import class_12_board_chemistry from './images/class 12 board chemistry.png'
import class_12_board_biology from './images/class 12 board biology.png'

const books = [
  { 
    id: 1, 
    title: 'Class 12 Board Physics', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹199', 
    physicalPrice: '₹699', 
    images: [class_12_board_physics], 
    description: 'Comprehensive guide for Class 12 Board Physics' 
  },
  { 
    id: 2, 
    title: 'Class 12 Board Chemistry', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹199', 
    physicalPrice: '₹699', 
    images: [class_12_board_chemistry], 
    description: 'In-depth study material for Class 12 Board Chemistry' 
  },
  { 
    id: 3, 
    title: 'Class 12 Board Biology', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹199', 
    physicalPrice: '₹699', 
    images: [class_12_board_biology], 
    description: 'Essential Biology concepts for Class 12 Board' 
  },
];

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const booksRef = useRef(null);

  const handleBookClick = (book) => {
    navigate('/product', { state: { selectedBook: book, allBooks: books } });
    if (booksRef.current) {
      booksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categoryCards = [
    { title: 'Class 12 Books', description: 'Boost your preparation with Class 12 books, crucial for acing Board exams!' },
    { title: 'JEE Books', description: 'Crack JEE with this handpicked collection of the best study materials, crafted for success!' },
    { title: 'NEET Books', description: 'Master NEET with these essential notes, tailored to help you ace the exam with confidence!' },
    { title: 'Class 11 Books', description: 'Get a strong foundation with Class 11 books, essential for Future Endeavours!' },
  ];

  const filteredBooks = selectedCategory === 'All' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  const handleCategoryClick = (index, category) => {
    if (index === 0) { // Class 12 Books
      setSelectedCategory('Class 12');
      if (booksRef.current) {
        booksRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (selectedCategory === 'Class 12' && booksRef.current) {
      booksRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCategory]);

  return (
    <div className="book-catalog">
      <div className="category-cards">
        {categoryCards.map((card, index) => (
          <button 
            key={index} 
            className={`card ${index > 0 ? 'coming-soon' : ''}`}
            onClick={() => handleCategoryClick(index, card.title)}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {index > 0 && <div className="coming-soon-overlay">Coming Soon</div>}
          </button>
        ))}
      </div>

      <main>
        <section id="all-books" ref={booksRef}>
          <h2>{selectedCategory === 'All' ? 'All Books' : `${selectedCategory} Books`}</h2>
          <div className="book-grid">
            {filteredBooks.map(book => (
              <div key={book.id} className="book" onClick={() => handleBookClick(book)}>
                <div className="book-image-container">
                  <img src={book.images[0]} alt={book.title} className="book-image" />
                </div>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-subtitle">{book.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .book-catalog {
          background-color: #000;
          color: #fff;
          padding: 2rem;
        }
        .category-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .card {
          background-color: #111;
          border: 2px solid #333;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
        }
        .card h3 {
          color: #f97316;
          margin-bottom: 0.5rem;
        }
        .card p {
          font-size: 0.9rem;
          color: #ccc;
        }
        .coming-soon {
          opacity: 0.7;
        }
        .coming-soon-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          font-weight: bold;
          color: #fff;
        }
        .book-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2rem;
        }
        .book {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: #111;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s ease-in-out;
        }
        .book:hover {
          cursor: pointer;
          transform: scale(1.05);
        }
        .book-image-container {
          cursor: pointer;
          width: 100%;
          padding-top: 141.42%; /* Aspect ratio of 1:√2 (common for book covers) */
          position: relative;
          overflow: hidden;
        }
        .book-image {
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .book-title {
          cursor: pointer;
          margin-top: 1rem;
          font-size: 1.1rem;
          font-weight: bold;
          padding: 0 1rem;
        }
        .book-subtitle {
          cursor: pointer;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #ccc;
          padding: 0 1rem 1rem;
        }
      `}</style>
    </div>
  );
}