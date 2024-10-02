import React, { useState } from 'react';
import './ui/Cart.css';

const Cart = ({ cart = [] }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('₹', '')), 0);
  };

  const handleCheckout = () => {
    console.log('Checkout with', paymentMethod);
  };

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
    </div>
  );
};

export default Cart;
