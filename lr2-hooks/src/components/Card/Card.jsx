import React from "react";
import "../Card/card.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function Card({
  product,
  onCheckboxChange,
  onCardClick,
  convertCurrency,
  currency,
}) {
  if (
    !product ||
    !onCheckboxChange ||
    !onCardClick ||
    !convertCurrency ||
    !currency
  ) {
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
        />
        <label htmlFor={`checkbox-${product.name}`} className="custom-label">
          <Icon icon="ic:twotone-add-shopping-cart" width="20" />
        </label>
      </div>
    </div>
  );
}

export default Card;
