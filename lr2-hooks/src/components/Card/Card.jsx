import PropTypes from 'prop-types';
import "../Card/card.css";
import { Icon } from "@iconify/react";

function Card({
  product,
  onCheckboxChange,
  onCardClick,
  convertCurrency,
  currency,
  isSelected,
}) {
  if (!product || !onCheckboxChange || !onCardClick || !convertCurrency || !currency) {
    console.error("Missing required props in Card component", {
      product,
      onCheckboxChange,
      onCardClick,
      convertCurrency,
      currency,
    });
    return null;
  }

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
          onChange={() => onCheckboxChange(product)}
          checked={isSelected}
        />
        <label htmlFor={`checkbox-${product.name}`} className="custom-label">
          <Icon icon="ic:twotone-add-shopping-cart" width="20" />
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
  onCheckboxChange: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  convertCurrency: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default Card;
