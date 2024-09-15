import React, { useState, useEffect } from 'react'
import TestimonialForm from './TestimonialForm'
import './ui/Testimonials.css'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    
    const initialTestimonials = [
      { id: 1, name: "John Doe", company: "Tech Co", role: "Developer", comment: "Great product!", rating: 5 },
      { id: 2, name: "Jane Smith", company: "Design Inc", role: "Designer", comment: "Very useful tool.", rating: 4 },
    ]
    setTestimonials(initialTestimonials)
  }, [])

  const addTestimonial = (newTestimonial) => {
    const updatedTestimonials = [
      { ...newTestimonial, id: Date.now() },
      ...testimonials
    ].slice(0, 7)
    setTestimonials(updatedTestimonials)
    setShowForm(false)
  }

  return (
    <div className="testimonials-container">
      <h2>Customer Testimonials</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-header">
              <h3>{testimonial.name}</h3>
              <p>{testimonial.company} - {testimonial.role}</p>
            </div>
            <p className="testimonial-comment">{testimonial.comment}</p>
            <div className="testimonial-rating">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={index < testimonial.rating ? 'star filled' : 'star'}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <TestimonialForm onSubmit={addTestimonial} onCancel={() => setShowForm(false)} />
      ) : (
        <button className="add-testimonial-btn" onClick={() => setShowForm(true)}>Add Your Testimonial</button>
      )}
    </div>
  )
}