import React, { useState, useEffect } from 'react';
import TestimonialForm from './TestimonialForm';
import './ui/Testimonials.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const initialTestimonials = [
      { id: 1, name: "Deep Das", company: "Tech Co", role: "Developer", comment: "Great product!", rating: 5 },
      { id: 2, name: "Hitarth Shah", company: "Design Inc", role: "Designer", comment: "Very useful tool.", rating: 4 },
      { id: 3, name: "John Doe", company: "ABC Corp", role: "Manager", comment: "Excellent service!", rating: 5 },
      { id: 4, name: "Jane Smith", company: "XYZ Ltd", role: "Analyst", comment: "Highly recommended.", rating: 4 },
      { id: 5, name: "Alice Johnson", company: "123 Industries", role: "Engineer", comment: "Top-notch quality.", rating: 5 },
      { id: 6, name: "Bob Brown", company: "Tech Ltd", role: "Developer", comment: "Fantastic experience!", rating: 5 },
      { id: 7, name: "Sara White", company: "Innovate Inc", role: "Product Manager", comment: "Loved it!", rating: 4 },
    ];
    setTestimonials(initialTestimonials);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 3)); // Assuming showing 3 testimonials
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const addTestimonial = (newTestimonial) => {
    const updatedTestimonials = [
      { ...newTestimonial, id: Date.now() },
      ...testimonials
    ].slice(0, 7); // Maintain only the last 7 testimonials
    setTestimonials(updatedTestimonials);
    setShowForm(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="testimonials-container">
      <h2>Customer Testimonials</h2>
      <div className="testimonials-grid" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={`testimonial-card ${testimonial.active ? 'active' : ''}`}>
            <div className="testimonial-header">
              <h3>{testimonial.name}</h3>
              <p>{testimonial.company} - {testimonial.role}</p>
            </div>
            <p className="testimonial-comment">{testimonial.comment}</p>
            <div className="testimonial-rating">
              {[...Array(5)].map((_, ratingIndex) => (
                <span key={ratingIndex} className={ratingIndex < testimonial.rating ? 'star filled' : 'star'}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots">
        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
          <button
            key={index}
            className={`testimonial-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
      {showForm ? (
        <TestimonialForm onSubmit={addTestimonial} onCancel={() => setShowForm(false)} />
      ) : (
        <button className="add-testimonial-btn" onClick={() => setShowForm(true)}>Add Your Testimonial</button>
      )}
    </div>
  );
}
