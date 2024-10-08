import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ui/AllProducts.css';

const books = [
  { 
    id: 1, 
    title: 'Class 12 Board Physics', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹399', 
    physicalPrice: '₹599', 
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(149)-mUz9DSdxsjo3o8GSohtQNdyUjmnHs5.png'], 
    description: 'Comprehensive guide for Class 12 Board Physics' 
  },
  { 
    id: 2, 
    title: 'Class 12 Board Chemistry', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹449', 
    physicalPrice: '₹649', 
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(147)-1q4Wl115EEQ37QdqM0tX5rKPi58GZf.png'], 
    description: 'In-depth study material for Class 12 Board Chemistry' 
  },
  { 
    id: 3, 
    title: 'Class 12 Board Biology', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹499', 
    physicalPrice: '₹699', 
    images: ['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%20(148)-vjAPMwLTAD1IkwVYHkn5HHSfID33N1.png'], 
    description: 'Essential Biology concepts for Class 12 Board' 
  },
];

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const booksRef = useRef(null);

  const handleBookClick = (book) => {
    navigate('/product', { state: { selectedBook: book, allBooks: books } });
  };

  const categoryCards = [
    { title: 'Class 12 Books', description: 'Boost your preparation with Class 12 books, crucial for acing Board exams!' },
    { title: 'All Books', description: 'Explore top-notch notes curated by expert educators, perfect for all kind of aspirants!' },
    { title: 'JEE Books', description: 'Crack JEE with this handpicked collection of the best study materials, crafted for success!' },
    { title: 'NEET Books', description: 'Master NEET with these essential notes, tailored to help you ace the exam with confidence!' },
    { title: 'Class 11 Books', description: 'Get a strong foundation with Class 11 books, essential for Future Endavours!' },
  ];

  const filteredBooks = selectedCategory === 'All' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  const handleCategoryClick = (index, category) => {
    if (index === 0) {
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
          <div 
            key={index} 
            className={`card ${index > 0 ? 'coming-soon' : ''}`}
            onClick={() => handleCategoryClick(index, card.title)}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {index > 0 && <div className="coming-soon-overlay">Coming Soon</div>}
          </div>
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
          transform: scale(1.05);
        }
        .book-image-container {
          width: 100%;
          padding-top: 141.42%; /* Aspect ratio of 1:√2 (common for book covers) */
          position: relative;
          overflow: hidden;
        }
        .book-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .book-title {
          margin-top: 1rem;
          font-size: 1.1rem;
          font-weight: bold;
          padding: 0 1rem;
        }
        .book-subtitle {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #ccc;
          padding: 0 1rem 1rem;
        }
      `}</style>
    </div>
  );
}