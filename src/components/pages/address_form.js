import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ui/address_form.css';

const AddressForm = ({ addToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

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

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000); // Hide message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setShowMessage(false);
    
    const templateParams = {
      from_email: formData.email,
      from_name: formData.email,
      book_name: formData.bookName,
      book_price: formData.bookPrice,
      customer_email: formData.email,
      customer_mobile: formData.mobileNumber,
      customer_address: formData.address,
    };

    try {
      const response = await emailjs.send(
        'service_1dvn70q',
        'template_m8q41xs',
        templateParams,
        'Il4-DiKyN8X8ugRKf'
      );

      console.log('Email sent successfully', response);
      setMessage('Order placed successfully');
      
      addToCart({...book, type: 'Physical Copy', status: 'Order placed successfully'});
      
      setTimeout(() => navigate('/cart'), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage(`Error placing order: ${error.message}. Please try again.`);
    }
  };

  return (
    <div className="address-form-container">
      <h2 style={{ color: 'gold' }}>Order Details for Physical Copy</h2>
      {message && (
        <div className={`message ${showMessage ? 'show' : 'hide'} ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Name:</label>
          <input type="text" name="bookName" value={formData.bookName} readOnly required />
        </div>
        <div className="form-group">
          <label>Book Price:</label>
          <input type="text" name="bookPrice" value={formData.bookPrice} readOnly required />
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
            pattern="[0-9]{10}"  // Assumes a 10-digit phone number
            title="Please enter a valid 10-digit phone number"
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
