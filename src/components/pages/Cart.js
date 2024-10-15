import React, { useState, useEffect } from 'react';
import './ui/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    // Load cart from localStorage when component mounts
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', ''));
      return total + price;
    }, 0);
  };

  const handleCheckout = () => {
    console.log('Checkout with', paymentMethod);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getRecommendations = () => {
    if (cart.length === 0) return [];
  
    const recommendations = [];
    const cartItems = new Set(cart.map(item => item.id));
    const physicsBook = cart.find(book => book.title.includes('Physics'));
  
    if (physicsBook) {
      cart.forEach(book => {
        if (book.title.includes('Class 12') && !book.title.includes('Physics') && !cartItems.has(book.id)) {
          recommendations.push(book);
        }
      });
    } else {
      cart.forEach(book => {
        if (!cartItems.has(book.id) && book.title.includes('Class 12')) {
          recommendations.push(book);
        }
      });
    }
  
    return recommendations.slice(0, 2);
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
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="cart-item-image" 
                  style={{ width: '200px', height: '250px', objectFit: 'cover' }}
                />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Price: {item.price}</p>
                  {item.type && <p>Type: {item.type}</p>}
                  {item.status && <p>Status: {item.status}</p>}
                  <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
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
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="recommendation-image" 
                  style={{ width: '100px', height: '150px', objectFit: 'cover' }}
                />
                <div className="recommendation-details">
                  <h3>{book.title}</h3>
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