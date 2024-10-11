// File: src/components/pages/FormComponent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function FormComponent() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    institute: '',
    className: '',
    message: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Confirmation message sent through WhatsApp');
        navigate('/'); // Redirect to home or any other page after success
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending the message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>WhatsApp Form</h2>

      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />

      <label>Mobile:</label>
      <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

      <label>Email (optional):</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} />

      <label>Institute:</label>
      <input type="text" name="institute" value={formData.institute} onChange={handleChange} required />

      <label>Class:</label>
      <input type="text" name="className" value={formData.className} onChange={handleChange} required />

      <label>Message/Query:</label>
      <textarea name="message" value={formData.message} onChange={handleChange} required />

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;