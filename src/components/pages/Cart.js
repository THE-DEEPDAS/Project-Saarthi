import React, { useState } from 'react';
import './ui/Cart.css';

// Sample book data (you would typically fetch this from an API)
const allBooks = [
  { id: 1, title: 'JEE Physics', subtitle: 'Class 11', category: 'JEE', price: '₹599', image: '/placeholder.svg?height=150&width=100', description: 'Comprehensive guide for JEE Physics, Class 11' },
  { id: 2, title: 'JEE Chemistry', subtitle: 'Class 12', category: 'JEE', price: '₹649', image: '/placeholder.svg?height=150&width=100', description: 'In-depth study material for JEE Chemistry, Class 12' },
  { id: 3, title: 'NEET Biology', subtitle: 'Class 11', category: 'NEET', price: '₹699', image: '/placeholder.svg?height=150&width=100', description: 'Essential Biology concepts for NEET, Class 11' },
  { id: 4, title: 'NEET Chemistry', subtitle: 'Class 12', category: 'NEET', price: '₹749', image: '/placeholder.svg?height=150&width=100', description: 'Complete Chemistry guide for NEET aspirants, Class 12' },
];

const Cart = ({ cart = [] }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('₹', '')), 0);
  };

  const handleCheckout = () => {
    console.log('Checkout with', paymentMethod);
  };

  const getRecommendations = () => {
    if (cart.length === 0) return [];

    const recommendations = [];
    const cartClasses = new Set(cart.map(item => item.subtitle));

    allBooks.forEach(book => {
      if (!cart.some(item => item.id === book.id) && cartClasses.has(book.subtitle)) {
        recommendations.push(book);
      }
    });

    return recommendations.slice(0, 3); // Limit to 3 recommendations
  };

  const recommendations = getRecommendations();

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: {item.price}</p>
                  {item.type && <p>Type: {item.type}</p>}
                  {item.status && <p>Status: {item.status}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="payment-container">
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <p>Total: ₹{calculateTotal()}</p>
        </div>
        <div className="payment-options">
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              value="debit"
              checked={paymentMethod === 'debit'}
              onChange={() => setPaymentMethod('debit')}
            />
            Debit Card
          </label>
          <label>
            <input
              type="radio"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
            />
            PayPal
          </label>
        </div>
        <button className="checkout-button" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h2>Recommended for You</h2>
          <div className="recommendations-grid">
            {recommendations.map((book, index) => (
              <div key={index} className="recommendation-item">
                <img src={book.image} alt={book.title} className="recommendation-image" />
                <div className="recommendation-details">
                  <h3>{book.title}</h3>
                  <p>{book.subtitle}</p>
                  <p>Price: {book.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
