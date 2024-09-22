import React from "react";
import "../assets/card.css";
import { Icon } from "@iconify/react";

function Card({ product, onCheckboxChange }) {
	return (
		<div className="card">
			<div className="add-to-favorite">
				<Icon icon="bi:heart" color="red" size="50px" />
			</div>

			<div className="product-description">
				<div className="image-main">
					<img src={product.image} alt={product.name} className="card-image" />
				</div>
			</div>

			<div className="card-details">
				<div className="title">
					<span>{product.name}</span>
				</div>
				<div className="price">
					<p>${product.price}</p>
				</div>
			</div>

			<div className="buy">
				<input
					type="checkbox"
					id={`checkbox-${product.name}`}
					className="custom-checkbox"
					onChange={() => onCheckboxChange(product)}
				/>
				<label htmlFor={`checkbox-${product.name}`} className="custom-label">
					<Icon icon="ic:twotone-add-shopping-cart" width="25px" />
				</label>
			</div>
		</div>
	);
}

export default Card;