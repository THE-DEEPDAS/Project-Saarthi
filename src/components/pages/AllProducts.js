import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ui/AllProducts.css";

const books = [
  {
    id: 1,
    title: "JEE Physics",
    subtitle: "Class 11",
    category: "JEE",
    price: "₹599",
    images: ["/placeholder.svg?height=400&width=300"],
    description: "Comprehensive guide for JEE Physics, Class 11",
  },
  {
    id: 2,
    title: "JEE Chemistry",
    subtitle: "Class 12",
    category: "JEE",
    price: "₹649",
    images: ["/placeholder.svg?height=400&width=300"],
    description: "In-depth study material for JEE Chemistry, Class 12",
  },
  {
    id: 3,
    title: "NEET Biology",
    subtitle: "Class 11",
    category: "NEET",
    price: "₹699",
    images: ["/placeholder.svg?height=400&width=300"],
    description: "Essential Biology concepts for NEET, Class 11",
  },
  {
    id: 4,
    title: "NEET Chemistry",
    subtitle: "Class 12",
    category: "NEET",
    price: "₹749",
    images: ["/placeholder.svg?height=400&width=300"],
    description: "Complete Chemistry guide for NEET aspirants, Class 12",
  },
];

function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filterBooks = () => {
    return books.filter((book) => {
      if (selectedCategory === "All") return true;
      if (selectedCategory === "JEE" || selectedCategory === "NEET")
        return book.category === selectedCategory;
      if (selectedCategory === "Class 11" || selectedCategory === "Class 12")
        return book.subtitle === selectedCategory;
      return false;
    });
  };

  const handleBookClick = (book) => {
    navigate("/product", { state: { book } });
  };

  return (
    <div className="book-catalog">
      {/* Category Selection Cards */}
      <div className="category-cards">
        <div className="card" onClick={() => setSelectedCategory("All")}>
          <h3>All Books</h3>
          <p>Explore top-notch notes curated by expert educators, perfect for both JEE and NEET aspirants!</p>
        </div>
        <div className="card" onClick={() => setSelectedCategory("JEE")}>
          <h3>JEE Books</h3>
          <p>Crack JEE with this handpicked collection of the best study materials, crafted for success!</p>
        </div>
        <div className="card" onClick={() => setSelectedCategory("NEET")}>
          <h3>NEET Books</h3>
          <p>Master NEET with these essential notes, tailored to help you ace the exam with confidence!</p>
        </div>
        <div className="card" onClick={() => setSelectedCategory("Class 11")}>
          <h3>Class 11</h3>
          <p>Dive into the best study resources for Class 11! These books cover everything you need to excel in your exams and build a strong foundation.</p>
        </div>
        <div className="card" onClick={() => setSelectedCategory("Class 12")}>
          <h3>Class 12</h3>
          <p>Prepare for Class 12 with these must-have books! Master every subject with comprehensive content designed to help you achieve top marks.</p>
        </div>
      </div>

      <main>
        {/* Dynamically display books based on selected category */}
        <section id="all-books">
          <h2>{selectedCategory} Books</h2>
          <div className="book-grid">
            {filterBooks().map((book) => (
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
