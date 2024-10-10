import React, { useState, useEffect } from 'react';
import TestimonialForm from './TestimonialForm';
import './ui/Testimonials.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const initialTestimonials = [
      { id: 1, name: "Deep Das", institution: "Tech University", class: "12th", comment: "Great product!", rating: 5 },
      { id: 2, name: "Hitarth Shah", institution: "Design School", class: "11th", comment: "Very useful tool.", rating: 4 },
      { id: 3, name: "John Doe", institution: "ABC College", class: "10th", comment: "Excellent service!", rating: 5 },
      { id: 4, name: "Jane Smith", institution: "XYZ School", class: "12th", comment: "Highly recommended.", rating: 4 },
      { id: 5, name: "Alice Johnson", institution: "123 High School", class: "11th", comment: "Top-notch quality.", rating: 5 },
      { id: 6, name: "Bob Brown", institution: "Tech Institute", class: "10th", comment: "Fantastic experience!", rating: 5 },
      { id: 7, name: "Sara White", institution: "Innovate Academy", class: "12th", comment: "Loved it!", rating: 4 },
    ];
    setTestimonials(initialTestimonials);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const addTestimonial = (newTestimonial) => {
    const updatedTestimonials = [
      { ...newTestimonial, id: Date.now() },
      ...testimonials
    ].slice(0, 7);
    setTestimonials(updatedTestimonials);
    setShowForm(false);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="testimonials-container">
      <h2>Customer Testimonials</h2>
      <div className="testimonials-grid" style={{ transform: `translateX(-${currentIndex * 20}%)` }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={`testimonial-card ${testimonial.active ? 'active' : ''}`}>
            <div className="testimonial-header">
              <h3>{testimonial.name}</h3>
              <p>{testimonial.institution} - {testimonial.class}</p>
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
        {Array.from({ length: 5 }).map((_, index) => (
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
