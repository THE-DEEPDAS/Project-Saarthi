import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ui/AllProducts.css';

// Updated sample data without displaying prices
const books = [
  { 
    id: 1, 
    title: 'Class 12 Board Physics', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹399', 
    physicalPrice: '₹599', 
    images: ['/placeholder.svg?height=400&width=300'], 
    description: 'Comprehensive guide for Class 12 Board Physics' 
  },
  { 
    id: 2, 
    title: 'Class 12 Board Chemistry', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹449', 
    physicalPrice: '₹649', 
    images: ['/placeholder.svg?height=400&width=300'], 
    description: 'In-depth study material for Class 12 Board Chemistry' 
  },
  { 
    id: 3, 
    title: 'Class 12 Board Biology', 
    subtitle: 'Class 12', 
    category: 'Class 12', 
    eBookPrice: '₹499', 
    physicalPrice: '₹699', 
    images: ['/placeholder.svg?height=400&width=300'], 
    description: 'Essential Biology concepts for Class 12 Board' 
  },
];

function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleBookClick = (book) => {
    navigate('/product', { state: { book } });
  };

  const categoryCards = [
    { title: 'Class 12 Books', description: 'Boost your preparation with Class 12 books, crucial for acing JEE and NEET exams!' },
    { title: 'All Books', description: 'Explore top-notch notes curated by expert educators, perfect for both JEE and NEET aspirants!' },
    { title: 'JEE Books', description: 'Crack JEE with this handpicked collection of the best study materials, crafted for success!' },
    { title: 'NEET Books', description: 'Master NEET with these essential notes, tailored to help you ace the exam with confidence!' },
    { title: 'Class 11 Books', description: 'Get a strong foundation with Class 11 books, essential for JEE and NEET preparation!' },
  ];

  const filteredBooks = selectedCategory === 'All' 
    ? books 
    : books.filter(book => book.category === selectedCategory);

  return (
    <div className="book-catalog">
      {/* Category Selection Cards */}
      <div className="category-cards">
        {categoryCards.map((card, index) => (
          <div 
            key={index} 
            className={`card ${index > 0 ? 'coming-soon' : ''}`}
            onClick={() => index === 0 && setSelectedCategory('Class 12')}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {index > 0 && <div className="coming-soon-overlay">Coming Soon</div>}
          </div>
        ))}
      </div>

      <main>
        <section id="all-books">
          <h2>{selectedCategory === 'All' ? 'All Books' : `${selectedCategory} Books`}</h2>
          <div className="book-grid">
            {filteredBooks.map(book => (
              <div key={book.id} className="book" onClick={() => handleBookClick(book)}>
                <img src={book.images[0]} alt={book.title} className="book-image" />
                <h3 className="book-title">{book.title}</h3>
                <p className="book-subtitle">{book.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AllProducts;
