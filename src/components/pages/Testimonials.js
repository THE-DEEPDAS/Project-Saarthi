import React, { useState, useEffect } from 'react';
import TestimonialForm from './TestimonialForm';
import './ui/Testimonials.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // Fetch testimonials from the backend
  useEffect(() => {
    fetch('http://localhost:5000/testimonials')
      .then(response => response.json())
      .then(data => {
        setTestimonials(data);
      })
      .catch(error => {
        console.error('Error fetching testimonials:', error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

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
          <div key={testimonial._id} className="testimonial-card">
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
        {Array.from({ length: testimonials.length }).map((_, index) => (
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
