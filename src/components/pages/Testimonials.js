import React, { useState, useEffect } from 'react';
import TestimonialForm from './TestimonialForm';
import './ui/Testimonials.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const initialTestimonials = [
      {
        id: 1,
        name: "Anjali Verma",
        institution: "Delhi Public School, Delhi",
        class: "12th",
        comment: "The JEE preparation books provided here are incredibly comprehensive. They break down complex concepts into easy-to-understand segments, making it much easier to prepare. I scored well thanks to the focused study materials!",
        rating: 5
      },
      {
        id: 2,
        name: "Suresh Rao",
        institution: "St. Xavier's College, Mumbai",
        class: "12th",
        comment: "I found the NEET study guides to be extremely helpful. They covered all the necessary topics and offered plenty of practice questions. I felt fully prepared for the exam, and it truly made a difference in my performance.",
        rating: 5
      },
      {
        id: 3,
        name: "Neha Patel",
        institution: "Chinmaya Vidyalaya, Bangalore",
        class: "11th",
        comment: "The board exam revision books were well-structured and very easy to follow. The summaries at the end of each chapter helped me revise quickly before the exams. Highly recommended for anyone looking to excel!",
        rating: 4
      },
      {
        id: 4,
        name: "Rahul Mehta",
        institution: "MIT Pune",
        class: "12th",
        comment: "The physics and chemistry textbooks specifically designed for JEE were top-notch. They included detailed explanations, diagrams, and practice problems that closely resemble actual exam questions. I would definitely suggest these to any JEE aspirant.",
        rating: 5
      },
      {
        id: 5,
        name: "Pooja Singh",
        institution: "Kendriya Vidyalaya, Chandigarh",
        class: "12th",
        comment: "These NEET preparation books were a lifesaver! The clear explanations and practice tests made studying less stressful and much more effective. I appreciate the focus on the NEET syllabus, which helped me concentrate on the important topics.",
        rating: 5
      },
      {
        id: 6,
        name: "Karan Joshi",
        institution: "Bharati Vidyapeeth, Pune",
        class: "12th",
        comment: "The online resources and reference books for board exams are incredibly helpful. The mock tests are particularly beneficial for understanding the exam pattern and time management. It made a significant difference in my preparation.",
        rating: 4
      },
      {
        id: 7,
        name: "Siddhi Desai",
        institution: "Nirma University, Ahmedabad",
        class: "12th",
        comment: "I cannot thank you enough for the study materials for JEE! The logical explanations and the way topics are interlinked made it easy to grasp. These resources truly made my preparation journey smoother.",
        rating: 5
      },
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
