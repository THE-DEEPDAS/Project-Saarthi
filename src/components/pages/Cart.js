import React from 'react';
import './ui/Cart.css'; 

const Cart = ({ cart = [] }) => {
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.price.replace('₹', '')), 0);

  return (
    <div className="cart-container">
      {/* Cart Items Section (60%) */}
      <div className="cart-items">
        <h1>Your Cart</h1>
        {cart.length > 0 ? (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.images[0]} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                  <h3>{item.price}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Your shopping cart is currently empty. Start adding some products!</p>
        )}
      </div>

      {/* Checkout Section (40%) */}
      <div className="checkout-section">
        <h2>Checkout Details</h2>
        <div className="checkout-summary">
          <p>Total Items: {cart.length}</p>
          <p>Total Price: ₹{totalPrice}</p>
        </div>

        {/* Payment options */}
        <div className="payment-options">
          <h3>Payment Options</h3>
          <label>
            <input type="radio" name="payment" value="credit" /> Credit/Debit Card
          </label>
          <label>
            <input type="radio" name="payment" value="paypal" /> PayPal
          </label>
          <label>
            <input type="radio" name="payment" value="upi" /> UPI Payment
          </label>
        </div>

        <button className="checkout-button">Proceed to Pay</button>
      </div>
    </div>
  );
};

export default Cart;
