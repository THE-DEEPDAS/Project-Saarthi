import React, { useState } from 'react'
import './ui/TestimonialForm.css'

export default function TestimonialForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    comment: '',
    rating: 5
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className="testimonial-form" onSubmit={handleSubmit}>
      <h3>Add Your Testimonial</h3>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}