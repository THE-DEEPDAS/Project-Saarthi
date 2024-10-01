import React from 'react';
import './ui/Cart.css';

const Cart = ({ cart }) => {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
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
  );
};

export default Cart;
