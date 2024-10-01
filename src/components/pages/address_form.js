import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ui/address_form.css';

const AddressForm = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const [formData, setFormData] = useState({
    bookName: book?.title || '',
    bookPrice: book?.price || '',
    email: '',
    mobileNumber: '',
    address: '',
    paymentScreenshot: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Add the book to cart
    addToCart(book);
    // Redirect to cart page or show confirmation
    navigate('/cart');
  };

  return (
    <div className="address-form-container">
      <h2>Order Details for Physical Copy</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Name:</label>
          <input type="text" name="bookName" value={formData.bookName} readOnly />
        </div>
        <div className="form-group">
          <label>Book Price:</label>
          <input type="text" name="bookPrice" value={formData.bookPrice} readOnly />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input 
            type="tel" 
            name="mobileNumber" 
            value={formData.mobileNumber} 
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea 
            name="address" 
            value={formData.address} 
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label>Screenshot of Payment:</label>
          <input 
            type="file" 
            name="paymentScreenshot" 
            onChange={handleChange}
            accept="image/*"
            required 
          />
        </div>
        <button type="submit" className="submit-button">Submit Order</button>
      </form>
    </div>
  );
};

export default AddressForm;
