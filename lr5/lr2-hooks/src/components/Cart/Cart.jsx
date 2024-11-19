import { useState, useEffect } from "react";
import "../Cart/cart.css";
import { useCartLogger } from '../../hooks/useCartLogger';
import { useCart, useCurrency } from '../../hooks/useAppContext';
import PropTypes from 'prop-types';

function Cart({ onClose }) {
  const { selectedProducts, updateQuantity, removeFromCart } = useCart();
  const { currency, convertCurrency } = useCurrency();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = selectedProducts.reduce((acc, product) => 
      acc + convertCurrency(product.price) * product.quantity, 0);
    setTotal(newTotal);
  }, [selectedProducts, convertCurrency]);

  useCartLogger(selectedProducts);

  const handleQuantityChange = (product, change) => {
    updateQuantity(product, change);
  };

  return (
    <div className="cart-overlay">
      <div className="cart">
        <div className="cart-header">
          <h2 style={{
            color: "rgb(255, 26, 26)",
            fontWeight: "bold",
            fontSize: "20px",
          }}>
            Your shopping cart
          </h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="cart-items">
          {selectedProducts.length === 0 ? (
            <p style={{ textAlign: "center" }}>Your shopping cart is empty</p>
          ) : (
            selectedProducts.map((product, index) => (
              <div key={index} className="cart-item">
                <button 
                  className="cart-item-remove" 
                  onClick={() => removeFromCart(product)}
                >
                  ×
                </button>
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{product.name}</span>
                  <span className="cart-item-price">
                    {currency === "USD" ? "$" : "₴"}
                    {convertCurrency(product.price).toFixed(2)}
                  </span>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(product, -1)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => handleQuantityChange(product, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">
          <h3>
            Total amount: {currency === "USD" ? "$" : "₴"}
            {total.toFixed(2)}
          </h3>
        </div>
        <div className="checkout-button" style={{textAlign: "center"}}>
          <button>Make an order</button>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default Cart;
