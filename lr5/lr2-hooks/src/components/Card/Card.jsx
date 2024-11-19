import PropTypes from 'prop-types';
import "../Card/card.css";
import { Icon } from "@iconify/react";
import { useCurrency, useCart } from '../../hooks/useAppContext';

function Card({ product, onCardClick }) {
  const { currency, convertCurrency } = useCurrency();
  const { selectedProducts, addToCart, removeFromCart } = useCart();
  
  const isSelected = selectedProducts.some(p => p.name === product.name);
  
  const handleCheckboxChange = () => {
    if (isSelected) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  const displayPrice = convertCurrency(product.price).toFixed(2);

  return (
    <div className="card" onClick={() => onCardClick(product)}>
      <div className="add-to-favorite">
        <Icon icon="bi:heart" color="red" width="20" />
      </div>

      <div className="product-description">
        <div className="image-main">
          <img src={product.image} alt={product.name} className="card-image" />
        </div>
      </div>

      <div className="card-details">
        <div className="title">
          <span>
            {product.name.length > 35
              ? product.name.split(" ").slice(0, 4).join(" ") + "..."
              : product.name}
          </span>
        </div>
        <div className="price" style={{ marginTop: "30px" }}>
          <p>
            {currency === "USD" ? "$" : "₴"}
            {displayPrice}
          </p>
        </div>
      </div>

      <div className="buy" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          id={`checkbox-${product.name}`}
          className="custom-checkbox"
          onChange={handleCheckboxChange}
          checked={isSelected}
        />
        <label htmlFor={`checkbox-${product.name}`} className="custom-label">
          <Icon 
            icon={isSelected ? "mdi:cart-check" : "ic:twotone-add-shopping-cart"} 
            color={isSelected ? "#ff4040" : "#fff"} 
            width="24" 
          />
        </label>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Card;
